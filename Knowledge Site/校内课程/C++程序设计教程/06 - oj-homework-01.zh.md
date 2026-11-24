---
slug: "06-oj-homework-01"
title: "第一次作业（字符输出、基本运算与拆位）"
summary: "字符输出、基本运算、条件分支与拆位。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "01"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/14_R_M_T3WNJoXdkg4aMEbU_Sr5wr7WbH"
---

**来源**　课后作业

ddl 26.10.4 ｜ A–F 共 6 题

题意按 `0catalog` 的题名与本地 `.cpp` 还原；题面没有给出、又会影响提交的部分在每题末尾标为 **待确认**。

## A

<!-- homework-topic: 输出特定 ASCII 码字符 -->

> **题目**　**输出特定 ASCII 码字符**
>
> 无输入。依次输出 ASCII 码为 35 和 110 的两个字符，再换行。
>
> 输出为两个字符紧挨着的 `#n`，中间没有空格。

**思路**　`char(35)`、`char(110)` 是显式类型转换，把整数按字符类型送出。

**为什么这样做**　`cout` 对 `int` 和 `char` 的处理完全不同：`cout << 35` 打印的是 `35`，`cout << char(35)` 打印的是 `#`。本题练的就是同一个数值按不同类型输出的差别。反方向的 `char` 转 `int` 常用于把字符还原成编码。

**边界**　两个字符之间不能有空格，末尾必须有换行。也可写成 `static_cast<char>(35)`。

**补充要点**　`char` 是否有符号由实现决定，35 和 110 都能表示。在使用 ASCII 兼容编码的 OJ 环境中，它们对应 `#` 和 `n`。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout<<char(35)<<char(110)<<endl;
}
```

[查看原始 A.cpp](https://drive.google.com/file/d/1J25yFz3WOM3OX--1lTIiorsyK2Nh6vqj/view?usp=drivesdk)

## B

<!-- homework-topic: 计算矩形周长和面积 -->

> **题目**　**计算矩形周长和面积**
>
> 读入矩形的长和宽，输出周长与面积，两个值用空格分隔，一行结束。
>
> 边长可以是小数。输入 `3.5 2` 时输出 `11 7`。

**思路**　周长是两条长加两条宽，即 `2 * (a + b)`；面积直接 `a * b`。两个变量都用 `double`。

**补充解析**　若边长允许小数，用 `double` 读入。输入 `3.5 2` 时，第一个 `int` 只能读到 `3`，第二次读入遇到小数点会失败。若题面要求固定小数位，可用 `fixed` 和 `setprecision` 控制。原程序采用默认格式。

**边界**　边长取整数时输出仍是整数形式（`11 7`），不会自动带 `.0`；这正是默认格式的行为。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main()
{
    double a,b;
    cin>>a>>b;
    cout<<(2*(a+b))<<" "<<a*b<<endl;
    return 0;
}
```

[查看原始 B.cpp](https://drive.google.com/file/d/1hkVmtB35zETcistdxZQH1tWLEsp-yLlr/view?usp=drivesdk)

## C

<!-- homework-topic: 打印正方形 -->

> **题目**　**打印正方形**
>
> 读入边长 `n`，用 `*` 画一个 `n × n` 的空心正方形；同一行相邻的两个格之间留一个空格。
>
> `n = 3` 时输出：
>
> ```text
> * * *
> *   *
> * * *
> ```

**思路**　把图形当成 `n × n` 的字符矩阵，外层循环走行 `i`，内层循环走列 `j`，每个格先决定打 `*` 还是空格，再决定要不要补分隔空格。

**关键条件**　`i == 0 || i == n-1 || j == 0 || j == n-1` 就是四条边：首行、末行、首列、末列。落在任一条边上打 `*`，其余打空格。写成一个条件而不是四组 `if`，行列两个方向就自然被覆盖，不需要额外判断角点——角点同时满足两个条件也只打一次。

**循环状态**　内层每处理一个格，紧接着判断 `j != n-1` 再补一个分隔空格，所以行末不会多出尾随空格。`n = 3` 的一行共 5 个字符位置（3 个格 + 2 个分隔空格），中间那行就是 `*`、空格、空格、空格、`*`，即 `*   *`。整幅图输出 `n (2n - 1)` 个字符，时间 `O(n²)`。

**边界**　`n = 1` 时只有一个格，同时是四条边，输出一颗 `*`；`n = 2` 时每个格都在边上，输出两行 `* *`。小尺寸不需要特判。

**提交差异**　本地代码先打印输入提示，再检查 `n` 是否在 `1–20`。如果题面只要求打印图形，提交时去掉提示语。

**补充要点**　读到 `0` 时，整数提取成功，范围检查要求重读。如果后面已到 EOF，重读失败且 `n` 仍为 0，程序会一直输出提示语。若 OJ 要求标准输出只包含图案，也应去掉输入提示。下面的版本处理单组合法输入。

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cout << ((i == 0 || i == n - 1 || j == 0 || j == n - 1) ? '*' : ' ');
            if (j != n - 1) cout << ' ';
        }
        cout << '\n';
    }
    return 0;
}
```

把 `if / else` 收进一个条件表达式，是为了让「打什么」和「补不补分隔空格」两件事分开，循环体更短，边界判断也只有一处。

**待确认**　原题样例可确认星号间隔、行末是否允许尾随空格，以及是否要求多组输入。

**原始代码**

```cpp
//我不会，使用deepseek

