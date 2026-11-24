---
slug: "03-control-flow"
title: "流程控制"
summary: "选择、循环与流程转向语句，以及课堂例题和练习。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "course"
displayNumber: "3"
sources:
  - kind: article
    title: "第三章流程控制.pptx"
    url: "https://drive.google.com/file/d/1lct1mumo1_dZrO-8SjB6WlFEYrHunYjE/view"
---

# 第 3 章 流程控制

任何复杂的程序都可以由顺序结构、选择结构和循环结构组合而成。顺序结构按书写次序逐条执行；选择结构根据条件决定执行哪一支；循环结构让一段操作重复执行。C++ 中实现选择的主要是 `if`、`if-else` 和 `switch`，实现循环的主要是 `while`、`do-while` 和 `for`，另有 `break`、`continue`、`goto` 三个流程转向语句。

学习本章的重点不是背语法，而是把三件事说清楚：判断的条件是什么、循环的初值和终止条件是什么、哪条语句让循环趋向结束。

## 3.1 选择控制结构

选择结构用于“根据条件有选择地执行”。例如求一个数的绝对值，要根据它的符号决定取本身还是取相反数。写选择结构时，先要把所有可能的情况分清楚，再让每个条件真正互斥、没有遗漏。

### 3.1.1 if 语句

`if` 是单分支条件语句，格式为：

```cpp
if (表达式1) {
    语句组1
}
```

`if` 是关键字，`表达式1` 可以是任意表达式。C++ 把非零值视为真，零视为假。执行时先求表达式的值：为真就执行语句组，为假就跳过整个 `if` 结构，继续执行后面的语句。

![if 语句执行流程](/images/campus-cpp-programming/03-if-flow.png)

如果语句组只有一条语句，花括号可以省略；但建议初学阶段始终写花括号，避免后面加语句时出错。用花括号括起来的一组语句称为**复合语句**，在语法上相当于一条语句。

> **易错点**　**补充说明**　对整数 `x`，`if (x = 0)` 会把 0 写进 `x`，随后条件为假。写成 `if (x = 1)` 则会把 1 写进 `x`，条件为真。编译器可能给出警告，这两种赋值在语法上都成立。

**例 3.1** 假设 `n` 为任一整数，编程序求 `n` 的绝对值。

根据绝对值的定义：

$$
|n| =
\begin{cases}
n, & n \ge 0,\\
-n, & n < 0.
\end{cases}
$$

程序先用 `absn = n` 保存“正数情形”的结果，再在 `n` 为负时把它改成相反数：

```cpp
// 用 if 语句求一个整数的绝对值
#include <iostream>
using namespace std;

int main()
{
    int n, absn;
    cout << "请输入一个整数：";
    cin >> n;
    absn = n;              // 先假设 n 非负
    if (n <= 0)
        absn = -n;         // n 为负（或 0）时取相反数
    cout << "n的绝对值为：" << absn << endl;
    return 0;
}
```

这里 `absn = n` 不能省。若省略，`n` 为正时 `absn` 没有被赋值，输出的就是不确定的值。`n = 0` 时执行 `absn = -0`，结果仍是 0，不影响正确性。严格说，若 `n` 恰好是 32 位 `int` 的最小值（`-2147483648`），`-n` 超出 `int` 的正数范围，结果未定义；本例题按常规范围的整数讨论，实际程序可先用 `long long` 接收或单独判断这个边界。

### 3.1.2 if-else 语句

`if-else` 是二分支条件语句，格式为：

```cpp
if (表达式1) {
    语句组1
}
else {
    语句组2
}
```

表达式为真执行语句组 1，否则执行语句组 2。两支必居其一。

![if-else 语句执行流程](/images/campus-cpp-programming/03-if-else-flow.png)

**例 3.2** 用 `if-else` 求整数 `n` 的绝对值。

```cpp
// 用 if-else 求一个整数的绝对值
#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "请输入一个整数：";
    cin >> n;
    if (n <= 0)
        cout << "n的绝对值为：" << -n << endl;
    else
        cout << "n的绝对值为：" << n << endl;
    return 0;
}
```

与例 3.1 相比，这里不需要预先给 `absn` 赋值，两个分支各自直接输出。两种写法都正确；`if-else` 把“两种情况”表达得更清楚。

**例 3.3** 求三个学生综合测评分的最高分。

先读入三个数，再把第一个数当作当前最大值，让后两个数依次和它比较：

```cpp
// 求三个学生综合测评分的最高分
#include <iostream>
using namespace std;

int main()
{
    double num1, num2, num3, max;
    cout << "请输入三个学生的综合测评分：";
    cin >> num1 >> num2 >> num3;
    max = num1;
    if (max < num2)
        max = num2;
    if (max < num3)
        max = num3;
    cout << "最高分为：" << max << endl;
    return 0;
}
```

执行完第一个 `if` 后，`max` 是 `num1` 与 `num2` 中的较大者；执行完第二个 `if` 后，`max` 就是三者的最大值。这种“先取一个候选，再让后面的数逐个挑战”的做法就是后面循环求最值时反复使用的“打擂台”思想。

### 3.1.3 if 语句的嵌套

`if` 或 `if-else` 的语句组里还可以再包含 `if` 语句，形成嵌套。嵌套时最容易出错的是 `else` 与哪个 `if` 配对。

C++ 规定：**`else` 默认与前面离它最近、并且还没有与其他 `else` 配对的 `if` 配对。** 例如：

```cpp
if (E1)
    if (E2) S1;
    else S2;
```

这里的 `else` 与内层的 `if (E2)` 配对，执行条件是：

- `E1 && E2` 时执行 `S1`；
- `E1 && !E2` 时执行 `S2`；
- `E1` 为假时，`S1`、`S2` 都不执行。

如果想让 `else` 与外层 `if` 配对，必须用花括号把内层 `if` 包起来：

```cpp
if (E1) {
    if (E2) S1;
}
else S2;
```

> **易错点**：此时 `S2` 的执行条件是 `!E1`。**缩进不决定配对关系，花括号才决定。**

**例 3.4** 综合测评分分档：90～100 为优秀，80～89 为良好，70～79 为中等，60～69 为及格，60 分以下为不及格。输入一个分数，输出档次。

```cpp
// 输出综合测评分的档次
#include <iostream>
using namespace std;

int main()
{
    int num;
    cout << "请输入综合测评分：";
    cin >> num;
    if (num >= 90)
        cout << "优秀\n";
    else if (num >= 80)
        cout << "良好\n";
    else if (num >= 70)
        cout << "中等\n";
    else if (num >= 60)
        cout << "及格\n";
    else
        cout << "不及格\n";
    return 0;
}
```

分数段是互斥且有序的，所以可以从高到低依次判断。**每个 `else` 都隐含“前面的条件都不成立”**：能走到 `num >= 80` 这一支，说明已经知道 `num < 90`。如果从低到高写，就必须把条件写成 `num >= 60 && num < 70` 这样的完整区间，否则 95 分会在第一支就被误判为“及格”。

**课堂例题：货物运费。** 每吨运费单价 $p$ 与运输距离 $s$ 的关系为：

$$
p =
\begin{cases}
30, & s < 100,\\
27.5, & 100 \le s < 200,\\
25, & 200 \le s < 300,\\
22.5, & 300 \le s < 400,\\
20, & s \ge 400.
\end{cases}
$$

输入货物重量 $w$ 吨、距离 $s$ 公里，总运费为 $t = p \cdot w \cdot s$。

```cpp
// 计算货物运费
#include <iostream>
#include <iomanip>
using namespace std;

int main()
{
    double t, p, w, s;
    cout << "Please input weight (ton): ";
    cin >> w;
    cout << "Please input distance (kilometre): ";
    cin >> s;
    if (s < 100)
        p = 30;
    else if (s < 200)
        p = 27.5;
    else if (s < 300)
        p = 25;
    else if (s < 400)
        p = 22.5;
    else
        p = 20;
    t = p * w * s;
    cout << "The cost is: " << fixed << setprecision(2) << t << '$' << endl;
    return 0;
}
```

**各分段的顺序不能随意调换。** 每个 `else` 都表示“前面的条件全部不成立”，所以 `s < 200` 实际上代表 $100 \le s < 200$。若把 `s < 300` 放到最前面，输入 $s = 150$ 会先命中 `s < 300`，得到 $p = 25$，而正确结果应为 $p = 27.5$。

