---
slug: 07-file-io
title: "文件读写：从 names.txt 到 CSV 与图片"
summary: "内存随程序退出而清空，文件让数据留下来。本章从写一行名字开始，讲清 w 与 a 的区别、with 自动关闭、逐行读取与多余的换行；再用 CSV 演示为什么手写 split 会崩、csv.reader 与 DictReader 如何解决，最后用 Pillow 生成一张动图，说明二进制文件同样只是「打开—读/写—保存」。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, file-io, csv, pillow, pathlib]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 7 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=25232s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

这是长视频（约 16 小时）的第 7 章，对应 CS50P 第 6 次讲座「File I/O」，时间区间 7:00:32–8:32:47。前六章的程序把数据放在变量和列表里，程序一退出就全没了。这一章让数据落到磁盘上：先处理纯文本，再处理 CSV，最后碰一次二进制图片。

## 核心问题

到这一章为止，所有数据都活在内存里。变量、列表、字典，程序结束就消失。想保留信息，就要写进文件；下次运行再读出来。文件读写的全部内容可以压缩成三件事：

1. 以什么模式打开（读 `r`、写 `w`、追加 `a`）；
2. 读出来的是什么形状（整份文本、一行、还是按列切好的行）；
3. 谁来负责解析（自己 `split`，还是交给标准库）。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 7:00:32 | 动机：内存是临时的，文件是持久的 |
| 7:01:40 | `names.py`：收集三个名字、排序、打印 |
| 7:06:08 | `open("names.txt", "w")` 写文件；`w` 每次都会清空文件 |
| 7:10:37 | 改用 `"a"` 追加；发现名字挤成一行，需要手动写 `\n` |
| 7:14:27 | `with` 语句：自动关闭文件 |
| 7:16:16 | 读取：`readlines()`、`for line in file`、`rstrip()` |
| 7:21:41 | 想排序就必须先把所有行读进内存 |
| 7:25:20 | `sorted(..., reverse=True)` |
| 7:30:12 | CSV：用逗号分隔 name 与 house |
| 7:33:06 | 手写 `split(",")` 解析；用 `name, house = row` 解包 |
| 7:39:37 | 用字典保存每个学生，再用 `key=` 排序 |
| 7:54:24 | lambda：不必为只用一次的函数起名字 |
| 7:57:18 | 地址里含逗号 → `ValueError: too many values to unpack` |
| 8:01:20 | `csv.reader` 接管解析 |
| 8:08:05 | 表头 + `csv.DictReader`，列顺序变了也不怕 |
| 8:13:42 | `csv.writer` / `csv.DictWriter` 写回文件 |
| 8:23:19 | 二进制文件：用 Pillow 把两张图合成动图 |

## 从列表到文件

最初的 `names.py` 只处理一个名字：

```python
name = input("What's your name? ")
print(f"hello, {name}")
```

改成收集三个名字并排序：

```python
names = []
for _ in range(3):
    names.append(input("What's your name? "))

for name in sorted(names):
    print(f"hello, {name}")
```

`_` 是「这个循环变量不会被用到」的约定写法。运行三次输入 Hermione、Harry、Ron，输出按字母序：Harry、Hermione、Ron。但程序一退出，三个名字就没了。

## 写入：`w` 的陷阱

```python
name = input("What's your name? ")
file = open("names.txt", "w")
file.write(name)
file.close()
```

`open` 返回一个**文件句柄**，`write` 写入，`close` 保存并释放。连续运行三次，输入 Hermione、Harry、Ron，打开 `names.txt` 却只有 `Ron`。

原因在 `"w"`：它不仅创建文件，还会在每次打开时**清空**文件。三次运行，就是三次「清空再写」。另外，`write` 不会自动加换行，所以即使不覆盖，三个名字也会粘成 `HermioneHarryRon`。

### 改成追加模式并补换行

```python
name = input("What's your name? ")
with open("names.txt", "a") as file:
    file.write(f"{name}\n")
```