#include <iostream>
using namespace std;

int main() {
    int n;

    // 读入边长，并校验范围
    cout << "请输入正方形的边长（1-20）：";
    cin >> n;
    while (n < 1 || n > 20) {
        cout << "输入无效，请输入 1 到 20 之间的整数：";
        cin >> n;
    }

    // 逐行打印
    for (int i = 0; i < n; ++i) {          // i 表示行
        for (int j = 0; j < n; ++j) {      // j 表示列（第几个星号位置）
            // 第一行、最后一行、第一列、最后一列打印 '*'
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1)
                cout << '*';
            else
                cout << ' ';

            // 除了最后一列，每个位置后面加一个分隔空格
            if (j != n - 1)
                cout << ' ';
        }
        cout << endl;                      // 每行结束换行
    }

    return 0;
}
```

[查看原始 C.cpp](https://drive.google.com/file/d/1uCdCQmPIRyHGQ6wsznT0utDQrF41fFFe/view?usp=drivesdk)

## D

<!-- homework-topic: 数的奇偶判断（习题 2-2） -->

> **题目**　**数的奇偶判断（习题 2-2）**
>
> 连续读入整数，偶数输出 `even`，奇数输出 `odd`，每个结果一行。
>
> 输入 `0 -3 4` 时输出 `even`、`odd`、`even` 三行。

**思路**　判断 `a % 2 == 0`。

**为什么这样做**　只判断「是不是偶数」，剩下的自然就是奇数，不需要第二个条件。用 `a % 2 == 1` 判断奇数则会出错：C++ 的取模保留被除数的符号，`-3 % 2` 得到 `-1`，负奇数会被判成偶数。

**循环状态**　`while (cin >> a)` 每轮先尝试读一个整数，读到就进循环体，读到 EOF 或类型不符时表达式的值为假，循环结束。这正是「不知道有几组」的标准写法，比先读组数更稳。

**边界**　`0` 是偶数；负奇数如 `-3`、`-1` 也走 `odd` 分支。

**补充解法**　三目表达式可以把分支压成一行，每组 `O(1)`：

```cpp
while (cin >> a)
    cout << (a % 2 == 0 ? "even" : "odd") << '\n';
```

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a;
    while (cin>>a) {

        if (a%2==0) {
            cout<<"even"<<endl;
        } else {
        cout<<"odd"<<endl;
        }
    }
    return 0;
}
```