若只写 `setprecision(2)`，默认按有效数字输出；若要固定两位小数，应再配合 `fixed`。

**例 3.5** 输入一个整数，判断它是正数还是负数。

```cpp
// 判断整数的正、负
#include <iostream>
using namespace std;

int main()
{
    int Inta;
    cout << "请输入一个整数：";
    cin >> Inta;
    if (Inta >= 0) {
        if (Inta > 0)
            cout << "正数\n";
    }
    else
        cout << "负数\n";
    return 0;
}
```

这个例子用嵌套 `if` 演示了“外层先判断非负，内层再判断是否严格大于 0”。输入正数输出“正数”，输入负数输出“负数”。输入 0 时内层条件不成立，程序没有任何输出——题目只要求区分正数和负数，0 不属于这两类；若实际需求要求 0 也有提示，应补一个 `else` 分支输出“零”。

**例 3.6** 将三个学生的综合测评分按从高到低的顺序输出。

三个数排序可以这样想：先把前两个数排好序，再把第三个数插入。第三个数只有三个可能的位置——第一个数之前、第一和第二个数之间、第二个数之后。按这个思路，嵌套判断即可覆盖全部情况：

```cpp
// 三个同学综合测评分从高到低排序
#include <iostream>
using namespace std;

int main()
{
    int num1, num2, num3;
    cout << "请输入三个同学的综合测评分：";
    cin >> num1 >> num2 >> num3;
    cout << "按从高到低的顺序是：\n";
    if (num1 >= num2)
        if (num2 >= num3)
            cout << num1 << '\t' << num2 << '\t' << num3 << endl;
        else if (num3 >= num1)
            cout << num3 << '\t' << num1 << '\t' << num2 << endl;
        else
            cout << num1 << '\t' << num3 << '\t' << num2 << endl;
    else
        if (num2 <= num3)
            cout << num3 << '\t' << num2 << '\t' << num1 << endl;
        else if (num3 >= num1)
            cout << num2 << '\t' << num3 << '\t' << num1 << endl;
        else
            cout << num2 << '\t' << num1 << '\t' << num3 << endl;
    return 0;
}
```

分支虽多，但每一支都对应一种大小关系。例如 `num1 >= num2` 且 `num2 < num3` 时，第三个数要么最大（`num3 >= num1`），要么夹在两者之间；前者输出 `num3, num1, num2`，后者输出 `num1, num3, num2`。等号归入相邻分支不会漏掉情况。

**例 3.7** 求一元二次方程 $ax^2 + bx + c = 0$ 的根。

求根公式为：

$$
x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
$$

编程时要分四种情况：

1. $a = 0$：方程不是二次方程；
2. $b^2 - 4ac = 0$：两个相同的实根，$x_{1,2} = -\dfrac{b}{2a}$；
3. $b^2 - 4ac > 0$：两个不同的实根，直接用求根公式；
4. $b^2 - 4ac < 0$：两个共轭复根，实部为 $-\dfrac{b}{2a}$，虚部为 $\dfrac{\sqrt{4ac-b^2}}{2a}$。

```cpp
// 求一元二次方程的根
#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    double a, b, c, d, x1, x2, rp, ip;
    cout << "a, b, c = ";
    cin >> a >> b >> c;
    if (fabs(a) <= 1e-8) {
        cout << "It is not quadratic." << endl;
    }
    else {
        d = b * b - 4 * a * c;
        if (fabs(d) <= 1e-8) {
            cout << "It has two equal real roots: " << -b / (2 * a) << endl;
        }
        else if (d > 1e-8) {
            x1 = (-b + sqrt(d)) / (2 * a);
            x2 = (-b - sqrt(d)) / (2 * a);
            cout << "It has two distinct real roots: " << x1 << " and " << x2 << endl;
        }
        else {
            rp = -b / (2 * a);
            ip = sqrt(-d) / (2 * a);
            cout << "It has two complex roots: " << endl;
            cout << rp << " + " << ip << "i" << endl;
            cout << rp << " - " << ip << "i" << endl;
        }
    }
    return 0;
}
```

先判断 $a$ 是否近似为 0，是为了避免除以 0 并把一次方程误当二次方程。判别式与 0 比较时用 `1e-8` 而不是直接写 `== 0`，因为实数运算有舍入误差。复根情形不能直接对负数开平方，所以先算实部 `rp`，再对 `-d` 开方得到虚部 `ip`。

**课堂练习 1** 设有函数关系

$$
y =
\begin{cases}
-1, & x < 0,\\
0, & x = 0,\\
1, & x > 0.
\end{cases}
$$

下列选项中，能正确表示上述关系的是（ ）。

- A：`y = 1; if (x >= 0) if (x == 0) y = 0; else y = -1;`
- B：`y = -1; if (x != 0) if (x > 0) y = 1; else y = 0;`
- C：`if (x <= 0) if (x < 0) y = -1; else y = 0; else y = 1;`
- D：`y = -1; if (x <= 0) if (x < 0) y = -1; else y = 0;`

**答案：C。**

C 中内层 `if (x < 0)` 的 `else` 与它自己配对，外层的 `else` 与 `if (x <= 0)` 配对：$x < 0$ 得 $-1$，$x = 0$ 得 $0$，$x > 0$ 得 $1$。A 的 `else` 被内层 `if` 抢走，$x > 0$ 时会得到 $-1$；B 的 `else` 也与内层配对，$x < 0$ 时会得到 $0$；D 在 $x > 0$ 时保持初值 $-1$。

**课堂练习 2** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a, b, c, d, x;
    a = c = 0;
    b = 1;
    d = 20;
    x = 10;
    if (a)
        d = d - 10;
    else if (!b)
        if (!c)
            x = 15;
        else
            x = 25;
    cout << d << " " << x << endl;
    return 0;
}
```

**答案：`20 10`。**

`a` 为 0，`if (a)` 不成立；`b` 为 1，`!b` 为假，所以外层 `else if` 也不成立，内层 `if (!c)` 根本不会执行。`d` 和 `x` 都保持原值。

### 3.1.4 switch 语句

`switch` 用于多分支选择，尤其适合“根据一个整数或字符的取值，从若干个固定分支中选一个”的情况。格式为：

```cpp
switch (表达式) {
case 常量表达式1:
    语句组1;
case 常量表达式2:
    语句组2;
    ...
case 常量表达式n:
    语句组n;
default:
    语句组n+1;
}
```

其中：

- `switch`、`case`、`default` 是关键字；
- `表达式` 不能是浮点型，可以是整型、字符型或枚举类型；
- 每个 `case` 后的常量表达式必须是与 `switch` 表达式类型相容的常量，且各 `case` 的值必须互不相同；
- `default` 是可选项，表示“其他值”；
- `case` 和 `default` 到冒号为止的部分只是**语句标号**，只标识位置，不会自动“跳出去”；
- 一个 `case` 后可以写多条语句，不需要用花括号括起来；`case` 标号本身不构成一个语句块。

> **关键结论**：`switch` 的执行方式是：先求表达式的值，然后直接跳到值相等的那个 `case` 标号；如果没有相等的 `case`，就跳到 `default`；如果连 `default` 也没有，就跳过整个 `switch`。**跳到某个标号后，程序会继续往下执行，直到遇到 `break` 或 `switch` 结束。** 这就是所谓的“贯穿”（fall-through）。

**例 3.8** 输入一个整数：1 输出“红楼梦”，2 输出“西游记”，3 输出“三国演义”，4 输出“水浒传”，其他输出“输入错误”。

先看一个**没有 `break`** 的版本：

```cpp
// switch 语句的贯穿现象
#include <iostream>
using namespace std;