- `"a"` 表示 append，写到文件末尾，保留原有内容；
- `f"{name}\n"` 显式补上换行，因为 `write` 不像 `print` 那样自动换行。

### `with` 替你关闭

```python
with open("names.txt", "a") as file:
    file.write(f"{name}\n")
```

`with` 块结束时自动调用 `close()`，即使块内抛异常也会关。手写 `close()` 一旦忘记，轻则数据没落盘，重则文件损坏。所以文件操作几乎总是用 `with`。

## 读取：三种写法与一个多余的空行

`names.txt` 现在有：

```
Hermione
Harry
Ron
Draco
```

### 一次性读成列表

```python
with open("names.txt", "r") as file:
    lines = file.readlines()

for line in lines:
    print("hello,", line.rstrip())
```

`readlines()` 返回字符串列表，每个元素是一行，**末尾的 `\n` 还在**。如果直接 `print(line)`，屏幕上会出现空行：行里有一个 `\n`，`print` 又补一个。解决办法二选一：

- `line.rstrip()` 去掉末尾空白，让 `print` 负责换行；
- 或 `print(line, end="")`，让文件里的换行生效。

课程更倾向 `rstrip()`：换行只是文件格式的实现细节，不该泄漏到输出逻辑里。

### 直接迭代文件

```python
with open("names.txt") as file:
    for line in file:
        print("hello,", line.rstrip())
```

文件对象本身就是可迭代的，每次给出一行。这比「先 `readlines` 再循环」少一次内存拷贝，读起来也更像英文。

### 按字母序输出

```python
names = []
with open("names.txt") as file:
    for line in file:
        names.append(line.rstrip())

for name in sorted(names):
    print(f"hello, {name}")
```

为什么不能边读边打印？因为打印完就没法再排序——排序需要看到全部数据。所以必须先收集到列表，再排序，再输出。这是处理文件数据的通用模式：**先装载，再加工，最后输出**。

Python 也允许偷懒：

```python
with open("names.txt") as file:
    for line in sorted(file):
        print("hello,", line.rstrip())
```

`sorted` 接受任何可迭代对象，包括文件。它会把所有行读进内存再排序，效果相同。

倒序只需 `sorted(names, reverse=True)`。

## CSV：一行存多个字段

现在每个学生除了名字还有学院。直接混写会变成「有的行是名字、有的行是学院」，无法区分。约定是：**同一行放同一个学生的多个字段，用逗号分隔**，这就是 CSV（comma-separated values）。

`students.csv`：

```
name,house
Hermione,Gryffindor
Harry,Gryffindor
Ron,Gryffindor
Draco,Slytherin
```

### 手写解析

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        print(f"{name} is in {house}")
```

`split(",")` 返回列表，`name, house = ...` 是**解包**：把列表的两个元素同时赋给两个变量。这比 `row[0]`、`row[1]` 更可读。

### 排序：为什么需要字典

如果直接把拼好的句子塞进列表再排序，排的是整句文本——恰好按名字排对了，只是因为英文从左往右读，属于「碰巧」。正确做法是保留结构：

```python
students = []
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        student = {"name": name, "house": house}
        students.append(student)

for student in sorted(students, key=lambda student: student["name"]):
    print(f"{student['name']} is in {student['house']}")
```

`key` 接受一个函数，`sorted` 会对每个元素调用它，用返回值比较大小。这里用 `lambda` 写匿名函数，等价于先定义 `def get_name(student): return student["name"]`，只是不需要名字。

注意 f-string 外层是双引号，字典键用单引号：`{student['name']}`。如果内外都用双引号，Python 会分不清边界。

### 手写解析的崩溃点

把 home 从学院改成家庭住址：

```
name,home
Harry,Number Four, Privet Drive
Ron,The Burrow
Draco,Malfoy Manor
```

运行立刻报错：

```
ValueError: too many values to unpack (expected 2)
```

`Number Four, Privet Drive` 里的逗号被当成了字段分隔符，`split` 切出三段，两个变量接不住。

绕开的办法都不可靠：换成竖线，数据里迟早出现竖线；给含逗号的字段加引号，解析代码就要自己处理「引号内的逗号不算分隔符」。到这一步应该意识到：**这是一个已经被解决过无数次的问题，应该用标准库**。

## `csv` 模块

### `csv.reader`

```python
import csv