[查看原始 D.cpp](https://drive.google.com/file/d/1O9vjItB_ixks9HmZpqkPH2RORnS8flWM/view?usp=drivesdk)

## E

<!-- homework-topic: 最小数 -->

> **题目**　**最小数**
>
> 每组三个整数，输出其中的最小值，一行一个。输入 `3 4 2` 时输出 `2`。

**思路**　嵌套三目：先比 `num1` 和 `num2`，胜者再和 `num3` 比。

**为什么两次比较就够**　最小值只需要两次比较。第一层 `num1 <= num2` 先淘汰较大的那个——被淘汰的数不可能比留下来的数更小，所以它不可能再是最小值；之后只让留下的数与 `num3` 比一次就能定出答案。三个数两两比较则要三次。

**关键细节**　用 `<=` 而不是 `<`，相等时取任意一个都对，但同一个表达式里统一方向能让内层两个分支的判断一致，少一处容易看错的地方。

**边界**　三个数相等、含负数、含 `0` 都能正确输出；`cin` 一次读三个数，中途缺数据时整组被丢弃，不会输出半组结果。

**补充要点**　局部变量 `min` 会遮蔽未限定的同名函数。加上 `<algorithm>` 后，可以显式调用 `std::min({num1, num2, num3})`（C++11 起支持该重载）。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main()
{
    int num1,num2,num3;
    while (cin>>num1>>num2>>num3) {
         int min;
         min=(num1<=num2)?(num1<=num3?num1:num3):(num2<=num3?num2:num3) ;
         cout<<min<<endl;
    }

}
```

[查看原始 E.cpp](https://drive.google.com/file/d/1ff97l4M0q1XvkWFIitYrKrrzQhzsnnLK/view?usp=drivesdk)

## F

<!-- homework-topic: 逆序输出 -->

> **题目**　**逆序输出**
>
> 每组读入一个非负五位整数，按个位到万位的顺序输出这五位数字，中间用空格分隔，每组一行。
>
> 输入 `12030` 时输出 `0 3 0 2 1`；输入 `10000` 时输出 `0 0 0 0 1`。

**思路**　先把五位分别取出来：`a = n / 10000`、`b = n / 1000 % 10`、`c = n / 100 % 10`、`d = n / 10 % 10`、`e = n % 10`，再按 `e d c b a` 输出。

**为什么这样做**　按位输出能保留 `0`。若把数值本身反过来（`12030` 反转成 `3021` 再打印），末位的 `0` 会消失，输出就只剩四个数字。题目要的是五个数字，所以必须拆位、逐个打印。

**缺陷**　主版本在 `while` 里输出五个数字后没有换行，多组数据会首尾相连。实测输入 `12030` 和 `10000` 得到 `0 3 0 2 10 0 0 0 1`：第一组的 `1` 和第二组的 `0` 粘成了一个 `10`，看起来像少了一个数。文件末尾注释里的循环版本补了换行，是正确的形态。

**补充解法**　用取模和整除做固定五轮循环，并为每组补上换行。`n % 10` 取末位，`n /= 10` 丢掉末位，重复五次正好把五位从低位到高位吐出；`i > 0` 只在第二个数字起补空格，行末不留尾随空格。每组 `O(1)`。

```cpp
#include <iostream>

int main() {
    int number;
    while (std::cin >> number) {
        for (int i = 0; i < 5; ++i) {
            if (i > 0) std::cout << ' ';
            std::cout << number % 10;
            number /= 10;
        }
        std::cout << '\n';
    }
}
```

**边界**　`12030` → `0 3 0 2 1`；`10000` → `0 0 0 0 1`；`99999` → `9 9 9 9 9`。这套写法假定输入确实是非负五位数：不足五位时会多打印前导 `0`，输入负数时各位的符号会让拆位结果错乱。

**补充要点**　把输入当字符串读，直接从后往前打印，天然保留前导 `0`，也不受位数限制：

```cpp
string s;
while (cin >> s) {
    for (int i = (int)s.size() - 1; i >= 0; --i)
        cout << s[i] << (i > 0 ? ' ' : '\n');
}
```

**待确认**　输入是否固定为五位；多组时按组换行这一点需要题面样例确认。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main ()
{
    int n;
    while (cin>>n) {
        int a,b,c,d,e;
        a=n/10000;
        b=n/1000%10;
        c=n/100%10;
        d=n/10%10;
        e=n%10;
        cout<<e<<" "<<d<<" "<<c<<" "<<b<<" "<<a;
    }

}

/*
#include <iostream>
using namespace std;

int main() {
    int n;
    while (cin >> n) {
        for (int i = 0; i < 5; i++) {
            cout << n % 10;
            n /= 10;
            if (i < 4) cout << " ";
        }
        cout << endl;
    }
    return 0;
}
*/
```

[查看原始 F.cpp](https://drive.google.com/file/d/1zPDhqJ6t9zxHGRnE75Hw6rq0jaSw5a_a/view?usp=drivesdk)

## 方法小结

这一组的六个程序都很短，练的是三件事：

- **类型决定输出**：同一个 35，按 `int` 输出是 `35`，按 `char` 输出是 `#`。读完题先想清楚每个值该用什么类型承载。
- **按位置构造**：方形图案和拆位逆序都是「先确定每个位置该放什么，再按顺序生成」，而不是先形成整体字符串再处理。
- **读到 EOF 的循环**：`while (cin >> x)` 是处理不定组数的通用骨架；组内需要累加或计数的变量必须在循环体内重新初始化，位置放错就会跨组叠加。