int main()
{
    int x;
    cout << "请输入一个整数：";
    cin >> x;
    switch (x) {
    case 1:
        cout << "红楼梦" << endl;
    case 2:
        cout << "西游记" << endl;
    case 3:
        cout << "三国演义" << endl;
    case 4:
        cout << "水浒传" << endl;
    default:
        cout << "输入错误" << endl;
    }
    cout << "程序运行结束！" << endl;
    return 0;
}
```

输入 2 时，程序跳到 `case 2`，输出“西游记”，然后继续执行 `case 3`、`case 4` 和 `default`，于是把后面的内容全部输出。`case` 只是入口标号，并不会在执行完本段后自动停止。

要让每个分支真正独立，必须在每个分支末尾加 `break`：

```cpp
switch (x) {
case 1:
    cout << "红楼梦" << endl;
    break;
case 2:
    cout << "西游记" << endl;
    break;
case 3:
    cout << "三国演义" << endl;
    break;
case 4:
    cout << "水浒传" << endl;
    break;
default:
    cout << "输入错误" << endl;
}
```

此时输入 2 只输出“西游记”，然后跳出 `switch`。

使用 `switch` 还要注意：

1. **`case` 值不能重复。** 例如两个 `case 2` 会让编译器无法确定跳到哪一个，直接报错。
2. **`case` 和 `default` 的书写次序可以任意。** 在所有分支都有 `break` 的情况下，顺序不影响结果；但为了可读性，通常把 `default` 放在最后。
3. **`default` 放在最前面也不会“先执行”。** `switch` 是直接跳到匹配标号，不是从上往下逐条判断。例如把 `default` 写在 `case 1` 前面，输入 1 仍然跳到 `case 1`；只有输入没有匹配的 `case` 时才跳到 `default`。
4. **`switch` 可以嵌套，也可以与 `if` 嵌套。** 内层 `switch` 的 `case` 标号与外层无关；内层 `break` 只跳出内层 `switch`。

**例 3.9** 输入年份和月份，输出该月的天数。

每年 1、3、5、7、8、10、12 月有 31 天；4、6、9、11 月有 30 天；2 月闰年 29 天，平年 28 天。闰年的条件是：年份能被 4 整除但不能被 100 整除，或者能被 400 整除。

```cpp
// 输入年份和月份，输出该月的天数
#include <iostream>
using namespace std;

int main()
{
    int year, month, days;
    cout << "输入年份：";
    cin >> year;
    cout << "输入月份：";
    cin >> month;
    switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:
        days = 30;
        break;
    case 2:
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
            days = 29;
        else
            days = 28;
        break;
    default:
        days = 0;
    }
    if (days != 0)
        cout << "本月的天数为：" << days << endl;
    else
        cout << "输入的月份不对！" << endl;
    return 0;
}
```

多个 `case` 可以共用一段语句组，例如 `case 1: case 3: ...` 都执行 `days = 31`。`case 2` 里嵌套 `if` 判断闰年，最后用 `days == 0` 识别非法月份。

**例 3.10** 输入形如“两个运算量 + 一个运算符”的算术表达式，运算符为 `+`、`-`、`*`、`/`，计算并输出结果。

```cpp
// 简单的算术运算
#include <iostream>
using namespace std;

int main()
{
    double num1, num2, result;
    bool ok = true;
    char op;
    cout << "input num1, op and num2: ";
    cin >> num1 >> op >> num2;
    switch (op) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': result = num1 / num2; break;
    default: ok = false;
    }
    if (ok)
        cout << num1 << op << num2 << " = " << result << endl;
    else
        cout << "input error!" << endl;
    return 0;
}
```

`switch` 的表达式是字符型 `op`，每个 `case` 用字符常量。`default` 只把标志 `ok` 置为假，最后统一输出错误信息。这个程序没有检查除数是否为 0；若 `num2 == 0` 且 `op == '/'`，会得到无穷大或非法值，实际使用时应补上判断。

**课堂练习 3** 假设 `i = 2`，执行下列语句后 `i` 的值为（ ）。

```cpp
switch (i) {
case 1: i++;
case 2: i--;
case 3: ++i; break;
case 4: --i;
default: i++;
}
```

**答案：2（B）。**

从 `case 2` 进入，`i--` 后 `i = 1`；没有 `break`，继续贯穿到 `case 3`，`++i` 后 `i = 2`；遇到 `break` 跳出。后面的 `case 4` 和 `default` 不再执行。

**课堂练习 4** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 0, b = 1;
    switch (a) {
    case 0:
        switch (b) {
        case 0: cout << "a=" << a << " b=" << b << endl; break;
        case 1: cout << "a=" << a << " b=" << b << endl; break;
        }
    case 1:
        a++;
        b++;
        cout << "a=" << a << " b=" << b << endl;
    }
    return 0;
}
```

**答案：**

```text
a=0 b=1
a=1 b=2
```

外层 `a = 0` 进入 `case 0`，内层 `b = 1` 输出第一行；内层 `break` 只跳出内层 `switch`，外层 `case 0` 的语句组还没有结束，于是继续贯穿到 `case 1`，执行 `a++`、`b++`，输出第二行。

## 3.2 循环控制结构

循环结构用于重复执行同一段操作，例如求 $1 \sim 10000$ 的和。C++ 提供 `while`、`do-while` 和 `for` 三种循环语句。

写循环时先回答四个问题：

1. 循环体要做什么；
2. 进入循环的条件是什么；
3. 循环结束的条件是什么；
4. 哪条语句修改循环控制变量，使条件最终不成立。

### 3.2.1 while 语句

`while` 是“当型循环”，先判断条件，再决定是否执行循环体：

```cpp
while (表达式) {
    语句组
}
```

`while` 是关键字，表达式是循环条件。C++ 把非零值视为真、零视为假，所以条件也可以是整数表达式。语句组称为循环体；只有一条语句时花括号可以省略。

执行流程：

1. 求表达式的值；
2. 若为假（0），循环体一次也不执行，直接跳到循环后面；
3. 若为真（非 0），执行循环体，然后回到第 1 步。

因此，`while` 的循环体可能一次也不执行。要正常退出，循环体中必须有修改循环条件的语句，或者使用 `break` 等转向语句。

![while 循环求 1 到 n 的累加和](/images/campus-cpp-programming/03-while-sum-flow.png)

**例 3.11** 编程序求

$$
1 + 2 + 3 + \cdots + n.
$$

用 `sum` 存放累加结果，`i` 从 1 开始，每次把 `i` 加到 `sum` 中，然后 `i++`：

```cpp
// 求 1 到 n 的累加和
#include <iostream>
using namespace std;

int main()
{
    int n, sum = 0, i = 1;   // i 为循环控制变量
    cout << "请输入n的值：";
    cin >> n;
    while (i <= n) {
        sum = sum + i;
        i++;
    }
    cout << "sum = " << sum << endl;
    return 0;
}
```

> **易错点**：循环条件 `i <= n` 决定“还要不要继续加”；循环体中的 `i++` 让 `i` 逐渐增大，最终使条件不成立。若忘记 `i++`，`i` 永远为 1，条件永远为真，程序陷入死循环。

累加时还要考虑溢出。下面是增加了溢出判断的版本：

```cpp
// 求 1 到 n 的累加和，并判断是否溢出
#include <iostream>
using namespace std;

const int Maxint = 2147483647;   // 32 位 int 的最大值

int main()
{
    int n, sum = 0, i = 1;
    bool overflow = false;       // 未溢出为 false，溢出为 true
    cout << "请输入n的值：";
    cin >> n;
    while (i <= n) {
        if (sum <= Maxint - i) { // 加之前先判断
            sum = sum + i;
            i++;
        }
        else {
            overflow = true;
            break;
        }
    }
    if (!overflow)
        cout << "sum = " << sum << endl;
    else
        cout << "溢出！" << endl;
    return 0;
}
```

判断 `sum <= Maxint - i` 而不是等加完再检查，是为了避免加法本身已经溢出、结果变成负数后才发现。累加器初始化为 0，乘法器（后面求阶乘）则初始化为 1，这是两类累加问题的固定习惯。

**计算 5 个浮点数的平均值**：

```cpp
// 计算 5 个浮点数的平均值
#include <iostream>
using namespace std;

int main()
{
    const int ListSize = 5;
    int processed = 0;       // 已处理个数
    double sum = 0;          // 累加器
    cout << "Please enter " << ListSize << " numbers" << endl;
    while (processed < ListSize) {
        double value;
        cin >> value;
        sum += value;
        ++processed;
    }
    double average = sum / processed;
    cout << "Average: " << average << endl;
    return 0;
}
```

`value` 定义在循环体内，只在本次迭代中使用；`processed` 既是计数器，也是循环控制变量。

如果不知道数据个数，可以用“读到输入结束”作为循环条件：

```cpp
// 计算若干个浮点数的平均值，以 Ctrl-Z 结束输入
#include <iostream>
using namespace std;

int main()
{
    int processed = 0;
    double sum = 0, value;
    cout << "Please enter list of numbers" << endl;
    while (cin >> value) {
        sum += value;
        ++processed;
    }
    if (processed > 0) {
        double average = sum / processed;
        cout << "Average: " << average << endl;
    }
    else {
        cout << "No list to average" << endl;
    }
    return 0;
}
```