students = []
with open("students.csv") as file:
    reader = csv.reader(file)
    for name, home in reader:
        students.append({"name": name, "home": home})
```

`reader` 逐行返回字段列表，并正确处理引号、逗号、换行。仍可用解包。

### `csv.DictReader`

给文件加上表头：

```
name,home
Harry,Number Four, Privet Drive
```

```python
import csv

students = []
with open("students.csv") as file:
    reader = csv.DictReader(file)
    for row in reader:
        students.append({"name": row["name"], "home": row["home"]})
```

每行变成字典，键来自表头。好处是**代码不再依赖列的顺序**：如果别人在 Excel 里把 home 挪到 name 前面，只要表头更新了，代码一行不改照样能跑。

### 写入：`csv.writer`

```python
import csv

name = input("What's your name? ")
home = input("Where's your home? ")

with open("students.csv", "a") as file:
    writer = csv.writer(file)
    writer.writerow([name, home])
```

输入 `Number Four, Privet Drive` 时，writer 会自动给这个字段加引号，避免下次读取时误切。

### 写入：`csv.DictWriter`

```python
import csv

name = input("What's your name? ")
home = input("Where's your home? ")

with open("students.csv", "a") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "home"])
    writer.writerow({"name": name, "home": home})
```

`fieldnames` 告诉 writer 列的顺序；字典本身的键顺序不重要。列变多时也不用改写入逻辑。

## 二进制文件：一张动图

文本之外，Python 也能读写二进制。以 Pillow 为例，把两张静态图合成动图：

```python
import sys
from PIL import Image

images = []

for arg in sys.argv[1:]:
    image = Image.open(arg)
    images.append(image)