表达式 `cin >> value` 的值是输入流的状态：读入成功时为真，遇到文件结束或非法输入时为假。Windows 下按 `Ctrl-Z` 再回车表示输入结束，Unix/Linux 下通常是 `Ctrl-D`。循环结束后要判断 `processed > 0`，否则一个数也没读入时会出现除以 0。

**死循环的例子：**

```cpp
int i = 0, s = 0;
while (i <= 100) {
    i *= 2;
    s += i;
}
```

`i` 的初值是 0，`0 * 2` 仍然是 0，`i <= 100` 永远为真，循环无法结束。循环体中没有让条件趋向假的有效修改，是死循环的典型原因。

**例 3.12** 用牛顿迭代法求数 $a$ 的平方根，迭代公式为

$$
x_{n+1} = \frac{x_n + a/x_n}{2}.
$$

先取 $x_1 = a/2$ 作为初始估计，再反复用公式算 $x_2, x_3, \dots$，直到前后两次迭代值之差足够小。

```cpp
// 用牛顿迭代法求一个正数的平方根
#include <iostream>
using namespace std;

const double EPS = 0.0001;

int main()
{
    double a, x1, x2;
    cout << "请输入一个正数：";
    cin >> a;
    x1 = a / 2;
    x2 = (x1 + a / x1) / 2;
    while (x2 - x1 > EPS || x1 - x2 > EPS) {
        x1 = x2;
        x2 = (x1 + a / x1) / 2;
    }
    cout << a << "的平方根是：" << x2 << endl;
    return 0;
}
```

`x1` 保存上一次的值，`x2` 保存本次的值。条件 `x2 - x1 > EPS || x1 - x2 > EPS` 等价于 $|x_2 - x_1| > \varepsilon$，这样写不需要调用 `fabs`。`EPS` 越小，结果越精确，但迭代次数也越多。算法要求 $a > 0$；若输入 0 或负数，`a / x1` 可能除以 0 或对负数开方，应在输入处加检查。

**迭代**是指不断用新值替代旧值，或由旧值递推出新值，逐步逼近目标。牛顿法用前后两次近似值反复修正，斐波那契数列用最近两项滚动计算下一项，都是迭代的思想。

**例 3.13** 求两个正整数 $m$ 和 $n$ 的最大公约数。

用辗转相除法。其依据是：

$$
\gcd(m,n) = \gcd(n, m \bmod n),
$$

当余数为 0 时，另一个数就是最大公约数。例如 $m = 24$、$n = 9$：

- $\gcd(24,9) = \gcd(9, 24 \bmod 9) = \gcd(9,6)$；
- $\gcd(9,6) = \gcd(6, 9 \bmod 6) = \gcd(6,3)$；
- $\gcd(6,3) = \gcd(3, 6 \bmod 3) = \gcd(3,0)$；
- 余数为 0，最大公约数为 3。

```cpp
// 求两个正整数的最大公约数
#include <iostream>
using namespace std;

int main()
{
    int m, n, a, b, r;
    cout << "input two integers:\n";
    cout << "? ";
    cin >> m;
    cout << "? ";
    cin >> n;
    if (m > n) {
        a = m;
        b = n;
    }
    else {
        a = n;
        b = m;
    }
    r = b;                 // 余数初值，保证第一次进入循环
    while (r != 0) {
        r = a % b;
        a = b;
        b = r;
    }
    cout << m << " and " << n << " maximal common divisor is : " << a << endl;
    return 0;
}
```

先把较大值放入 `a`、较小值放入 `b`，然后用 `r = a % b` 求余，再整体替换 `a = b`、`b = r`。循环结束时 `b` 为 0，`a` 就是最大公约数。`r = b` 只是为了让循环第一次能进入；也可以写成 `while (b != 0) { r = a % b; a = b; b = r; }`。

**课堂练习 5** 已知 `int i = 0, x = 0;`，下面 `while` 语句的循环次数为（ ）。

```cpp
while (!x && i < 3) {
    x++;
    i++;
}
```

**答案：1 次（D）。**

初始 `x = 0`，`!x` 为真，`i = 0 < 3`，进入循环；执行后 `x = 1`、`i = 1`。再次判断时 `!x` 为假，循环结束。

**课堂练习 6** 有语句

```cpp
int i = 5, sum = 0;
while (i--) {
    sum += i % 2;
}
```

循环结束后 `sum` 的值等于（ ）。

**答案：2（A）。**

`i--` 先用旧值判断，再减 1。循环体中的 `i` 依次为 4、3、2、1、0，`i % 2` 依次为 0、1、0、1、0，累加得 2。

**课堂练习 7** 有语句

```cpp
int a = 5, b = 1;
while (a - b) {
    a--;
    b++;
}
```

循环体执行的次数是（ ）。

**答案：2 次（B）。**

`a - b` 依次为 4、2、0；前两次为真，第三次为假，循环结束。

### 3.2.2 do-while 语句

`while` 先判断后执行，循环体可能一次也不执行。如果希望循环体**至少执行一次**，可以用 `do-while`：

```cpp
do {
    语句组
} while (表达式);
```

先执行一次循环体，再判断表达式：为真就继续，为假就退出。`do-while` 又称为“直到型循环”。注意 `while (表达式)` 后面的分号不能省略。

例如求 $1 + 2 + \cdots + 100$：

```cpp
int s = 0, i = 1;
do {
    s += i;
    i++;
} while (i <= 100);
```

它与下面的 `while` 版本等价（在 `i` 初值满足条件时）：

```cpp
int s = 0, i = 1;
while (i <= 100) {
    s += i;
    i++;
}
```

一般情况下两者可以互换；差别在于，若一开始条件就为假，`while` 一次也不执行，`do-while` 仍会执行一次。

> **易错点**　**补充说明**　`do-while` 的 `while (表达式)` 后必须写分号。它会先执行一次循环体。如果操作前必须确认还有元素可处理，例如从容器取出首元素，应把条件放在循环体前检查。

**二进制字符串转十进制正整数。** 输入一个二进制数字串，例如 `1011`，要输出 11。二进制数 $b_n b_{n-1}\cdots b_1 b_0$ 的值为：

$$
\text{Dec} = b_n 2^n + b_{n-1}2^{n-1} + \cdots + b_1 2 + b_0.
$$

从高位到低位逐位处理时，可以用 `Dec = Dec * 2 + digit` 的累加方式。下面的代码采用等价的写法：先把当前位的值加到 `Dec`，如果后面还有二进制位，再把 `Dec` 乘以 2（左移一位），为下一位腾出位置。程序先用一个 `do-while` 跳过前导非二进制字符，再用第二个 `do-while` 逐位转换。

```cpp
// 输入二进制数字串，转换成十进制正整数
#include <iostream>
using namespace std;

int main()
{
    int Dec = 0;
    char ch = '\0';
    cout << "Binary = ";
    do {
        if (!cin.get(ch)) {            // 读到文件结束
            cout << "No binary digits.\n";
            return 0;
        }
    } while (ch != '0' && ch != '1');   // 跳过前导符号，直到第一个 0 或 1
    do {
        Dec += ch - '0';               // 把字符转换为数字并累加
        if (!cin.get(ch)) break;       // 没有下一位，结束
        if (ch == '0' || ch == '1')
            Dec *= 2;                  // 还有下一位，已转换部分左移一位
    } while (ch == '0' || ch == '1');
    cout << "Decimal = " << Dec << '\n';
    return 0;
}
```

以 `1011` 为例：读入第一位 1，`Dec = 1`；下一位仍是二进制数字，`Dec *= 2` 得 2；读入 0，`Dec = 2`，下一位是 1，`Dec *= 2` 得 4；读入 1，`Dec = 5`，下一位是 1，`Dec *= 2` 得 10；读入 1，`Dec = 11`，下一位是换行符，不再乘 2，循环结束。这里用 `do-while` 是因为至少要读入一个字符。`cin.get(ch)` 在文件结束时返回假且不修改 `ch`，所以两处循环都用它的返回值退出，而不是只看 `ch`：若输入中没有 0 或 1，第一个循环在 EOF 处结束并提示；若最后一个二进制位后没有换行，第二个循环也不会拿旧字符反复计算。