images[0].save(
    "costumes.gif",
    save_all=True,
    append_images=images[1:],
    duration=200,
    loop=0,
)
```

- `sys.argv[1:]` 跳过程序名，只取命令行传入的图片路径；
- `Image.open` 打开图片，`save` 负责创建、写入与关闭文件；
- `save_all=True` 保存全部帧，`append_images` 指定后续帧；
- `duration=200` 每帧 200 毫秒，`loop=0` 表示无限循环。

运行：

```bash
python costumes.py costume1.gif costume2.gif
```

生成 `costumes.gif`。这一节的意义不在动图本身，而在说明：**文件读写的模式是统一的**——打开、读或写、保存；文本、CSV、图片只是内容格式不同。

## 关于同时读写

课上有一个提问：能不能打开一个文件既读又写？答案是可以，但很麻烦。文件的模型像磁带：有一个当前位置，读到哪里、写到哪里都要自己维护，切换读写还要 `seek` 回到开头。更稳妥的做法是「读入全部 → 在内存里修改 → 整体写回」。只有文件极大、整体重写代价过高时，才值得做随机访问。

## 本章结论

- `"w"` 会清空文件再写，`"a"` 在末尾追加；忘记这点就会只剩最后一次输入。
- `write` 不自动换行，要自己写 `\n`。
- `with open(...) as f` 自动关闭文件，避免泄漏与损坏。
- 读取有 `readlines()`、直接迭代、`sorted(file)` 三种；文件里的 `\n` 会让 `print` 多出空行，用 `rstrip()` 处理。
- 排序前必须把数据读进内存；「先装载、再加工、最后输出」是通用模式。
- CSV 手写 `split` 会被字段内的逗号击穿；用 `csv.reader` / `csv.DictReader` 解析，`csv.writer` / `csv.DictWriter` 写回。
- `DictReader` 依赖表头而非列位置，列顺序变化不会破坏代码。
- 二进制文件（图片、音频）同样用「打开—读/写—保存」，Pillow 只是其中一例。

## 理解检验

**1. 为什么用 `"w"` 连续运行三次，文件里只剩下最后一个名字？**

参考答案：`"w"` 模式在打开文件时会先把文件长度截断为 0，再写入新内容。三次运行等于「清空并写入 Hermione」「清空并写入 Harry」「清空并写入 Ron」，所以最终只剩 Ron。想保留历史应使用 `"a"`（append），它从文件末尾开始写，不截断已有内容。

**2. 从文件逐行读取后 `print(line)`，为什么每两行之间多出一个空行？给出两种修法。**

参考答案：文件里每行以 `\n` 结尾，`line` 变量把这个换行也带了进来；`print` 默认又会在末尾加一个 `\n`，于是每行输出后有两个换行。修法一：`print(line.rstrip())`，先去掉行尾空白，让 `print` 负责换行。修法二：`print(line, end="")`，不再让 `print` 追加换行，直接使用文件里的换行。课程更推荐前者，因为「用换行分隔」只是文件的存储约定，不应影响输出逻辑。

**3. 为什么不能一边遍历文件一边排序输出？**

参考答案：排序需要看到全部数据才能确定先后顺序。如果逐行读取并立即打印，第一行输出时还不知道后面会有什么，此时再想调整顺序已经来不及。因此必须先遍历完文件、把各行收集到列表（或让 `sorted(file)` 一次性读完），再排序输出。这也是「先装载、再加工、最后输出」这一通用模式的原因。

**4. `Number Four, Privet Drive` 为什么会让 `name, home = line.split(",")` 崩溃？`csv` 模块如何避免？**

参考答案：`split(",")` 把每个逗号都当作字段分隔符，这段地址里的逗号也被切开，产生三个片段，而左边只有两个变量，于是抛出 `ValueError: too many values to unpack (expected 2)`。`csv.reader` 按 CSV 规则解析：写入时会把含逗号的字段用引号括起来，读取时引号内的逗号不再当分隔符，因此能正确返回两个字段。也就是说，问题不在「怎么切」，而在「切之前要先理解引号」。

**5. 用 `csv.reader` 时把列的先后顺序调换，代码为什么可能出错？`DictReader` 为什么不会？**

参考答案：`csv.reader` 返回的是按位置排列的列表，代码通过解包或 `row[0]`、`row[1]` 取值，隐含假设「第一列是 name、第二列是 home」。列顺序一变，取到的值就错位，甚至解包失败。`DictReader` 读取第一行表头，把每行变成以列名为键的字典，代码用 `row["name"]` 取值，与列的物理位置无关。只要表头随数据一起更新，列顺序任意变化都不影响代码。

**6. `with open(...) as file:` 相比手动 `close()` 多做了什么？**

参考答案：`with` 保证块结束时一定调用 `close()`，包括块内抛出异常提前退出的情况。手动 `close()` 依赖程序员记得写、且写了也不会被执行到（异常发生时）。文件未关闭会导致缓冲区数据没有落盘、句柄泄漏，甚至文件损坏。因此 `with` 不只是语法糖，它把「必须关闭」变成了结构性保证。

**7. 想修改 CSV 中某一行的某个字段，为什么推荐「整份读入 → 修改 → 整体写回」？**

参考答案：文件是顺序访问的：有一个读写位置，从中间改写会让后续内容错位，且「读到某行再原地改这一行」需要自己维护位置、处理长度变化。最简单可靠的方案是把全部内容读进内存，在内存结构（如列表、字典）上做修改，再以 `"w"` 模式整体写回。只有文件极大、重写成本过高时，才值得实现带 `seek` 的随机访问逻辑。

## 与前后章的关系

第 6 章的单元测试在这里立刻派上用场：读写文件的函数同样可以测试，例如「文件不存在时是否抛出 `FileNotFoundError`」「空文件是否返回空列表」。下一章进入正则表达式，处理的是「从一段文本里抽出结构化信息」，与本章「从文件里抽出字段」是同一类问题的两种工具。再往后的第 9 章会用类把「学生」这样的数据与行为封装起来，替代本章临时使用的字典。