**例 3.14** 求圆周率 $\pi$ 的近似值。利用公式

$$
\frac{\pi^2}{6} = 1 + \frac{1}{2^2} + \frac{1}{3^2} + \cdots + \frac{1}{n^2} + \cdots,
$$

要求最后一项的绝对值小于 $10^{-12}$。

```cpp
// 求 pi 的近似值
#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main()
{
    long int i;
    double sum, term, pi;
    sum = 1;
    i = 1;
    do {
        i += 1;
        term = 1.0 / (double(i) * i);   // 用 double 避免 i*i 在 32 位 long 上溢出
        sum += term;
    } while (term >= 1.0e-12);
    pi = sqrt(sum * 6);
    cout << "pi = " << fixed << setprecision(10) << pi << endl;
    return 0;
}
```

先累加右端的和，再乘 6 开平方得到 $\pi$。因为 $1/i^2 \to 0$，可以用“最后一项小于给定精度”作为停止条件。这个级数收敛较慢，截断误差大约与 $1/i$ 同阶，所以即使算到 $10^{-12}$ 的项，$\pi$ 的精度也有限；它适合练习循环和精度控制，不是高精度算法。

`1.0 / (i * i)` 在 32 位平台上 `long` 也是 32 位，$i$ 接近 $10^6$ 时 `i * i` 会溢出；上面的代码把其中一个因子转成 `double`，避免整数乘法溢出。

**例 3.15** 用牛顿迭代法求方程

$$
f(x) = x^3 + 2x^2 + 10x - 20 = 0
$$

的根。牛顿迭代公式为

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.
$$

本题中 $f'(x) = 3x^2 + 4x + 10$，所以

$$
x_{n+1} = x_n - \frac{x_n^3 + 2x_n^2 + 10x_n - 20}{3x_n^2 + 4x_n + 10}.
$$

给定初值 $x_0$ 和精度 $\varepsilon$，反复迭代，直到 $|f(x_i)| < \varepsilon$。

```cpp
// 用牛顿迭代法求方程的根
#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    double x0, x1, epsilon;
    cout << "Input test root, x0 = ";
    cin >> x0;
    cout << "Input precision, epsilon = ";
    cin >> epsilon;
    do {
        x1 = x0 - (pow(x0, 3) + 2 * pow(x0, 2) + 10 * x0 - 20)
                  / (3 * pow(x0, 2) + 4 * x0 + 10);
        x0 = x1;
    } while (fabs(pow(x1, 3) + 2 * pow(x1, 2) + 10 * x1 - 20) > epsilon);
    cout << "The root is : " << x0 << endl;
    return 0;
}
```

牛顿法的几何意义是用当前点处的切线与 $x$ 轴的交点作为下一个近似根。本题的 $f'(x) = 3x^2 + 4x + 10$ 的判别式 $16 - 120 < 0$，且二次项系数为正，所以 $f'(x)$ 恒大于 0，$f(x)$ 严格递增，方程只有一个实根；只要初值取得不太离谱，迭代会收敛。

程序用 $|f(x_1)| \le \varepsilon$ 判断是否足够接近根，而不是用 $|x_1 - x_0|$，两种停止准则都可以，前者直接控制函数值误差。

**例 3.16** 输入 $x$，用级数计算 $\sin x$：

$$
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots,
$$

要求最后一项的绝对值小于 $10^{-8}$。

如果每一项都重新计算幂和阶乘，代价很大。观察相邻两项的比值：

$$
\frac{x^5/5!}{x^3/3!} = -\frac{x^2}{4 \cdot 5}, \qquad
\frac{x^7/7!}{x^5/5!} = -\frac{x^2}{6 \cdot 7}.
$$

一般地，设当前项为 $t_n$（$n$ 为指数），下一项为 $t_{n+2}$，则

$$
t_{n+2} = t_n \cdot \frac{-x^2}{(n+1)(n+2)}, \qquad n = 1, 3, 5, \dots
$$

利用这个递推公式，每次只需做一次乘法和除法：

```cpp
// 用级数求 sin x 的值
#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    long int n;
    double x, term, sinx;
    cout << "x = ";
    cin >> x;
    n = 1;          // 当前项 x 的指数
    sinx = x;       // 累加器初值
    term = x;       // 当前项
    do {
        n += 2;                                  // 指数加 2
        term *= (-x * x) / (n - 1) / n;          // 由前一项递推当前项
        sinx += term;
    } while (fabs(term) >= 1e-8);
    cout << "sin(" << x << ") = " << sinx << endl;
    return 0;
}
```

第一次循环 `n` 从 1 变成 3，`term` 乘以 $-x^2/(2 \cdot 3)$，得到 $-x^3/3!$；下一次 `n = 5`，再乘以 $-x^2/(4 \cdot 5)$，得到 $x^5/5!$。循环在最后一项绝对值小于 $10^{-8}$ 时结束。注意程序会先把这一项加进 `sinx` 再判断，因此包含了一个略小于阈值的尾项，这对结果的影响很小；若要求严格，可以把“计算项”和“累加”分开，先判断再累加。

**课堂练习 8** 已知 `int i = 3;`，下面 `do-while` 语句的循环次数为（ ）。

```cpp
do {
    i--;
    cout << i << endl;
} while (i != 1);
```

**答案：2 次（B）。**

第一次 `i` 变为 2，输出 2，`2 != 1` 为真；第二次 `i` 变为 1，输出 1，`1 != 1` 为假，循环结束。

**课堂练习 9** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int i = 0, j = 5;
    do {
        i++;
        j--;
        if (i > 3)
            break;
    } while (j > 0);
    cout << "i=" << i << endl << "j=" << j << endl;
    return 0;
}
```

**答案：`i=4`，`j=1`。**

前三次循环后 `i = 3`、`j = 2`，条件 `j > 0` 仍为真；第四次 `i = 4`、`j = 1`，`i > 3` 成立，执行 `break` 跳出，输出 `i=4`、`j=1`。

### 3.2.3 for 语句

`for` 既可以用于次数已知的循环，也可以用于条件循环。一般形式为：

```cpp
for (表达式1; 表达式2; 表达式3) {
    语句组
}
```

执行顺序：

1. 执行 `表达式1` 一次，通常用于给循环控制变量赋初值；
2. 判断 `表达式2`，为真则执行循环体，为假则退出；
3. 执行 `表达式3`，通常用于修改循环控制变量；
4. 回到第 2 步。

它等价于：

```cpp
表达式1;
while (表达式2) {
    语句组;
    表达式3;
}
```

三个表达式都可以省略，但两个分号不能省。省略全部表达式时写成 `for (;;)`，相当于 `while (1)`，需要在循环体中用 `break` 退出。

> **关键结论**　**补充说明**　当三个部分都写出，且循环正常因条件为假结束时，初始化执行一次，条件比循环体多判断一次。遇到 `continue`，`for` 先执行更新表达式再判断条件，`while` 直接重新判断条件。在两者的循环体中，`continue` 都会跳过它后面剩余的语句。

求 $1 + 2 + \cdots + 100$：

```cpp
int s = 0;
for (int i = 1; i <= 100; i++)
    s += i;
```

`for` 把初值、条件和更新集中在一行，适合“次数型循环”。

几种常见的省略形式：

```cpp
// 1. 省略表达式1：初值在 for 之前给出
int i = 1, sum = 0;
for (; i <= 100; i++)
    sum += i;

// 2. 省略表达式2：在循环体中用 break 退出
for (i = 1; ; i++) {
    sum += i;
    if (i > 100) break;
}

// 3. 省略表达式3：把更新放进循环体
for (i = 1; i <= 100; ) {
    sum += i;
    i++;
}

// 4. 省略循环体：把累加放到表达式3，循环体为空语句
for (i = 1, sum = 0; i <= 100; sum += i, i++)
    ;
```

第 4 种写法利用逗号表达式：`sum += i, i++` 依次执行两个表达式，整个表达式的值是最后一个子表达式的值。单独的分号是**空语句**，表示循环体什么也不做。逗号表达式可以压缩代码，但可读性差，初学阶段不建议滥用。

**例 3.17** 求 $n! = 1 \times 2 \times \cdots \times n$，$n$ 从键盘输入。

乘法器初始化为 1（不是 0），每乘一次前先判断是否溢出：

```cpp
// 求 n!
#include <iostream>
using namespace std;

const int Maxint = 2147483647;

int main()
{
    int i, n;
    long int t;
    bool overflow = false;
    cout << "input one integer n: ";
    cin >> n;
    t = 1;
    for (i = 1; i <= n; i++) {
        if (t <= Maxint / i) {   // 乘之前判断
            t *= i;
        }
        else {
            overflow = true;
            break;
        }
    }
    if (!overflow)
        cout << n << "! = " << t << endl;
    else
        cout << "溢出！" << endl;
    return 0;
}
```

$12! = 479001600$，在 32 位 `int` 范围内；$13! = 6227020800$，超过 `Maxint`。程序在乘 13 之前发现 `t > Maxint / 13`，置溢出标志并退出。`long int` 在 Windows 上通常也是 32 位，所以这里按 32 位上限判断；若平台上的 `long` 是 64 位，这个检查仍会按 `Maxint` 提前停止，不会利用更大的范围。

**例 3.18** 输入若干个学生的综合测评分，统计 85～100、60～84、60 分以下三个分数段的人数。

```cpp
// 统计各分数段人数
#include <iostream>
using namespace std;

int main()
{
    int i, n, n1 = 0, n2 = 0, n3 = 0;
    double score;
    cout << "请输入学生人数：";
    cin >> n;
    for (i = 1; i <= n; i++) {
        cin >> score;
        if (score >= 85)
            n1++;
        else if (score >= 60)
            n2++;
        else
            n3++;
    }
    cout << "85--100: " << n1 << endl;
    cout << "60--84 : " << n2 << endl;
    cout << " 0--59 : " << n3 << endl;
    return 0;
}
```

三个计数器都要先初始化为 0。条件从高到低判断：能进入 `score >= 60` 这一支，说明已经知道 `score < 85`，所以不需要再写 `score < 85`。

**例 3.19** 求 Fibonacci 数列的前 $n$ 项。数列为

$$
0,\ 1,\ 1,\ 2,\ 3,\ 5,\ 8,\ 13,\ 21,\ \dots
$$

定义是 $a_0 = 0$，$a_1 = 1$，从第 2 项起 $a_i = a_{i-1} + a_{i-2}$。

用三个变量 `a0`、`a1`、`a2` 滚动迭代：算出 `a2 = a0 + a1` 后，把 `a1` 赋给 `a0`，把 `a2` 赋给 `a1`，为下一项做准备。

```cpp
// 列出 Fibonacci 数列的前 n 项
#include <iostream>
using namespace std;

const int MaxInt = 2147483647;

int main()
{
    int n, i, a0 = 0, a1 = 1, a2;
    cout << "输入需列出的项数：";
    cin >> n;
    cout << a0 << '\t' << a1 << '\t';
    for (i = 3; i <= n; i++) {
        if (a1 < MaxInt - a0) {
            a2 = a0 + a1;
            cout << a2 << '\t';
            if (i % 10 == 0)
                cout << endl;       // 每行显示 10 项
            a0 = a1;
            a1 = a2;
        }
        else {
            cout << "\n第" << i << "项开始溢出！";
            break;
        }
    }
    return 0;
}
```

`if (a1 < MaxInt - a0)` 在加法之前判断，等价于判断 `a0 + a1 < MaxInt`，但不会先发生溢出。`i % 10 == 0` 在输出第 10、20……项后换行。边界上，程序无条件先输出 `a0` 和 `a1` 两项，所以输入 $n = 1$ 时仍会输出两个数；若严格要求“前 $n$ 项”，应在输出前判断 $n$ 是否至少为 1、2。

**课堂练习 10** 下面 `for` 语句执行时的循环次数为（ ）。

```cpp
int i, j;
for (i = 0, j = 5; i = j; ) {
    cout << i << j << endl;
    i++;
    j--;
}
```

**答案：5 次（B）。**

条件 `i = j` 是赋值表达式，不是比较。每轮先把 `j` 赋给 `i`，只要赋后的值非零就继续。`j` 依次为 5、4、3、2、1 时循环体执行 5 次；`j` 变为 0 时 `i = 0`，条件为假，循环结束。

**课堂练习 11** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int i, j;
    for (i = 1, j = 5; i < j; i++) {
        j--;
    }
    cout << i << '\t' << j << endl;
    return 0;
}
```

**答案：`3    3`。**

第一轮 `i = 1 < 5`，`j` 变为 4，`i++` 后为 2；第二轮 `2 < 4`，`j` 变为 3，`i++` 后为 3；第三轮 `3 < 3` 为假，循环结束，输出 `i = 3`、`j = 3`。

### 3.2.4 循环语句的嵌套

一个循环的循环体里再包含另一个循环，称为循环嵌套。`while`、`do-while`、`for` 可以互相嵌套。外层循环每执行一次，内层循环都要完整地执行一遍；若外层执行 $m$ 次、内层执行 $n$ 次，内层循环体一共执行 $m \times n$ 次。嵌套两层以上称为多重循环。

> **易错点**　**补充说明**　若希望每轮外层循环都扫描全部内层位置，每次进入内层前都要重置下标。把 `j = 1` 移到最外层且只执行一次，第一趟之后 `j` 会停在内层终止值，后续各趟就跳过整个内层。

**例 3.20** 测试双层循环的执行次数。

```cpp
// 双层循环示例
#include <iostream>
using namespace std;

int main()
{
    cout << "i\tj\n";
    for (int i = 1; i <= 3; i++) {
        cout << i;
        for (int j = 1; j <= 3; j++) {
            cout << '\t' << j << endl;
        }
    }
    return 0;
}
```

外层 `i` 取 1、2、3；对每个 `i`，内层 `j` 都从 1 到 3 完整执行。程序先输出一次 `i`，再在内层每次输出 `j` 并换行，所以输出为：

```text
i	j
1	1
	2
	3
2	1
	2
	3
3	1
	2
	3
```

内层循环体共执行 $3 \times 3 = 9$ 次。若想让每行同时显示 `i` 和 `j`，可以把 `cout << i;` 移进内层，写成 `cout << i << '\t' << j << endl;`。

**例 3.21** 给定正整数 $n$ 和 $m$，在 $1 \sim n$ 这 $n$ 个数中取出两个不同的数，使它们的和是 $m$ 的因子，问有多少种取法。

枚举所有“两个不同数”的组合。设较小的数为 `i`，较大的数为 `j`，则 `i` 从 1 到 $n-1$，`j` 从 `i+1` 到 $n$。这样每个组合只出现一次，不会重复计数。

```cpp
// 统计两个不同数之和为 m 的因子的取法数
#include <iostream>
using namespace std;

int main()
{
    int n, m, i, j;
    int total = 0;
    cin >> n >> m;
    for (i = 1; i < n; i++) {
        for (j = i + 1; j <= n; j++) {
            if (m % (i + j) == 0)
                total++;
        }
    }
    cout << total << endl;
    return 0;
}
```

`m % (i + j) == 0` 表示 `i + j` 能整除 `m`，也就是 `i + j` 是 `m` 的因子。两层循环把所有组合逐一检查，这就是枚举（穷举）算法：解空间有限且可以遍历时，最直接的方法就是全部试一遍。

**例 3.22** 百钱百鸡问题：公鸡 5 钱一只，母鸡 3 钱一只，小鸡 1 钱三只。用 100 钱买 100 只鸡，问公鸡、母鸡、小鸡各多少只。

设公鸡 `x` 只、母鸡 `y` 只、小鸡 `z` 只。由总数得 `z = 100 - x - y`，所以只需枚举 `x`、`y` 两重循环。`x` 最多 20（全买公鸡），`y` 最多 33（全买母鸡）。

```cpp
// 百钱百鸡问题
#include <iostream>
using namespace std;

int main()
{
    int x, y, z;
    cout << "公鸡\t母鸡\t小鸡\t" << endl;
    for (x = 0; x <= 20; x++) {
        for (y = 0; y <= 33; y++) {
            z = 100 - x - y;
            if (5 * x + 3 * y + z / 3 == 100 && z % 3 == 0)
                cout << x << '\t' << y << '\t' << z << endl;
        }
    }
    return 0;
}
```

> **易错点**：关键在钱数的判断。小鸡 1 钱 3 只，所以每只小鸡合 $1/3$ 钱。若只写 `z / 3`，C++ 会做整数除法，把小数部分丢掉；例如 `z = 98` 时 `z / 3` 得 32，可能让不满足条件的组合被误判。程序同时要求 `z % 3 == 0`，保证小鸡数是 3 的倍数，再用整数除法才等价于 `z / 3.0`。也可以直接写 `5*x + 3*y + z/3.0 == 100`，但浮点相等比较不如整数取余稳妥。

程序输出四组解：

| 公鸡 | 母鸡 | 小鸡 |
|---:|---:|---:|
| 0 | 25 | 75 |
| 4 | 18 | 78 |
| 8 | 11 | 81 |
| 12 | 4 | 84 |

**例 3.23** 求区间 $[a,b]$ 之间的所有素数。素数是指除 1 和它本身外没有其他约数的整数，例如 2、3、5、7、11；4、6、8、9 都不是素数。

按定义，可以用 $2,3,\dots,m-1$ 逐个试除。但数学上可以证明：若 $m$ 有大于 $\sqrt{m}$ 的因子 $d$，则 $m/d$ 是小于 $\sqrt{m}$ 的因子。因此只需在 $2 \sim \lfloor\sqrt{m}\rfloor$ 之间检查；找到一个约数就可以断定 $m$ 不是素数，立即停止测试。

```cpp
// 求一个区间内的素数
#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    int m, i, k, n = 0;
    int a, b, t;
    cin >> a >> b;
    if (a > b) {          // 确保 a <= b
        t = a;
        a = b;
        b = t;
    }
    for (m = a; m <= b; m++) {
        if (m < 2)
            continue;     // 0 和 1 不是素数
        k = int(sqrt((double)m));
        i = 2;
        while (m % i && i <= k)
            i++;
        if (i > k) {
            cout << m << '\t';
            n++;
            if (n % 5 == 0)
                cout << endl;   // 每行 5 个
        }
    }
    return 0;
}
```

`while (m % i && i <= k)` 在 `i` 还是候选约数时继续；一旦 `m % i == 0` 就停下，说明找到了约数。循环结束后若 `i > k`，说明 $2 \sim k$ 中没有任何数能整除 `m`，`m` 是素数。若不排除 `m < 2`，输入区间包含 0 或 1 时会把它们误判为素数；上面的 `if (m < 2) continue;` 是必要的补充。

## 3.3 流程转向语句

`break`、`continue`、`goto` 用于改变正常的顺序执行。它们能让程序更灵活，但也容易破坏结构，使用时要知道每个语句的作用范围。

### 3.3.1 break 语句

`break` 有两种用途：

1. 出现在 `switch` 中，跳出 `switch` 结构；
2. 出现在循环体中，立即跳出当前循环。

格式为：

```cpp
break;
```

> **关键结论**：在多重循环中，`break` 只能跳出**直接包含它的那一层**循环，不能一次跳出所有层。若 `switch` 本身在循环体中，`switch` 里的 `break` 只跳出 `switch`，不会跳出外面的循环。

**例 3.24** 判断一个整数是否为素数。用 `for` 循环测试因子，一旦找到一个因子，就立即 `break`，不必再试后面的数。

```cpp
// 判定素数
#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    int i;
    long m;
    cout << "Please input a number:\n";
    cin >> m;
    if (m < 2) {                 // 补充：0、1 和负数不是素数
        cout << m << " 不是素数." << endl;
        return 0;
    }
    double sqrtm = sqrt((double)m);
    for (i = 2; i <= sqrtm; i++)
        if (m % i == 0)
            break;               // 找到因子，立即退出 for 循环
    if (sqrtm < i)
        cout << m << " 是素数." << endl;
    else
        cout << m << " 不是素数." << endl;
    return 0;
}
```

循环结束后如何判断是“正常试完”还是“中途 break”？如果循环完整执行，`i` 会超过 `sqrt(m)`，所以 `sqrtm < i` 为真；如果是 `break` 出来的，`i` 一定满足 `i <= sqrtm`，所以 `sqrtm < i` 为假。这个技巧避免了额外的标志变量，但依赖循环结束后 `i` 的值，阅读时要看清。

**例 3.25** 如果两个不同的正整数，它们的和是它们的积的因子，则称这两个数为“兄弟数”，小的称为弟数，大的称为兄数。输入正整数 $m$ 和 $n$（$m < n$），在 $m \sim n$ 之间找出一对兄弟数：若找到，输出和最小的那一对；若有多对和相同且最小，输出弟数最小的那一对；若找不到，输出 `No Solution.`。

思路是枚举每一对不同的数，用两个变量 `a`、`b` 记录目前找到的最佳兄弟数。发现更小的和就更新；和相同但弟数更小也更新。

```cpp
// 找兄弟数：和最小，和相同则弟数最小
#include <iostream>
using namespace std;

int main()
{
    int m, n;
    int a, b, i, j;
    cin >> m >> n;
    a = n + 1;      // 哨兵：比任何可能的弟数都大
    b = n + 1;      // 哨兵：比任何可能的兄数都大
    for (i = m; i < n; i++) {              // 取弟数
        if (i > (a + b) / 2 + 1)
            break;                          // 后面的和不可能更小
        for (j = i + 1; j <= n; j++) {      // 取兄数
            if (i + j > a + b)
                break;                      // j 再大，和只会更大
            if (i * j % (i + j) == 0) {     // 找到一对兄弟数
                if (i + j < a + b) {
                    a = i;
                    b = j;
                }
                else if (i + j == a + b && i < a) {
                    a = i;
                    b = j;
                }
            }
        }
    }
    if (a == n + 1)
        cout << "No Solution." << endl;
    else
        cout << a << "," << b << endl;
    return 0;
}
```

`a`、`b` 初始化为 `n + 1`，这是一个“不可能取到”的哨兵值；如果循环结束仍是这个值，说明一对都没找到。内层 `break` 利用 `j` 递增、`i + j` 递增的性质：当前和已经超过最优和，后面的 `j` 只会让和更大，不可能更优。外层 `break` 类似：若 `i` 继续增大，最小可能的和 $2i+1$ 也会超过当前最优和，后面的弟数都不必再试。

**break 与 exit 的区别：** `break` 只终止当前所在的循环或 `switch`，程序继续执行后面的语句；`exit(1)` 会终止整个程序，通常在遇到无法继续的严重错误时使用，参数 0 表示正常退出，非 0 表示异常退出。一般业务逻辑不要用 `exit` 代替 `break`。

### 3.3.2 continue 语句

`continue` 只能出现在循环体中，作用是**结束本次循环**，不执行 `continue` 后面的语句，直接进入下一次循环：

- 对 `for`，执行 `continue` 后跳到表达式 3，再判断表达式 2；
- 对 `while` 和 `do-while`，跳到循环条件判断。

格式为：

```cpp
continue;
```

> **注意**：`continue` 不会增加循环的出口；循环是否结束仍由循环条件决定。若把更新循环变量的语句放在 `continue` 后面，可能会导致死循环。

**例 3.26** 逢 7 过小游戏：100 个玩家从 1 开始报数，遇到数字中含有 7 或 7 的倍数时跳过，输出实际报出的数。

```cpp
// 逢 7 过：跳过含 7 的数和 7 的倍数
#include <iostream>
using namespace std;

int main()
{
    for (int number = 1; number <= 100; number++) {
        if (number % 7 == 0 || number / 10 == 7 || number % 10 == 7)
            continue;              // 满足条件，跳过本次输出
        cout << number << "\t";
    }
    return 0;
}
```

三个条件分别对应：7 的倍数（`number % 7 == 0`）、十位是 7（`number / 10 == 7`，覆盖 70～79）、个位是 7（`number % 10 == 7`）。`continue` 跳过 `cout`，直接进入下一轮 `number++`。

**break 与 continue 的对比：**

| 语句 | 作用 | 对循环的影响 |
|---|---|---|
| `break` | 立即跳出当前循环或 `switch` | 循环提前结束 |
| `continue` | 跳过本次循环剩余语句 | 循环继续，是否结束仍看条件 |

**课堂练习 12** 以下程序段输出结果是（ ）。

```cpp
int i, n = 0;
for (i = 0; i < 10; i++) {
    if (i % 3)
        continue;
    n++;
}
cout << n << endl;
```

**答案：4（D）。**

`i % 3` 非零时跳过 `n++`，只有 `i = 0, 3, 6, 9` 时 `n` 增加，共 4 次。

**课堂练习 13** 以下程序段输出结果是（ ）。

```cpp
int i, n = 0;
for (i = 0; i < 10; i++) {
    if (i % 3)
        break;
    n++;
}
cout << n << endl;
```

**答案：1（A）。**

`i = 0` 时 `i % 3 == 0`，`n` 变为 1；`i = 1` 时 `i % 3` 非零，执行 `break`，循环立即结束，输出 1。

**课堂练习 14** 执行以下程序段后，`x` 的值是（ ）。

```cpp
int i, j, x = 0;
for (i = 0; i <= 3; i++) {
    x++;
    for (j = 0; j <= 3; j++) {
        if (j)
            continue;
        x++;
    }
}
```

**答案：8（A）。**

外层执行 4 次，每次 `x++` 得 4；内层 `j = 0` 时 `j` 为假，`x++` 执行，每个外层一次，共 4 次；`j = 1, 2, 3` 时 `continue` 跳过。总计 $4 + 4 = 8$。

**课堂练习 15** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int i, s = 0;
    for (i = 0; i < 5; i++)
        switch (i) {
        case 0: s += i; break;
        case 1: s += i; break;
        case 2: s += i; break;
        default: s += 2;
        }
    cout << "s=" << s << endl;
    return 0;
}
```

**答案：`s=7`。**

`i = 0, 1, 2` 时分别加 0、1、2；`i = 3, 4` 进入 `default`，各加 2。总和 $0 + 1 + 2 + 2 + 2 = 7$。

**课堂练习 16** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int i, j, x = 0;
    for (i = 0; i <= 3; i++) {
        x++;
        for (j = 0; j <= 3; j++) {
            if (j % 2)
                continue;
            x++;
        }
        x++;
    }
    cout << "x=" << x << endl;
    return 0;
}
```

**答案：`x=16`。**

外层每次先 `x++`（4 次），内层 `j = 0, 2` 时各 `x++`（每个外层 2 次，共 8 次），外层末尾再 `x++`（4 次），总计 $4 + 8 + 4 = 16$。

**课堂练习 17** 写出下列程序的输出：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int i = 1;
    while (i <= 10) {
        if (++i % 3 != 1)
            continue;
        else
            cout << i << endl;
    }
    return 0;
}
```

**答案：**

```text
4
7
10
```

每次先 `++i` 再取模。`i` 变为 2、3 时余数不是 1，`continue`；变为 4 时余数为 1，输出 4；同理输出 7、10。之后 `i` 变为 11，循环条件不成立，结束。

### 3.3.3 goto 语句

`goto` 是无条件转向语句，格式为：

```cpp
goto 标号;
...
标号: 语句;
```

标号的命名规则与变量相同。`goto` 和标号必须出现在同一个函数体中，不能从一个函数跳到另一个函数。一个标号只能定义一次，但可以有多个 `goto` 转向同一个标号。

**例 3.27** 兄弟数的定义同例 3.25。输入 $m$ 和 $n$（$m < n$），在 $m \sim n$ 之间找出一对兄弟数（任意一对即可）并输出；找不到输出 `No Solution.`。

用两重循环枚举，找到第一对就用 `goto` 直接跳出两层循环：

```cpp
// 求 m 和 n 之间的一对兄弟数
#include <iostream>
using namespace std;

int main()
{
    int m, n, i, j;
    cin >> m >> n;
    for (i = m; i < n; i++)
        for (j = i + 1; j <= n; j++)
            if ((i * j) % (i + j) == 0)
                goto Finished;
Finished:
    if (i == n)
        cout << "No Solution." << endl;
    else
        cout << i << "," << j << endl;
    return 0;
}
```

找到时 `goto Finished` 跳出两层循环，`i`、`j` 保留找到的那一对；找不到时外层循环正常结束，`i` 变为 `n`，据此输出无解。程序假定 $m<n$；若 $m\ge n$，外层循环一次也不执行，`j` 未初始化。此时 `m==n` 会让 `i==n` 成立而误报 `No Solution.`，`m>n` 则 `i!=n`，程序会输出未初始化的 `j`。应在输入后先检查 $m<n$。

`goto` 会破坏“顺序、选择、循环”的结构化流程，滥用会降低可读性和可维护性。上面的功能可以用标志变量加 `break` 改写：

```cpp
int ai = -1, aj = -1;
for (i = m; i < n && ai < 0; i++)
    for (j = i + 1; j <= n; j++)
        if ((i * j) % (i + j) == 0) {
            ai = i;
            aj = j;
            break;
        }
if (ai < 0)
    cout << "No Solution." << endl;
else
    cout << ai << "," << aj << endl;
```

这种写法层次更清楚，也不需要 `goto`。只有在“从多层循环中直接跳出”且改写确实更繁琐时，才考虑 `goto`。

**课堂练习 18** 以下程序段输出结果是（ ）。

```cpp
int i, n = 0;
for (i = 0; i < 10; i++) {
    if (i > 2)
        goto out;
    n++;
}
out:
cout << n << endl;
```

**答案：3（C）。**

`i = 0, 1, 2` 时 `n` 增加 3 次；`i = 3` 时 `i > 2` 成立，跳到 `out`，输出 3。

## 3.4 应用举例

**例 3.28** 输入 $n$ 个学生的德育、智育、体育和能力积分，按

$$
\text{total} = 0.2 \times \text{moral} + 0.5 \times \text{intellectual} + 0.2 \times \text{physical} + 0.1 \times \text{ability}
$$

计算综合测评分，统计 90 分以上的学生人数，并求最高分、最低分和平均分。

```cpp
// 统计优秀学生人数、最高分、最低分和平均分
#include <iostream>
#include <iomanip>
using namespace std;

int main()
{
    int num, count = 0, max, min;
    double ave = 0;
    int mor, inte, phys, abil;
    int i, t = 0, sum = 0;
    cout << "请输入学生人数：" << endl;
    cin >> num;
    cout << "请依次输入各个学生的德育、智育、体育和能力积分：" << endl;
    for (i = 1; i <= num; i++) {
        cin >> mor >> inte >> phys >> abil;
        t = mor * 0.2 + inte * 0.5 + phys * 0.2 + abil * 0.1;
        if (t >= 90)                 // 统计 90 分以上人数
            count++;
        if (i == 1)
            max = min = t;           // 用第一个学生初始化
        else {
            if (max < t)
                max = t;
            if (min > t)
                min = t;
        }
        sum += t;
    }
    if (num >= 1) {
        ave = sum * 1.0 / num;       // 强制浮点除法
        cout << num << "个参加综合测评学生中优秀学生有：" << count
             << "人，最高分：" << max << "分，最低分：" << min
             << "分，平均分：" << fixed << setprecision(1) << ave << "分。" << endl;
    }
    else {
        cout << "输入的人数不合法！" << endl;
    }
    return 0;
}
```

求最大值和最小值时，不能把 `max` 初始化为 0、`min` 初始化为一个大数就万事大吉：如果所有分数都是负数，`max = 0` 就错了。

更稳妥的做法是用第一个有效数据初始化，再让后面的数据逐个比较。平均分用 `sum * 1.0 / num`，把整数除法变成浮点除法。

> **注意**：`t` 定义为 `int`，综合测评分的公式含 0.2、0.5 等小数，赋值给 `int` 会截断小数部分。若要求保留小数，应把 `t`、`max`、`min`、`sum` 改为 `double`，并相应调整输出。

## 课堂小结

- 选择结构解决“做不做、做哪一支”：`if` 单分支、`if-else` 二分支、`switch` 多分支。
- 嵌套 `if` 的 `else` 与最近未配对的 `if` 配对；缩进不算数，花括号才改变配对。
- `switch` 的 `case` 只是标号，执行完本段不会自动停止；要独立分支就加 `break`。`case` 值不能重复，`default` 位置任意但通常放最后。
- 循环结构解决“重复做”：`while` 先判断后执行，`do-while` 先执行后判断，`for` 把初值、条件、更新集中书写。
- 写循环必须明确四件事：循环体、初值、循环条件、让条件趋向结束的更新；缺少更新会死循环。
- 循环嵌套时，外层每执行一次，内层完整执行一遍；`break` 只跳出最近一层循环或 `switch`，`continue` 只跳过最近一层循环的本次迭代。
- `break` 提前结束循环，`continue` 只跳过本次；`goto` 能不用就不用。
- 浮点数与 0 比较用误差范围；累加、累乘、斐波那契等要注意溢出和边界项。
