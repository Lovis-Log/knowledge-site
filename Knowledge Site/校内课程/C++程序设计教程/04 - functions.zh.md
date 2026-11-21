---
slug: "04-functions"
title: "函数"
summary: "函数定义与调用、参数传递、作用域、递归与课堂习题。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "4"
sources:
  - kind: article
    title: "第四章函数-雨.pptx"
    url: "https://docs.google.com/presentation/d/1mpmriGVVb6_szBLbdJjAwY54ME5tzPyc/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

## 4.1 函数的定义、声明与调用

函数是 C++ 程序的基本组成单位。把完成特定任务的代码封装成函数，调用者只需要知道函数叫什么、要传什么、返回什么，不必关心内部怎样实现。

4.1 要解决三个问题：怎样定义一个函数，怎样调用它，以及当调用出现在定义之前时，怎样让编译器提前知道函数的接口。

### 4.1.1 函数的定义

**定义形式**

一个函数定义由**函数头**和**函数体**组成：

```cpp
返回类型 函数名(形式参数表)
{
    语句;
    return (返回值);
}
```

- **函数头**是函数的接口，包含返回类型、函数名和形式参数表。
- **函数体**是花括号内的实现代码，描述函数具体做什么。
- 定义只是把函数登记下来，函数体不会在定义处自动执行；**只有被调用时才执行**。

三个组成部分的含义如下：

| 成分 | 说明 |
| --- | --- |
| 返回类型 | 函数通过 `return` 返回的值的类型。可以是基本数据类型、用户自定义类型，以及这些类型的指针或引用；没有返回值时写 `void`。 |
| 函数名 | 用户定义的标识符，命名规则与变量名相同。 |
| 形式参数表 | 逗号分隔的参数说明表，每一项一般写成 `类型 参数名`。没有形式参数时，圆括号不能省略；一般形式为 `类型 参数1, 类型 参数2, …, 类型 参数n`。 |

**有几点容易写错：**

- 每个形式参数都要单独写类型。`int f(int a, int b)` 不能写成 `int f(int a, b)`。
- 没有参数时写 `int f()`；`int f` 不是函数定义，圆括号是函数接口的一部分。
- 形式参数是函数内部的局部变量，调用时由实际参数初始化。本节的普通非引用形参拿到实参值的副本；引用参数的规则在后文另行讨论。

**无参数与带参数的例子**

> 下面的片段默认文件前面已经有 `#include <iostream>` 和 `using namespace std;`。单独抄写时要补上这两行，否则 `cout`、`endl` 没有声明。

```cpp
void printHello()  // 定义函数，没有形式参数，返回类型为 void
{
    cout << "Hello, world!" << endl;
    return;        // 可选：void 函数执行到 } 也会自动返回
}
```

- `void` 表示不向调用者返回值。
- `return;` 只结束函数，不带值；在 `void` 函数中可以省略。
- 即使没有参数，`printHello()` 的圆括号也不能省。

```cpp
void printNumber(int number)  // 定义一个函数，带一个参数，返回 void
{
    cout << "The number is: " << number << endl;
}
```

- `int number` 是形式参数。调用 `printNumber(30)` 时，实参 30 的值被复制给 `number`，函数内打印这个副本。
- 函数执行完最后一条语句、到达 `}` 时自动返回调用点。

**带返回值的例子**

```cpp
double max(double num1, double num2)
{
    if (num1 > num2)
        return num1;
    else
        return num2;
}
```

- 返回类型是 `double`，两个形式参数也是 `double`。
- `if/else` 两条路径都有 `return`，所以每次调用都会返回一个值。这是非 `void` 函数必须满足的要求。
- 函数本身不输出，而是把较大值交还给调用者；输出由调用者决定。
- 原页这一行的右端被版式遮挡，只能看到 `double max(double num1, double num…`；参数表按函数体和后续调用补全为 `double num1, double num2`。

**return 语句**

`return` 有两种写法：

```cpp
return 表达式;
return (表达式);
```

两种写法等价。括号只是把表达式括起来，不是函数调用。

`return` 的作用：

1. **返回函数值**：把表达式的值交给调用点，整个函数调用表达式的结果就是这个值。
2. **结束函数**：不再执行 `return` 后面的语句，程序控制立即返回调用点。
3. 一个函数体内可以有多个 `return` 语句，但**每次调用只会执行其中一个**。`max` 的 `if/else` 各有一个 `return`，实际只走一条分支。
4. 表达式的类型与函数返回类型不一致时，会自动转换成函数的返回类型。例如 `double` 函数返回一个 `int` 表达式，结果先转成 `double`；反过来把 `double` 转成 `int` 会丢弃小数部分，这类丢失信息的转换在开启警告时可能被编译器提示。

对 `void` 函数：

- 可以写 `return;` 提前结束，也可以不写；执行到 `}` 会自动返回。
- 不能写 `return 表达式;` 返回一个值（表达式本身为 `void` 类型的特殊情况除外，初学阶段不涉及）。`void` 函数只需 `return;` 或不写 `return`。

对非 `void` 函数：

- 普通有返回值函数若正常执行到末尾却没有返回值，会导致**未定义行为**；`main` 是例外，执行到末尾等价于 `return 0;`。抛出异常或不终止的路径不要求返回值。`max` 的两条正常结束路径都应返回结果。
- 只写 `return;` 或者完全不写 `return` 都是错误的。

几个典型的错误写法：

- `void f() { return 1; }`：`void` 函数返回了值。
- `int f() { return; }`：非 `void` 函数没有返回值。
- `int f(int x) { if (x > 0) return 1; }`：`x <= 0` 的路径没有返回值。

**定义与原型的关系**

函数定义中的函数头同时起到了声明的作用。如果函数定义出现在所有调用之前，编译器在调用点已经知道函数名、返回类型和参数表，就不需要再单独写原型。反过来，如果调用出现在定义之前，就必须先写函数原型（4.1.3）。例 4.1 与例 4.2 的结构差别，正是由这一点决定的。

### 4.1.2 函数的调用

**调用形式**

函数调用的一般形式是：

```cpp
函数名(实际参数表)
```

- **函数名**表示函数的入口地址，编译器或链接器据此找到要执行的代码。
- **实际参数表**中的实参必须与形式参数在个数、类型、位置上一一对应。
- 函数调用可以出现在表达式中，也可以单独作为一条语句。若函数返回类型为 `void`，不能把结果用于需要数值的赋值、输出或运算。本节通常将这种调用单独写成语句；更一般地，void 表达式也可用于允许丢弃结果的上下文。

```cpp
printHello();                    // 语句调用：不带实参
printNumber(30);                 // 语句调用：带一个实参
double Max_n = max(30, 40);      // 表达式调用：返回值用来初始化变量
cout << max(Max_n, 50) << endl;  // 表达式调用：返回值直接参与输出
```

这里的“类型对应”允许标准类型转换。比如 `max` 的形式参数是 `double`，用两个 `int` 调用时，实参先转换成 `double`。转换必须是编译器认可的；不能把两个参数合并成一个。

本节没有默认参数，不能少传；4.2 中提供默认值后可以省略相应的尾部实参。

如果转换会丢失信息（例如把很大的 `double` 传给 `int` 参数），编译器可能警告，程序结果也未必符合预期。

调用发生时，大致经过三步：

1. 计算实际参数表达式的值；
2. 把这些值按位置复制给对应的形式参数；
3. 把控制转到函数体，执行完后带着返回值（如果有）回到调用点。

> **关键结论**：这就是“值传递”的直观含义：函数拿到的是实参值的副本，而不是实参变量本身。4.2 会详细讨论它对修改实参的影响。

**例 4.1 定义和调用函数**

```cpp
#include <iostream>
using namespace std;

void printHello()              // 定义函数，不带参数，返回 void
{
    cout << "Hello, world!" << endl;
}

void printNumber(int number)   // 定义函数，带一个参数，返回 void
{
    cout << "The number is: " << number << endl;
}

double max(double num1, double num2)  // 定义函数，带两个参数，返回 double 类型的值
{
    if (num1 > num2)
        return num1;
    else
        return num2;
}

int main()
{
    printHello();                       // 调用不带参数的函数
    printNumber(30);                    // 调用带参数的函数
    double Max_n = max(30, 40);         // 调用带两个参数的函数，并接收返回值
    cout << "The max number is: " << Max_n << endl;
}  // 程序结束
```

运行结果：

```text
Hello, world!
The number is: 30
The max number is: 40
```

原页第三行印作 `The max number is:40`，但代码中的字符串是 `"The max number is: "`，按代码实际输出应有一个空格；这里按代码补正。

执行过程：

1. 程序从 `main` 开始，而不是从第一个函数定义开始。三个函数定义只是告诉编译器“有这样的函数”，并不会自动执行。
2. `printHello()` 被调用，输出 `Hello, world!`，返回 `main`。
3. `printNumber(30)` 把 30 复制给 `number`，输出 `The number is: 30`，返回。
4. `max(30, 40)` 把 30、40 转换成 `double` 传给 `num1`、`num2`；`30 > 40` 为假，执行 `else` 分支，返回 `num2`，即 40.0。
5. `Max_n` 用返回值初始化，`cout` 输出 `The max number is: 40`。
6. `main` 结束，程序结束。

要点：

- **函数定义的先后顺序不等于执行顺序**。程序入口始终是 `main`；函数只有被调用才执行。
- 返回值可以直接用于初始化、赋值、算术运算或输出，不必先存到变量。
- `max` 的返回类型是 `double`，所以 `Max_n` 是 `double`；`cout` 默认格式把 40.0 显示成 `40`，不会自动补 `.0`。
- 本例中三个函数都定义在 `main` 之前，因此不需要额外的函数原型。若把 `max` 的定义移到 `main` 之后，而 `main` 中仍然调用它，就必须先写原型。

**单选题（例 4.1 之后）**

*原页未标出正确选项，以下答案按函数定义规则判断。*

**单选题 1** 以下正确的函数定义是（ ）。

- A. `int fun4(int a, int b) { return a+b; }`
- B. `void fun4(int a, int b) { return a+b; }`
- C. `int fun4(int a, int b) { fun4 = a+b; }`
- D. `void fun4(int a, int b) { fun4 = a+b; }`

**答案：A。**

函数定义要有返回类型、函数名、参数表和函数体。A 返回 `int`，合法。B、D 的返回类型是 `void`，却用 `return` 返回一个值；C 把函数名当变量赋值，而且没有返回值。D 同时犯了 B、C 的错误。

**单选题 2** 以下正确的函数定义是（ ）。

- A. `void fun5(); { cout<<"Call f5\n"; }`
- B. `void fun5() { return f5; }`
- C. `void fun5() { cout<<"Call f5\n"; }`
- D. `void fun5() { return 5; }`

**答案：C。**

A 在 `fun5()` 后多了分号，函数声明就此结束；后面的花括号不再属于函数体（在命名空间作用域下也不能单独写语句块），所以不是函数定义。B、D 都在 `void` 函数中返回值，B 还使用了未声明的 `f5`；C 是正常的 `void` 函数定义。

### 4.1.3 函数原型

**为什么需要函数原型**

C++ 编译器按顺序处理源文件。当它遇到一个函数调用时，必须已经知道：

- 函数名；
- 返回类型；
- 参数的个数、类型和顺序。

否则编译器无法检查调用是否正确，也不知道返回值是什么类型。C++ 不允许“先调用、后隐式声明”，所以如果调用出现在定义之前，就要先写**函数原型**：

```cpp
类型 函数名(形式参数表);
```

函数原型是一条**声明语句**，以分号结尾。它只描述接口，不包含函数体。编译器根据原型检查调用；函数的实际代码可以在后面定义，最后由链接器把调用和定义连接起来。

原型的作用可以概括为：

- 告诉编译器函数的名字、返回类型和参数表；
- 让编译器在调用点检查实参的个数、类型是否匹配，返回值是否被正确使用；
- 把接口和实现分开：调用者只需要看到原型，实现可以放在后面或另一个源文件中。

**原型与定义的区别**

| | 函数原型（声明） | 函数定义 |
| --- | --- | --- |
| 形式 | `类型 函数名(形式参数表);` | `类型 函数名(形式参数表) { 函数体 }` |
| 结尾 | 分号 | 函数体（花括号） |
| 参数名 | 可以省略，只写类型 | 需要写出参数名才能在函数体中使用 |
| 作用 | 告诉编译器接口，供调用检查 | 提供实现，生成函数代码 |
| 次数 | 可以多次声明，声明必须一致 | 同一个函数在单个翻译单元内只能定义一次。普通非内联函数的定义只能出现一次，符合单一定义规则的内联函数和模板可在多个翻译单元中各有一份定义 |

补充说明：

- 原型中的参数名可以省略。例如 `void fun1(int, int);` 与 `void fun1(int x, int y);` 是同一个原型；编译器只关心类型、个数和顺序。
- 原型和定义的返回类型、参数类型、参数顺序必须一致，否则编译器会报 `conflicting declaration` 一类的错误。
- 在 C++ 中，`void f();` 表示函数没有参数；这与旧式 C 中“参数未指定”的含义不同。
- 如果函数定义出现在调用之前，定义本身已经提供了声明，可以不再写原型；原型主要在“调用在前、定义在后”或跨文件时使用。

**例 4.2 函数原型测试**

```cpp
#include <iostream>
using namespace std;

void printHello();                     // 函数原型声明
void printNumber(int number);          // 函数原型声明
double max(double num1, double num2);  // 函数原型声明

int main()
{
    printHello();                      // 函数调用
    printNumber(30);                   // 函数调用
    double Max_n = max(30, 40);        // 函数调用
    cout << "The max number is: " << Max_n << endl;
}

void printHello()                      // 函数定义
{
    cout << "Hello, world!" << endl;
}

void printNumber(int number)           // 函数定义
{
    cout << "The number is: " << number << endl;
}

double max(double num1, double num2)   // 函数定义
{
    if (num1 > num2)
        return num1;
    else
        return num2;
}
```

运行结果与例 4.1 相同：

```text
Hello, world!
The number is: 30
The max number is: 40
```

说明：

- 前三条是函数原型声明，位于 `main` 之前；`main` 中的三次调用都能被编译器检查。
- 三个函数的定义放在 `main` 之后。编译 `main` 时，编译器只需要原型；链接时再找到后面的定义。
- 本例中调用出现在定义之前，所以原型声明是必须的。如果删掉原型，编译器在 `main` 中看到 `printHello()` 时会报 `not declared in this scope`。
- 如果反过来把三个定义都移到 `main` 之前，就可以省略原型，例 4.1 就是这种写法。两例的输出相同，区别只在编译器是否提前知道接口。
- 原页的结论“函数原型声明是必须的”要结合语境理解：**当调用出现在定义之前时**必须；不是任何情况下都非写不可。

**常用数学库函数**

标准库把常用数学函数的原型放在 `<cmath>` 头文件中。使用这些函数前要 `#include <cmath>`，否则编译器不知道函数名和参数表。下表按双精度、单精度、长双精度三组列出常用数学函数；原表最后一行 `rand` 的情况在表后单独说明。

| 说明 | `double` 版本 | `float` 版本 | `long double` 版本 |
| --- | --- | --- | --- |
| $x$ 的绝对值 | `double fabs(double x);` | `float fabsf(float x);` | `long double fabsl(long double x);` |
| 幂函数 | `double pow(double base, double exponent);` | `float powf(float base, float exponent);` | `long double powl(long double base, long double exponent);` |
| $x$ 的平方根 | `double sqrt(double x);` | `float sqrtf(float x);` | `long double sqrtl(long double x);` |
| 指数函数 $e^x$ | `double exp(double x);` | `float expf(float x);` | `long double expl(long double x);` |
| $x$ 的自然对数（以 $e$ 为底） | `double log(double x);` | `float logf(float x);` | `long double logl(long double x);` |
| $x$ 的对数（以 10 为底） | `double log10(double x);` | `float log10f(float x);` | `long double log10l(long double x);` |
| $x$（弧度）的正弦 | `double sin(double x);` | `float sinf(float x);` | `long double sinl(long double x);` |
| $x$（弧度）的余弦 | `double cos(double x);` | `float cosf(float x);` | `long double cosl(long double x);` |
| $x$（弧度）的正切 | `double tan(double x);` | `float tanf(float x);` | `long double tanl(long double x);` |

原表还有一行 `double rand();`（随机数生成）。标准库中 `rand` 声明在 `<cstdlib>`，原型是 `int rand(void);`；它不属于 `<cmath>` 的三精度函数族，这里按标准单列，原表写法视为笔误。

说明：

- 同一功能的三个版本分别接收和返回 `double`、`float`、`long double`。表中的 f/l 后缀表示显式调用不同名字的函数；C++ 还为无后缀名字提供重载，编译器按实参类型选择重载；例如 `sqrt(10.0)` 选 `double` 版本，`sqrt(10.0f)` 选 `float` 版本。
- 三角函数的角度单位是**弧度**，不是度。若手里是角度，先换算：弧度 = 角度 × $\pi/180$。
- `log` 是自然对数（以 $e$ 为底），`log10` 是以 10 为底；不要把 `log` 当成以 10 为底。
- `pow`、`sqrt`、`sin` 等函数返回浮点值；即使实参是整数，返回值也不会变成 `int`。

**例 4.3 数学函数测试**

```cpp
#include <iostream>
#include <cmath>   // 引入 cmath 库
using namespace std;

int main()
{
    const double PI = 3.14;
    double radius = 10.0;
    double area = PI * pow(radius, 2);   // 调用 pow 函数计算半径的平方
    cout << "The area of the circle is: " << area << endl;
    double sqrtValue = sqrt(radius);     // 调用 sqrt 计算平方根
    cout << "The square root of " << radius << " is " << sqrtValue << endl;
    double sinValue = sin(PI);           // 调用 sin 计算正弦值
    cout << "The sine of " << PI << " is " << sinValue << endl;
    return 0;
}  // 程序结束
```

运行结果：

```text
The area of the circle is: 314
The square root of 10 is 3.16228
The sine of 3.14 is 0.00159265
```

说明：

- `#include <cmath>` 把 `pow`、`sqrt`、`sin` 等函数的原型引入程序。没有这一行，编译器在调用处不知道这些函数，会报 `not declared in this scope`；标准库函数并不是自动可见的。
- `const double PI = 3.14;` 定义了一个只读的 `double` 常量。`const` 表示程序不能修改它；这里用 3.14 近似 $\pi$。
- `pow(radius, 2)` 计算 $10^2=100$，$area = 3.14 \times 100 = 314$。`pow` 返回 `double`，所以 `area` 也是 `double`。
- `sqrt(10)` 的结果是 $3.16227766\ldots$；`cout` 默认按 6 位有效数字输出，显示为 `3.16228`。
- `sin(PI)` 计算的是 `sin(3.14)`，单位是弧度。3.14 只是 $\pi$ 的近似值，比 $\pi$ 略小，所以结果是一个很小的正数 `0.00159265`，而不是 0。若写成 `sin(3.141592653589793)`，结果才会接近 0。这个例子同时说明了角度单位和浮点近似两个问题。
- `return 0;` 表示 `main` 正常结束；`main` 的返回值是程序给操作系统的退出状态，0 通常表示成功。

**单选题（例 4.3 之后）**

*原页未标出正确选项，以下答案按函数原型与调用规则判断。*

**单选题 3** 以下正确的函数原型为（ ）。

- A. `fun1( int x; int y );`
- B. `void fun1( x, y );`
- C. `void fun1( int x, y );`
- D. `void fun1( int, int );`

**答案：D。**

原型必须写出返回类型；参数之间用逗号分隔，每个参数都要有类型。A 没有返回类型且用分号隔参数；B 的参数没有类型；C 的第二个参数 `y` 没有类型；D 省略了参数名，但类型齐全，是合法原型。

**单选题 4** 有函数原型 `int fun2(int, int);` 以下正确的调用语句是（ ）。

- A. `int a=fun2(1);`
- B. `cout<<fun2(3,4);`
- C. `int a=fun2(1)+fun(2);`
- D. `cout<<fun2(3+4);`

**答案：B。**

原型要求两个 `int` 实参。A、D 都只给了一个实参（`3+4` 是一个表达式，只算一个实参）；C 中 `fun2(1)` 少一个实参，`fun(2)` 还是另一个未声明的函数；B 的两个实参个数、类型都匹配，返回值可以直接输出。

**单选题 5** 有函数原型 `void fun3(double);` 以下正确的调用语句是（ ）。

- A. `double a=fun3(0.15);`
- B. `fun3(0.34);`
- C. `double a=fun3(0.1)+f3(0.2);`
- D. `cout<<fun3(3.4);`

**答案：B。**

`fun3` 的返回类型是 `void`，没有值可用，所以 A、C、D 都不能把调用结果赋给变量或输出；C 还调用了拼写错误的 `f3`。只有 B 把 `fun3(0.34)` 当作一条语句调用，实参类型也匹配。

## 4.2 函数的参数传递与返回

函数与调用者之间的数据交换主要走两条通道：调用时通过参数把数据送进函数，返回时通过返回值把结果送回调用点。参数传递决定了函数拿到的是原件还是副本、能不能改动调用者的数据；返回值决定了函数以什么类型、什么方式交出结果。

### 4.2.1 函数参数的传递

函数定义首部列出的参数称为**形式参数**（简称形参），调用函数时写在括号里的参数称为**实际参数**（简称实参）。例如：

```cpp
double cylinderVolume(double radius, double height); // radius、height 是形参

c_volume = cylinderVolume(c_radius, c_height);      // c_radius、c_height 是实参
```

调用发生时，实参表达式先求值，再把值复制到对应的形参对象中。此后函数体里读写的 `radius`、`height` 都是形参对象，和调用者的 `c_radius`、`c_height` 不是同一块存储。函数返回时，形参对象随函数的局部变量一起撤销；对形参的任何修改都不会回传给实参。这种“只把值复制进来、不把修改带出去”的方式称为**值传递**。

值传递有三个要点：

1. 实参可以是变量，也可以是表达式；进入函数的是求值后的副本。
2. 形参是函数内部的局部对象，作用域只在函数体内，生命周期从调用开始到返回结束。
3. 传递是单向的：调用者 → 形参；形参的修改不会反向影响调用者。

如果实参类型和形参类型不一致，会先按形参类型转换，再复制给形参；这个转换可能丢失数据，例4.6会具体看到。

**例4.4 计算圆柱体的体积**

**题目。**

圆柱体的体积公式为

$$
V = \pi r^2 h,
$$

其中 $r$ 是底面半径，$h$ 是高。输入半径和高，计算并输出体积。

**代码。**

```cpp
#include <iostream>
#include <cmath>

const double PI = 3.14;
using namespace std;

double cylinderVolume(double radius, double height); // 函数原型声明

int main()
{
    double c_radius, c_height, c_volume;

    cout << "请输入圆柱体的半径:";
    cin >> c_radius;
    cout << "请输入圆柱体的高:";
    cin >> c_height;

    c_volume = cylinderVolume(c_radius, c_height); // 调用函数
    cout << "圆柱体的体积是：" << c_volume << endl; // 输出结果
}

double cylinderVolume(double radius, double height) // 函数定义，计算圆柱体的体积
{
    return PI * pow(radius, 2) * height;
}
```

**运行结果。**

```text
请输入圆柱体的半径: 2.5
请输入圆柱体的高: 3.8
圆柱体的体积是：74.575
```

**解析。**

调用 `cylinderVolume(c_radius, c_height)` 时，实参 `c_radius` 的值 2.5 复制给形参 `radius`，`c_height` 的值 3.8 复制给形参 `height`。函数内部计算

$$
3.14 \times 2.5^2 \times 3.8
= 3.14 \times 6.25 \times 3.8
= 74.575.
$$

结果与输出的 74.575 一致。这里要留意两点。一是结果取决于 `PI` 的取值：本例把 $\pi$ 取为 3.14，若改用更精确的 3.14159，输出会不同。二是函数内改的是 `radius`、`height` 两个副本，`main` 中的 `c_radius`、`c_height` 不会被改动；计算结果通过 `return` 交回，再赋给 `c_volume`。`pow(radius, 2)` 求 $r^2$，需要包含 `<cmath>`。

**例4.5 交换变量的值**

**题目。**

编写函数 `swap`，试图交换两个整型变量的值，观察调用前后的变化。

**代码。**

```cpp
#include <iostream>
using namespace std;

void swap(int a, int b); // 函数原型声明

int main()
{
    int x = 10;
    int y = 20;

    cout << "Before swap: x = " << x << ", y = " << y << endl;
    swap(x, y); // 调用 swap 函数
    cout << "After swap: x = " << x << ", y = " << y << endl;
}

void swap(int a, int b) // 函数定义
{
    int temp = a;
    a = b;
    b = temp;
    cout << "Inside swap: a = " << a << ", b = " << b << endl;
}
```

**运行结果。**

```text
Before swap: x = 10, y = 20
Inside swap: a = 20, b = 10
After swap: x = 10, y = 20
```

**解析。**

函数内部确实把 `a` 和 `b` 交换了，所以 `Inside swap` 输出 20、10；但 `After swap` 仍是 10、20。原因不是交换逻辑写错，而是 `a`、`b` 只是 `x`、`y` 的副本：

| 位置 | 对象 | 初始值 | 交换后 |
| --- | --- | --- | --- |
| `main` 的栈帧 | `x` | 10 | 10 |
| `main` 的栈帧 | `y` | 20 | 20 |
| `swap` 的栈帧 | `a` | 10 | 20 |
| `swap` 的栈帧 | `b` | 20 | 10 |
| `swap` 的栈帧 | `temp` | 10（由 `a` 初始化） | 10 |

调用时发生的是“复制”而不是“绑定”：`a` 得到 10，`b` 得到 20，它们与 `x`、`y` 占用不同的存储。`temp`、`a`、`b` 在 `swap` 返回时全部撤销，`main` 里的 `x`、`y` 从未被写过，所以保持原值。要真正交换调用者的变量，需要让函数拿到变量的别名或地址，也就是引用参数或指针参数；就值传递本身而言，交换失败是必然结果。

![值传递中 main 的 x、y 与 swap 的 a、b 是不同对象](/images/campus-cpp-programming/swap-value-copy.svg)

**例4.6 函数参数强制类型转换**

**题目。**

分别用 `double` 形参和 `int` 形参的函数处理同样的两个 `double` 实参，观察类型转换对结果的影响。

**代码。**

```cpp
#include <iostream>
using namespace std;

double addDoubles(double x, double y); // 函数原型声明
int addInts(int x, int y);             // 函数原型声明

int main()
{
    double a = 3.5;
    double b = 2.5;
    int c;

    double sum1 = addDoubles(a, b); // 调用 addDoubles 函数，不需要类型转换
    cout << "Sum of doubles: " << sum1 << endl;

    c = addInts(a, b); // 调用 addInts 函数，需要将 double 转换为 int
    cout << "Sum of ints: " << c << endl;
}

// addDoubles 函数定义
double addDoubles(double x, double y)
{
    return x + y;
}

// addInts 函数定义
int addInts(int x, int y)
{
    return x + y;
}
```

**运行结果。**

```text
Sum of doubles: 6
Sum of ints: 5
```

**解析。**

`addDoubles(a, b)` 的形参是 `double`，实参也是 `double`，3.5 和 2.5 原样复制，`x + y = 6.0`，返回类型为 `double`。`cout` 默认按 6 位有效数字输出，并且不强制保留小数点，所以 6.0 显示成 `6`，这不是整数运算。

`addInts(a, b)` 的形参是 `int`，实参 `double` 必须先转换成 `int`。转换规则是截取整数部分（向零截断），不是四舍五入：3.5 → 3，2.5 → 2，于是 3 + 2 = 5。若按四舍五入会得到 4 + 3 = 7，和实际输出不符。这种转换发生在实参值复制给形参之前，函数体看到的已经是 `int`，无法知道原来的小数部分。浮点数转整数会丢失小数；如果数值超出 `int` 的可表示范围，结果没有保证（标准规定为未定义行为），实际编程中应先判断范围。

题目把这称为“强制类型转换”，更准确地说，这是编译器在实参到形参的赋值处自动完成的隐式转换，并不需要程序员写强制转换运算符。值传递的完整过程可以概括为：先按形参类型转换实参值，再把转换后的值复制进形参对象；函数内改形参，仍然不影响实参。

**例4.7 求 $1!+2!+\cdots+N!$**

**题目。**

求 $1!+2!+3!+\cdots+N!$ 的和，$N$ 为正整数，且 $N \le 20$。

**代码。**

```cpp
#include <iostream>
using namespace std;

const int Max_N = 20;

unsigned long long factorialSum(int num)
{
    unsigned long long sum = 0;
    unsigned long long factorial = 1;

    for (int i = 1; i <= num; ++i)
    {
        factorial *= i; // 利用前一个阶乘的结果计算下一个阶乘
        sum += factorial;
    }
    return sum;
}

int main()
{
    int N;
    cout << "Enter N: ";
    cin >> N;
    if (N < 0 || N > Max_N)
    {
        cout << "Invalid input!" << endl;
        return 1;
    }

    unsigned long long sum = factorialSum(N);
    cout << "The sum of factorials from 1! to " << N << "! is: " << sum << endl;
}
```

**运行结果。**

```text
Enter N: 5
The sum of factorials from 1! to 5! is: 153
```

**解析。**

代码把阶乘求和封装在 `factorialSum` 中，`main` 负责读入、边界检查、调用函数和输出；函数内部的关键是把“当前阶乘”和“累加和”拆成两个变量，并在一次循环里同时推进：

| `i` | `factorial *= i` 后 | `sum += factorial` 后 |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 2 | 3 |
| 3 | 6 | 9 |
| 4 | 24 | 33 |
| 5 | 120 | 153 |

`factorial` 保存的是 $i!$，下一轮只要再乘 $i+1$ 就得到 $(i+1)!$，不需要每次都从 1 乘到 $i$。这样求到 $N$ 只需 $N$ 次乘法，而不是对每个 $i$ 都从 1 乘到 $i$（约 $N(N-1)/2$ 次乘法）；`sum` 则专门保存前缀和。循环结束后返回 `sum`，`main` 把它打印出来。对 $N=5$，$1+2+6+24+120=153$，与输出一致。

类型的选择需要核对边界。`unsigned long long` 至少 64 位，在本课程使用的平台上其最大值为

$$
2^{64}-1 = 18\,446\,744\,073\,709\,551\,615.
$$

而

$$
20! = 2\,432\,902\,008\,176\,640\,000,
$$

$$
\sum_{k=1}^{20} k! = 2\,561\,327\,494\,111\,820\,313,
$$

两者都小于上述最大值，所以 $N=20$ 时阶乘项和累加和都不会溢出。再看 $21!$：

$$
21! = 51\,090\,942\,171\,709\,440\,000 > 2^{64}-1,
$$

因此 $N=21$ 时 `factorial *= 21` 会超出 64 位无符号数的范围，按模 $2^{64}$ 回绕，得到错误结果；`Max_N = 20` 正是为了在输入阶段挡住这种情况。

顺带说明：有符号 `long long` 的最大值约为 $9.22\times 10^{18}$，$20!$ 和上面的和也都放得下，所以并不是“只有 `unsigned long long` 才能算到 20”；选它是因为阶乘恒为非负，无符号类型能提供更大的正数范围，也符合“支持较大数值”的意图。若用 32 位 `int`，$13! = 6\,227\,020\,800$ 就已经超过 `int` 的上限，更早就会出错。

还要注意题面与代码的边界：题目说 $N$ 为正整数，代码只排除了 $N<0$ 和 $N>20$，所以 $N=0$ 会进入函数、循环一次也不执行并返回 0。这不在题意范围内，但读代码时应能看出这个差别。

**主观题：阅读程序写结果**

**题目。**

阅读下面的程序，写出运行结果。

```cpp
#include<iostream>
using namespace std;
#include<cmath>

int f( int );

int main()
{
    int i;
    for (i = 0; i < 3; i++)
        cout << f(i) << endl;
}

int f(int a)
{
    int b = 0, c = 1;
    b++;
    c++;
    return int(a + pow(double(b), 2) + c);
}
```

**补充解答。** 输出为

```text
3
4
5
```

函数 `f` 被调用三次，实参分别是 0、1、2。每次进入函数，`b`、`c` 都是普通的局部变量，重新初始化为 0、1，随后自增为 1、2；`pow(double(b), 2)` 计算 $1^2=1.0$，所以返回表达式为

$$
a + 1 + 2 = a + 3.
$$

`int(...)` 只是把 `double` 结果转回 `int`，这里 $a+3$ 本来就是整数，不会丢小数。因此三次调用的返回值依次是 3、4、5，`endl` 使每个结果各占一行。容易错的地方是把 `b`、`c` 当成静态变量，以为它们会在调用之间保留；实际上它们和形参 `a` 一样，每次调用都会重新创建。

### 4.2.2 默认参数

C++ 允许在函数声明中给传值形参指定默认值。调用时如果省略了对应的实参，编译器会把默认值补上；如果显式给了实参，默认值就被忽略，以实参为准。默认参数让同一个函数既能接受完整参数，也能接受“少给尾部参数”的调用形式。

使用默认参数要遵守三条规则。

**第一，默认参数必须从右向左连续排列。** 一旦某个形参有默认值，它右边的所有形参都必须有默认值；不能出现“左边有默认值、右边没有”的情况。例如：

```cpp
double distance(double x1, double y1, double x2 = 0, double y2 = 0); // 合法
double distance(double x1, double y1, double x2 = 0, double y2);     // 非法
```

第二行非法，是因为 `x2` 有默认值而它右边的 `y2` 没有。从调用角度看，实参是按位置从左向右匹配的；如果允许跳过中间的 `x2` 直接给 `y2`，编译器无法判断某个实参到底对应谁，所以语言要求默认值只能出现在参数表的尾部。

**第二，默认值在函数名第一次声明时给出，通常写在函数原型中；原型已经写了，定义中就不能重复写。** 例如：

```cpp
double distance(double x1, double y1, double x2 = 0, double y2 = 0); // 原型中给默认值
double distance(double x1, double y1, double x2, double y2)           // 定义中不再重复
{
    return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
}
```

如果函数没有单独的原型，直接在定义中给默认值也可以，例4.8就是这种写法。关键是同一个默认值只指定一次；重复指定会被编译器视为错误。

**第三，默认参数可能与重载产生歧义。** 例如：

```cpp
void ferror2(int x, int y = 0);
void ferror2(int x);

void test()
{
    ferror2(3); // 调用哪个？
}
```

`ferror2(3)` 既能匹配第一个函数（省略 `y`，用默认值 0），也能匹配第二个函数（只有一个参数），两个候选都可行，编译器无法选择，于是报错。设计重载时要把默认参数和参数个数一起考虑，避免让同一个调用同时落入多个候选。

**例4.8 用默认参数求两点距离**

**题目。**

通过函数调用求两点之间的距离，使用默认参数：如果只提供一个点的坐标（两个参数），则计算该点到原点的距离。

**代码。**

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// 函数定义，具有两个默认参数
double distance(double x1, double y1, double x2 = 0, double y2 = 0)
{
    return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
}

int main()
{
    double x1, y1, x2, y2;

    cout << "Enter coordinates of the first point (x1, y1): ";
    cin >> x1 >> y1;
    cout << "Enter coordinates of the second point (x2, y2): ";
    cin >> x2 >> y2;

    double dist = distance(x1, y1, x2, y2); // 函数调用，不用默认参数
    cout << "The distance between the points (" << x1 << ", " << y1 << ") and (" << x2 << ", " << y2 << ") is: "
         << dist << endl;

    cout << "The distance between the points (" << x1 << ", " << y1 << ") and (" << 0 << ", " << 0 << ") is: "
         << distance(x1, y1) << endl; // 函数调用，使用两个默认参数

    cout << "The distance between the points (" << x1 << ", " << y1 << ") and (" << x2 << ", " << 0 << ") is: "
         << distance(x1, y1, x2) << endl; // 函数调用，使用一个默认参数
}
```

**运行结果。**

```text
Enter coordinates of the first point (x1, y1): 4 6
Enter coordinates of the second point (x2, y2): 7 8
The distance between the points (4, 6) and (7, 8) is: 3.60555
The distance between the points (4, 6) and (0, 0) is: 7.2111
The distance between the points (4, 6) and (7, 0) is: 6.7082
```

**解析。**

距离公式是

$$
d = \sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}.
$$

三次调用分别对应三种参数组合：

1. `distance(x1, y1, x2, y2)` 给满四个实参，两个默认值都不使用。代入 $(4,6)$ 与 $(7,8)$：

$$
d = \sqrt{(4-7)^2 + (6-8)^2} = \sqrt{9+4} = \sqrt{13} \approx 3.60555.
$$

2. `distance(x1, y1)` 只给两个实参，`x2`、`y2` 都取默认值 0，计算到原点的距离：

$$
d = \sqrt{4^2 + 6^2} = \sqrt{52} \approx 7.2111.
$$

3. `distance(x1, y1, x2)` 给三个实参，`x2` 取输入的 7，`y2` 取默认值 0，计算到 $(7,0)$ 的距离：

$$
d = \sqrt{(4-7)^2 + 6^2} = \sqrt{9+36} = \sqrt{45} \approx 6.7082.
$$

输出中的小数位数由 `cout` 的默认格式决定：默认按 6 位有效数字输出，末尾的 0 不显示，所以 $\sqrt{52}=7.21110\ldots$ 显示成 `7.2111`，$\sqrt{45}=6.70820\ldots$ 显示成 `6.7082`。若需要固定小数位数，可以用 `fixed` 和 `setprecision`（需包含 `<iomanip>`），本题不必。

还要注意：程序先读入了第二个点 $(x_2,y_2)$，但第二次调用 `distance(x1, y1)` 并不使用这两个输入，而是直接用默认的 $(0,0)$；第三次调用只用了 `x2`，`y2` 仍取 0。实参不能“跳过”中间参数去给后面的参数赋值，例如不能写 `distance(x1, y1, y2)` 来只指定 `y2`——第三个实参会按位置绑定给 `x2`。

**单选题：默认参数定义**

**题目。**

下列函数参数默认值定义错误的是（ ）。

- A. `Fun(int x, int y=1);`
- B. `Fun(int x=2, int y);`
- C. `Fun(int x=10);`
- D. `Fun(int x=f()); // 假定函数 f() 已经定义`

**补充解答：B。**

默认参数必须从右向左连续给出。A 中只有最右边的 `y` 有默认值，合法；C 只有一个参数且有默认值，合法；D 的默认值是函数调用表达式，只要 `f()` 在声明之前已经定义（或至少声明），就可以作为默认值，合法。B 中 `x` 有默认值而它右边的 `y` 没有，违反“默认参数必须是尾部参数”的规则，因此错误。

D 还说明默认值不限于字面常量：它可以是任意在声明处可见的表达式，包括函数调用。默认值在调用时被使用才求值，所以每次省略该实参的调用都会重新计算一次 `f()`；本题只考合法性，不展开这一点。

**主观题：默认参数的调用**

**题目。**

阅读程序，写出运行结果。

```cpp
#include<iostream>
using namespace std;

void func(int a, int b, int c = 3, int d = 4);

int main()
{
    func(10, 15, 20, 30);
    func(10, 11, 12);
    func(12, 12);
}

void func(int a, int b, int c, int d)
{
    cout << a << '\t' << b << '\t' << c << '\t' << d << endl;
}
```

**运行结果。**

```text
10  15  20  30
10  11  12  4
12  12  3  4
```

**解析。**

原型中 `c`、`d` 有默认值，定义中不再重复，符合“默认值只指定一次”的规则。三次调用按位置匹配：

- `func(10, 15, 20, 30)`：四个实参都给出，`a=10`、`b=15`、`c=20`、`d=30`，默认值全部被忽略。
- `func(10, 11, 12)`：只给三个，`d` 取默认值 4，得到 `10, 11, 12, 4`。
- `func(12, 12)`：只给两个，`c=3`、`d=4`，得到 `12, 12, 3, 4`。

`'\t'` 是制表符，输出时把各列隔开；不同控制台的制表宽度可能略有差异，但四个数的值和顺序不变。这个例子也说明：默认参数只能从尾部省略，`b` 没有默认值，所以至少要传两个实参。

### 4.2.3 函数的返回

函数执行完 `return` 语句后，要把结果交给调用点。这里用“匿名对象”来描述按值返回的过程：函数通过一个没有名字的对象返回结果值，函数值的类型就是这个匿名对象的类型，`return` 语句把表达式的值赋给匿名对象。

```cpp
Type FunctionName()
{
    // statements
    return expression;
}
```

这里的 `Type` 可以是各种 C++ 基本数据类型、类类型，以及这些类型的指针或引用。对按值返回而言，可以把这个过程拆成四步：

1. 对 `return` 后的表达式求值；
2. 把表达式的值赋给返回类型的匿名对象；
3. 返回调用点，用这个值完成赋值、输出或继续参与表达式；
4. 匿名对象在表达式使用完毕后撤销。

对按值返回，如果 `return` 表达式的类型和函数返回类型不一致，会先按返回类型转换，再存入匿名对象；规则与实参到形参的转换类似。

**volume 示例**

```cpp
#include <iostream>
using namespace std;

double volume(double, double);

int main()
{
    double vol, r, h;
    cin >> r >> h;
    vol = volume(r, h);
    cout << "Volume = " << vol << endl;
}

double volume(double radius, double height)
{
    return 3.14 * radius * radius * height;
}
```

原型 `double volume(double, double);` 只写类型、不写参数名，也是合法的；定义中才需要 `radius`、`height` 这两个名字。设输入为 $r$、$h$，返回过程可以对应为：

| 步骤 | 概念模型中的说法 | 在 `volume` 例子中 |
| --- | --- | --- |
| 1 | 对 `return` 表达式求值 | 算出 `3.14 * radius * radius * height` |
| 2 | 把值赋给返回类型的匿名对象 | 得到一个 `double` 值 |
| 3 | 返回调用点，完成赋值或输出 | `vol = volume(r, h);` 把该值赋给 `vol` |
| 4 | 匿名对象撤销 | `vol` 保留，匿名对象消失 |

例如 $r=2$、$h=3$ 时，表达式的值为 $3.14\times2^2\times3=37.68$，匿名对象暂存 37.68，`vol` 得到 37.68，随后匿名对象撤销而 `vol` 仍为 37.68。函数内的 `radius`、`height` 和局部对象在返回时也一并撤销，不会影响 `main` 的 `r`、`h`。

**关于这个模型的边界。** 匿名对象是为了讲清“值怎样从被调函数回到调用点”而采用的概念模型，不能把它理解成所有返回类型、所有编译优化下都一定在内存里物理创建一个临时对象再撤销：

- 对 `double`、`int` 这样的标量返回类型，值通常直接通过寄存器传递，抽象层面是一个纯右值（prvalue），未必对应一块独立的匿名对象存储；只有在需要物化（例如绑定到引用）时才可能产生临时对象。
- 对类类型按值返回，编译器可以做复制消除（copy elision，包括 RVO/NRVO），直接在调用点的目标位置构造返回值，从而省掉复制和临时对象；C++17 起部分情形是强制省略。
- 如果返回类型是引用或指针，函数交出的是引用或地址本身，不会复制所指对象；返回引用时还要特别注意不要返回局部变量的引用，否则调用点拿到的是悬空引用。

所以，四步流程适合用来理解“表达式求值 → 结果暂存 → 调用点使用 → 结果对象撤销”的值传递语义；具体实现是否真的创建、何时撤销临时对象，由类型和编译器优化决定。本例中的 `volume` 返回 `double`，用这个模型解释其值如何回到 `vol` 是合适的，但不要把它推广成对返回引用或所有类类型的物理描述。


## 4.3 函数的调用与递归调用

函数定义只是把一段代码登记下来，程序运行时的执行顺序由调用关系决定。一个 C++ 程序有且只有一个 `main`，它由运行时启动代码（课件概括为操作系统）调用；`main` 再调用其他函数，其他函数之间也可以互相调用。函数还可以直接或间接调用自己，这就是递归。

需要把“定义关系”和“调用关系”分开：

- **所有函数的定义是平行的。** 课程讨论的普通函数不能嵌套定义：不能在一个函数的函数体里再定义一个具名函数；函数体里可以写调用语句，但不能写函数定义。成员函数属于类的作用域，是另一套规则。
- **调用关系可以分层，也可以成环。** `main` 调用 `fun1`、`fun2`、`fun3`；`fun1` 又可以调用 `fun4`，`fun2` 调用 `fun5`、`fun6`，`fun3` 调用 `fun7`。这些是嵌套调用。`fun7` 直接调用自己，是直接递归；若 `fun1` 调用 `fun4`、`fun4` 又调用 `fun1`，则形成间接递归。
- 定义平行不等于调用平行：`main` 是入口，其他函数只有在被调用时才执行；调用结束后，控制权回到调用点。

这一节先建立嵌套调用的调用栈模型，再用同一套模型分析递归。

### 4.3.1 函数的嵌套调用

**函数的调用机制**

函数调用时，程序需要记住两件事：被调用函数在哪里、调用者执行到了哪里；还要把实参交给被调用函数，并为它的形参和局部对象准备空间。返回时则要带回结果、恢复调用者的状态，并回到调用点之后继续执行。课件把这一过程概括为入栈和出栈：

| 阶段 | 操作 | 作用 |
| --- | --- | --- |
| 调用时 | 建立被调用函数的栈空间 | 为形参、局部对象和临时结果准备存储 |
| 调用时 | 保护调用函数运行状态和返回地址 | 返回后能从调用点之后继续执行 |
| 调用时 | 传递参数 | 用实参初始化对应的形参 |
| 调用时 | 控制权交给被调用函数 | 开始执行被调用函数的函数体 |
| 返回时 | 返回值保存在临时空间 | 调用者能取得函数结果 |
| 返回时 | 恢复调用函数运行状态 | 恢复被调用过程打断的现场 |
| 返回时 | 释放栈空间 | 结束本次调用的局部对象 |
| 返回时 | 根据地址返回调用函数 | 回到返回地址继续执行 |

这里的“栈”是调用栈模型。C++ 标准规定的是程序的可观察行为，并没有要求所有实现都必须使用物理栈；主流编译器通常用栈帧实现，理解栈帧有助于分析嵌套调用、递归深度和局部对象的生命周期，但不要把图中的内存布局当成标准强制规定。

以 `max` 的调用为例：

```cpp
#include <iostream>
using namespace std;

double max(double a, double b)
{
    if (a > b)
        return a;
    else
        return b;
}

int main()
{
    int m = 5, n = 6;
    double result = 0;
    result = max(m, n);
    cout << result;
    return 0;
}
```

执行 `result = max(m, n);` 时，大致经过以下步骤：

1. 计算实参 `m`、`n`，得到 5 和 6；用它们初始化 `max` 的形参 `a`、`b`。实参是 `int`，形参是 `double`，这里发生标准的数值转换，`a`、`b` 分别是 5.0 和 6.0。
2. 保存 `main` 的运行状态和返回地址。返回地址是调用指令之后的位置，也就是“把返回值赋给 `result`”这一步，而不是调试器里的断点。
3. 控制权交给 `max`。`a > b` 为假，执行 `else` 分支的 `return b;`，函数结果为 6.0。
4. 返回值放到调用者能取到的临时空间；恢复 `main` 的状态；释放 `max` 的栈空间；按返回地址回到 `main`。
5. `main` 把 6.0 赋给 `result`，`cout` 按默认格式输出 `6`（`double` 的 6.0 不会自动显示小数点后的 0）。

**一条完整的调用链**

下面这个程序把三层嵌套调用放在一起：`main` 调用 `funcA`，`funcA` 调用 `funcB`，`funcB` 调用 `funcC`。

```cpp
#include <iostream>
using namespace std;

void funcC()
{
    cout << "this is a funcC" << endl;
    cout << "return funcC" << endl;
}

void funcB()
{
    cout << "this is a funcB" << endl;
    funcC();
    cout << "return funcB" << endl;
}

void funcA()
{
    cout << "this is a funcA" << endl;
    funcB();
    cout << "return funcA" << endl;
}

int main()
{
    funcA();
    return 0;
}
```

运行结果：

```text
this is a funcA
this is a funcB
this is a funcC
return funcC
return funcB
return funcA
```

把调用过程按栈的变化写成一条链，表中从左到右表示栈底到栈顶：

| 时刻 | 调用栈 | 刚发生的动作 |
| --- | --- | --- |
| 1 | `main` | `main` 调用 `funcA` |
| 2 | `main → funcA` | `funcA` 输出 `this is a funcA`，调用 `funcB` |
| 3 | `main → funcA → funcB` | `funcB` 输出 `this is a funcB`，调用 `funcC` |
| 4 | `main → funcA → funcB → funcC` | `funcC` 输出 `this is a funcC` 和 `return funcC`，返回 |
| 5 | `main → funcA → funcB` | `funcB` 输出 `return funcB`，返回 |
| 6 | `main → funcA` | `funcA` 输出 `return funcA`，返回 |
| 7 | `main` | `main` 从 `funcA();` 之后继续，执行 `return 0;`，程序结束 |

调用时栈顶不断向右延伸；返回时栈顶逐个弹出。每次调用发生时，调用者暂停在调用语句之后；被调用函数返回后，调用者从这里继续。`funcC` 返回后，`funcB` 从 `funcC();` 之后继续；`funcB` 返回后，`funcA` 从 `funcB();` 之后继续；`funcA` 返回后，`main` 从 `funcA();` 之后继续。

本例三个函数都没有局部变量，栈帧里主要保存返回地址和调用者的运行状态；如果函数有局部变量，它们也属于对应层的栈帧。三个函数的定义是平行的，谁先定义不影响调用顺序；程序只从 `main` 开始执行。

**例 4.9 函数的嵌套调用测试程序**

```cpp
#include <iostream>
using namespace std;

int add(int a, int b)  // add 函数定义
{
    cout << "Entering function: add" << endl;
    int result = a + b;
    cout << "Leaving function: add" << endl;
    return result;
}

int multiply(int a, int b)  // multiply 函数定义
{
    cout << "Entering function: multiply" << endl;
    int sum = add(a, b);  // 调用 add 函数，是嵌套调用
    cout << "Leaving function: multiply" << endl;
    return sum * sum;
}

int main()
{
    cout << "Entering function: main" << endl;
    int result = multiply(10, 30);
    cout << "The result of multiplying 10 and 30 is: " << result << endl;
    cout << "Leaving function: main" << endl;
}
```

运行结果：

```text
Entering function: main
Entering function: multiply
Entering function: add
Leaving function: add
Leaving function: multiply
The result of multiplying 10 and 30 is: 1600
Leaving function: main
```

输出顺序直接反映了调用顺序：

- `main` 先输出 `Entering function: main`，然后调用 `multiply(10, 30)`。
- `multiply` 输出 `Entering function: multiply`，在 `sum = add(a, b);` 处调用 `add(10, 30)`。
- `add` 输出 `Entering function: add`，算出 `result = 40`，输出 `Leaving function: add`，返回 40。
- `multiply` 的 `sum` 得到 40，继续输出 `Leaving function: multiply`，返回 `40 * 40 = 1600`。
- `main` 的 `result` 得到 1600，输出结果，最后输出 `Leaving function: main`。

三次 `Entering` 的顺序是 `main → multiply → add`，三次 `Leaving` 的顺序是 `add → multiply → main`，正好是调用顺序的反向。这正是后进先出：最后进入的 `add` 最先返回，`multiply`、`main` 依次恢复执行。

当 `add` 正在执行、尚未返回时，调用栈可以概括为：

| 层次（栈顶在上） | 调用记录 | 当前状态 |
| --- | --- | --- |
| `add` | 形参 `a=10`、`b=30`；局部 `result=40`；返回地址指向 `multiply` 中调用 `add` 之后的位置 | 即将输出 `Leaving function: add` 并返回 |
| `multiply` | 形参 `a=10`、`b=30`；局部 `sum` 还没有被赋值；返回地址指向 `main` 中调用 `multiply` 之后的位置 | 暂停在 `sum = add(a, b);`，等待 `add` 的返回值 |
| `main` | 局部 `result` 还没有被赋值；返回地址指向运行时启动代码 | 暂停在 `result = multiply(10, 30);`，等待 `multiply` 的返回值 |

`add` 返回后，它的调用记录被释放，`multiply` 的 `sum` 得到 40，继续执行；`multiply` 返回后，它的记录也被释放，`main` 的 `result` 得到 1600。每个函数的局部变量只在自己的调用记录里，同名也不冲突：`add` 的 `result` 和 `main` 的 `result` 是两个不同的对象。

还要注意两点：

- `multiply` 返回的是 `sum * sum`，不是 `sum`。嵌套调用只负责把 `add` 的结果送回来，后续计算仍由 `multiply` 完成，所以结果是 1600。
- 本例的 `main` 末尾没有写 `return 0;`。`main` 执行到 `}` 时等价于返回 0，这是 `main` 的特殊规则；普通有返回值的函数不能这样省略。

**例 4.10 组合数的计算**

组合数 $C(n,k)$ 表示从 $n$ 个不同元素中选取 $k$ 个元素的方法数，不考虑选取的顺序。公式为：

$$
C(n,k)=\frac{n!}{k!\,(n-k)!}.
$$

其中 $n!$ 是 $n$ 的阶乘，表示从 1 乘到 $n$ 的所有正整数的乘积。这个公式把组合数拆成三个阶乘的商，因此可以先把阶乘写成一个独立函数，再让组合数函数调用它。`factorial` 可以被反复使用，`combination` 只负责组织三次调用和一次除法。

```cpp
#include <iostream>
using namespace std;

unsigned long long factorial(int n)  // 函数定义：求阶乘
{
    unsigned long long fact = 1;
    for (int i = 1; i <= n; ++i) {
        fact *= i;
    }
    return fact;
}

unsigned long long combination(int n, int k)  // 函数定义：求组合数
{
    if (k > n) {
        return 0;  // 如果 k 大于 n，则没有组合
    }
    return factorial(n) / (factorial(k) * factorial(n - k));
}

int main()
{
    int n, k;
    // 获取用户输入的 n 和 k 值
    cout << "Enter n: ";
    cin >> n;
    cout << "Enter k: ";
    cin >> k;

    // 计算组合数
    unsigned long long result = combination(n, k);
    cout << "The number of combinations of " << n
         << " items taken " << k << " at a time is: " << result << endl;
}
```

输入 `5` 和 `3` 时，运行结果：

```text
Enter n: 5
Enter k: 3
The number of combinations of 5 items taken 3 at a time is: 10
```

调用关系可以画成：

```text
main
└─ combination(5, 3)
   ├─ factorial(5) = 120
   ├─ factorial(3) = 6
   └─ factorial(2) = 2
   result = 120 / (6 * 2) = 10
```

三个 `factorial` 调用彼此独立，求值先后不影响结果。`combination` 必须等三个调用都返回后才能做除法；在这期间，三个 `factorial` 的调用记录依次建立又释放。这里虽然出现了多层调用，但 `factorial` 并没有调用自己，所以它是嵌套调用，不是递归。

`if (k > n) return 0;` 不是可有可无的。这里假定 $n$、$k$ 为非负整数。若 $k>n$，$n-k$ 为负，而 `factorial` 的循环在 `n` 为负时一次也不执行，会返回 1；这个 1 并不代表负数的阶乘，只是循环没有执行。直接套公式就会得到一个没有数学意义的商。先判断 $k>n$ 并返回 0，既符合组合数的定义，也避免把 $n-k$ 的负值传进 `factorial`。

实现边界：`factorial` 的返回类型是 `unsigned long long`，能表示到 $20!$；$21!$ 已经超过 64 位无符号整数的范围。更隐蔽的是，本程序先分别算三个阶乘再相除，即使最终的组合数不大，中间的 $n!$ 也可能溢出。课堂输入 5、3 远小于这个边界，所以结果正确；实际使用时要换用避免中间溢出的算法，或使用大整数库。

**主观题 1（10 分）**

阅读下面的程序，写出 `main` 的输出。

```cpp
#include <iostream>
using namespace std;

int f2(int, int);  // f2 在 f1 之后定义，先声明原型

int f1(int a, int b)
{
    int c;
    a += a;
    b += b;
    c = f2(a + b, b + 1);
    return c;
}

int f2(int a, int b)
{
    int c;
    c = b % 2;
    return a + c;
}

int main()
{
    int a = 3, b = 4;
    cout << f1(a, b) << endl;
}
```

输出：

```text
15
```

**补充解答**

`main` 把 3、4 按值传给 `f1` 的 `a`、`b`，所以 `f1` 修改的是副本。`a += a` 后 `a=6`，`b += b` 后 `b=8`。注意 `c = f2(a+b, b+1);` 用的是修改后的值：第一个实参是 `6+8=14`，第二个是 `8+1=9`。进入 `f2` 后，`c = b % 2 = 9 % 2 = 1`，返回 `a + c = 14 + 1 = 15`。`f1` 把 15 返回给 `main`，输出 15。

关键点：值传递使 `main` 的 `a`、`b` 保持不变；`f1` 里的 `a`、`b` 是另外两个对象。若把 `a += a; b += b;` 误当成修改 `main` 的变量，或者用旧的 `b` 计算 `b+1`，就会得到错误结果。`f2` 的原型写在 `f1` 之前，是因为 `f1` 调用 `f2` 时 `f2` 还没有定义；这与 4.1.3 的规则一致。

**主观题 2（10 分）**

阅读下面的程序，写出 `main` 的输出。

```cpp
#include <iostream>
using namespace std;

int f2(int a, int b);

int f1(int m, int n)
{
    m *= 2;
    n = n + m;
    return f2(m, n);
}

int f2(int a, int b)
{
    if (b % 2 == 0)
        return a + b / 2;
    else
        return a - b / 2;
}

int main()
{
    cout << f1(3, 4);
}
```

输出：

```text
11
```

**补充解答**

`f1(3, 4)` 把 3、4 复制给 `m`、`n`。先执行 `m *= 2`，`m` 变为 6；再执行 `n = n + m`，`n` 变为 `4 + 6 = 10`。然后调用 `f2(6, 10)`。`f2` 的 `b=10` 是偶数，走 `return a + b / 2;`，即 `6 + 5 = 11`。`main` 输出 11。

这里的关键是两条赋值语句有先后：`n` 用的是已经变成 6 的 `m`。如果先算 `n = n + m` 再算 `m *= 2`，`n` 会是 7，结果就不同。`b / 2` 是整数除法，本例 `b=10` 能整除；若 `b` 为奇数，`b / 2` 会向下取整，`a - b / 2` 的结果要按整数运算理解。

### 4.3.2 函数的递归调用

**递归定义**

如果一个对象用其自身的结构来描述或部分描述，这种定义方式称为递归定义。递归式推理是问题求解的一种强有力方法。

- **例 1：自然数定义。**（1）1 是自然数；（2）自然数的后继是自然数。
- **例 2：阶乘定义。**（1）1 的阶乘等于 1；（2）$n$ 的阶乘等于 $n$ 乘以 $(n-1)$ 的阶乘。

递归的思想是：把问题分解成规模更小的、具有与原问题相同解法的问题。

“相同解法”很重要：不是把问题换成一个完全不同的问题，而是把同样的规则用在更小的输入上。自然数定义中，“后继”规则可以反复使用；阶乘定义中，$n!$ 用 $(n-1)!$ 表示。规模不断变小，最终到达可以直接给出答案的基例，递归才会停止。

递归定义与数学归纳法结构相同：基例对应归纳奠基，递推步对应从 $n-1$ 推出 $n$。区别在于，归纳法用于证明，递归用于定义或计算。

**递归函数的要求**

递归函数是直接或间接调用自己的函数。写递归函数要同时具备三个要素：

| 要素 | 含义 | 阶乘中的体现 |
| --- | --- | --- |
| 递归形式（算法） | 用同类问题的结果表示当前问题的结果 | $n! = n \times (n-1)!$ |
| 递归条件（缩小问题规模） | 每次调用都让参数向基例靠近 | 参数从 $n$ 变成 $n-1$ |
| 递归终止条件（基本情况） | 不再递归，直接返回结果 | `n == 0` 时返回 1 |

递归函数有两个特点：

1. 可以通过递归缩小问题规模，且新问题与原问题有着相同的形式，解决逻辑相同；
2. 存在着一种基本情况，可以使递归在此情况下返回退出。

如果缺少终止条件，或者递归条件没有让参数靠近终止条件，函数会一直调用自己，直到调用栈耗尽，通常表现为栈溢出。递归的深度就是同时活跃的调用层数；每层都有自己的形参和局部对象，所以递归不是“把同一个变量改来改去”。

**例 4.11 使用递归函数求 n!**

用递归形式定义阶乘的公式如下：

$$
n! =
\begin{cases}
1, & n=0,\\
n\times(n-1)!, & n>0.
\end{cases}
$$

基例写成 $0!=1$。这与“1 的阶乘等于 1”并不矛盾：从 $1!$ 出发，$1! = 1 \times 0! = 1$；把基例取在 0 只是让递归多走一层，代码更统一。若把基例写成 `n == 1`，调用 `factorial(0)` 就会漏掉基本情况，所以基例和调用范围必须配套。

```cpp
#include <iostream>
using namespace std;

long long factorial(int n)  // 函数定义
{
    if (n == 0)  // 基本情况即递归终止条件
        return 1;
    else
        return n * factorial(n - 1);  // 递归调用
}

int main()
{
    int number;
    cout << "Enter a positive integer: ";
    cin >> number;

    if (number < 0) {
        cout << "Factorial of a negative number doesn't exist.";
    }
    else {
        long long result = factorial(number);  // 函数调用
        cout << "Factorial of " << number << " = " << result << endl;
    }
}
```

输入 4 时，运行结果：

```text
Enter a positive integer: 4
Factorial of 4 = 24
```

为书写方便，下面把 `factorial(n)` 简记为 `F(n)`。计算 `Factorial(3)` 时，函数先沿着参数变小的方向展开：

```text
F(3) = 3 * F(2)
F(2) = 2 * F(1)
F(1) = 1 * F(0)
F(0) = 1          ← 到达基例，不再递归
```

然后沿着相反方向回代：

```text
F(1) = 1 * 1 = 1
F(2) = 2 * 1 = 2
F(3) = 3 * 2 = 6
```

所以 `Factorial(3)` 返回 6，即 $3! = 6$。

展开阶段，每一层都停在自己的 `return n * factorial(n - 1);` 上，等待下一层的结果；`F(0)` 返回 1 后，`F(1)` 才能完成乘法，接着 `F(2)`、`F(3)` 依次完成。这就是 4.3.1 的栈帧模型在递归中的表现：每层调用都有自己的 `n` 和一个“待完成的乘法”。用输出中的 4 验证：$4! = 4 \times 3! = 4 \times 6 = 24$。

实现边界：最终代码用 `long long` 保存阶乘。在常见的 64 位 `long long` 环境中，$20!$ 还在范围内，$21!$ 就会溢出；如果返回类型写成 `int`（常见为 32 位），$13!$ 就已经超出范围。阶乘增长极快，递归深度和结果范围都要考虑。

`main` 先检查 `number < 0`，负数直接输出错误信息，不调用 `factorial`；0 会进入 `else`，输出 `Factorial of 0 = 1`。函数本身假定 `n` 非负，因为它只处理 `n == 0` 和 `n > 0` 两种情况。

**例 4.12 递归调用过程跟踪**

```cpp
#include <iostream>
using namespace std;

void recursiveFunction(int n)  // 函数定义
{
    cout << "Entering function at: " << recursiveFunction
         << '\t' << &n << ", value: " << n << endl;
    if (n > 0) {
        recursiveFunction(n - 1);  // 递归调用
    }
    cout << "Exiting function at: " << recursiveFunction
         << '\t' << &n << ", value: " << n << endl;
}

int main()
{
    recursiveFunction(5);  // 函数调用
}
```

运行结果：

```text
Entering function at: 00007FF7226E146F	00000041DC0FFA00, value: 5
Entering function at: 00007FF7226E146F	00000041DC0FF900, value: 4
Entering function at: 00007FF7226E146F	00000041DC0FF800, value: 3
Entering function at: 00007FF7226E146F	00000041DC0FF700, value: 2
Entering function at: 00007FF7226E146F	00000041DC0FF600, value: 1
Entering function at: 00007FF7226E146F	00000041DC0FF500, value: 0
Exiting function at: 00007FF7226E146F	00000041DC0FF500, value: 0
Exiting function at: 00007FF7226E146F	00000041DC0FF600, value: 1
Exiting function at: 00007FF7226E146F	00000041DC0FF700, value: 2
Exiting function at: 00007FF7226E146F	00000041DC0FF800, value: 3
Exiting function at: 00007FF7226E146F	00000041DC0FF900, value: 4
Exiting function at: 00007FF7226E146F	00000041DC0FFA00, value: 5
```

输出有两组：

| 阶段 | 打印顺序 | `n` 的顺序 |
| --- | --- | --- |
| 进入 | 先 | 5 → 4 → 3 → 2 → 1 → 0 |
| 退出 | 后 | 0 → 1 → 2 → 3 → 4 → 5 |

进入时先打印，再递归；所以 `Entering` 从 5 递减到 0。退出时，递归调用返回后才打印；`n=0` 的调用不满足 `n > 0`，直接打印 `Exiting ... value: 0`，然后返回到 `n=1` 的调用，打印 `Exiting ... value: 1`，依此类推。因此 `Exiting` 的顺序与 `Entering` 相反。

`&n` 每层不同：5 对应 `...FFA00`，4 对应 `...FF900`，依次到 0 对应 `...FF500`。每次调用都有一个独立的形参对象 `n`；递归调用 `recursiveFunction(n - 1)` 只是把新值复制给下一层的 `n`，并没有修改当前层的 `n`。所以每层退出时打印的 `n` 与进入时相同。

输出中的第一个十六进制数是 `recursiveFunction` 这个函数本身的地址，每次都一样；第二个是 `&n`。在课堂使用的 MSVC 环境中，函数名按函数指针输出为代码地址；其他编译器对这一行的显示方式可能不同。地址的具体数值和间隔由编译器、调用约定和运行环境决定，换一次运行就可能不同，不要把它当成可移植的常量。这个程序的意义在于用地址和输出顺序说明每层调用有独立的参数对象，而不是要求记住某个地址。

深度方面，`n=5` 时共有 6 层 `recursiveFunction` 调用（5、4、3、2、1、0），加上 `main`。每层都占一个调用记录；如果 `n` 很大，递归深度过大会耗尽栈空间。这个例子也说明：递归函数的“进入”代码在递归调用之前执行，“退出”代码在递归调用之后执行，两段代码的执行顺序相反。

把 4.3.1 和 4.3.2 连起来看：嵌套调用和递归调用用的是同一套调用记录机制，区别只在被调用的函数是不是自己。分析递归时，先找基例，再确认每次递归都向基例靠近，最后按“展开—回代”的顺序推结果；分析嵌套调用时，按“调用—返回”的顺序跟踪每一层的局部对象。后面的递归例题，都是在这个框架里换一种“把问题变小”的方法。

下面继续看递归的几类典型用法：用递归定义数列、用递归枚举成对出现的除数、用递归栈把读入顺序倒过来。最后用三道课堂练习检查对递归返回值的理解。

#### 例 4.13　用递归输出 Fibonacci 数列的前 n 项

Fibonacci 数列形如

```text
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...
```

第 1 项为 0，第 2 项为 1，此后每一项是前面两项的和：

$$
fib(0)=0,\qquad fib(1)=1,\qquad fib(n)=fib(n-1)+fib(n-2)\quad(n\ge 2)
$$

这里用 $fib(0)$ 表示第 1 项、$fib(1)$ 表示第 2 项，与代码中从 0 开始的下标一致。

```cpp
#include <iostream>
using namespace std;

int fib(int n)  // fib 函数定义
{
    if (n == 0) {
        return 0;  // fib(0) = 0
    }
    if (n == 1) {
        return 1;  // fib(1) = 1
    }
    return fib(n - 1) + fib(n - 2);  // 递归调用 fib
}

int main()
{
    int n;
    cout << "Enter the number of terms in the Fibonacci sequence: ";
    cin >> n;
    if (n < 0) {
        cout << "Please enter a non-negative integer." << endl;
        return 1;
    }
    cout << "Fibonacci sequence up to " << n << " terms:" << endl;
    for (int i = 0; i < n; i++) {
        cout << fib(i) << " ";
    }
    cout << endl;
    return 0;
}
```

输入 10 时的运行结果：

```text
Enter the number of terms in the Fibonacci sequence: 10
Fibonacci sequence up to 10 terms:
0 1 1 2 3 5 8 13 21 34
```

**解析。**

递归函数 `fib` 有两个基本情形：`n == 0` 返回 0，`n == 1` 返回 1。两者缺一不可。如果只写 `n == 0`，调用 `fib(1)` 会继续求 `fib(0) + fib(-1)`，`n` 变成负数后永远到不了 0，递归无法终止。写递归时，基本情形要覆盖递推式不再适用的所有边界，而不只是“最小的那个”。

`main` 先拦截 `n < 0`，然后用 `for (int i = 0; i < n; i++)` 依次输出 `fib(0)` 到 `fib(n-1)`，所以输入 10 时正好得到前 10 项。

**为什么直接递归慢。** 计算 `fib(5)` 的调用树如下：

![fib(5) 的递归调用树：同一子问题被重复求值](/images/campus-cpp-programming/fib-call-tree.svg)

`fib(5)` 一共发生 15 次函数调用：`fib(3)` 被算 2 次，`fib(2)` 被算 3 次，`fib(1)` 被算 5 次，`fib(0)` 被算 3 次。调用次数随 $n$ 近似按黄金比 $1.618$ 倍增长，时间复杂度是指数级，空间复杂度则是递归栈的最大深度 $O(n)$。本例 $n$ 只取 10，重复计算还看不出来；$n$ 增大后应改用自底向上的递推或记忆化。

`main` 中对每个 `i` 都单独调用一次 `fib(i)`，相当于把前 $n$ 项各算一遍，重复比只求 `fib(n)` 更多。这正是“用递归函数输出数列”与“用递推一次算完数列”的差别。

#### 例 4.14　用递归求正整数的所有正除数之和

给定正整数 $n$，求它所有正除数（包括 1 和 $n$ 本身）的和。

**关键思路：除数是成对出现的。** 若 $d$ 是 $n$ 的除数，则 $n/d$ 也是 $n$ 的除数，二者组成一对。每一对里至少有一个因子不超过 $\sqrt n$：如果两个因子都大于 $\sqrt n$，它们的乘积就大于 $n$，矛盾。因此只需让 `divisor` 从 1 枚举到 $\sqrt n$，发现 $d$ 整除 $n$ 时，把 $d$ 和 $n/d$ 一起加上，就不会漏掉任何除数。

![除数成对出现：只需枚举到平方根，平方数的中间因子只加一次](/images/campus-cpp-programming/divisor-pairs.svg)

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int sumOfDivisors(int n, int divisor = 1);  // 函数原型声明，具有一个默认参数

int main()
{
    int number;
    cout << "Enter a positive integer: ";
    cin >> number;
    cout << "Sum of divisors of " << number << " is: "
         << sumOfDivisors(number) << endl;  // 函数调用
    return 0;
}

int sumOfDivisors(int n, int divisor)  // 函数定义
{
    // 基本情况：如果除数大于 n 的平方根，所有除数已经检查完毕
    if (divisor > sqrt(n)) {
        return 0;  // 没有更多的除数，返回 0
    }
    // 如果 n 能被 divisor 整除，那么 divisor 和 n/divisor 都是 n 的除数
    if (n % divisor == 0) {
        if (divisor == n / divisor) {
            // 只加一次（比如 4 的除数 2，只加 2）
            return divisor + sumOfDivisors(n, divisor + 1);
        }
        else {
            // 否则加两个（比如 6 的除数 1 和 6，2 和 3）
            return divisor + (n / divisor) + sumOfDivisors(n, divisor + 1);
        }
    }
    else {
        // 否则，继续检查下一个除数
        return sumOfDivisors(n, divisor + 1);
    }
}
```

运行结果：

```text
Enter a positive integer: 80
Sum of divisors of 80 is: 186
Enter a positive integer: 16
Sum of divisors of 16 is: 31
```

**解析。**

函数从 `divisor = 1` 开始（默认参数在原型中给出），每层只检查一个 `divisor`，然后递归到 `divisor + 1`。终止条件 `divisor > sqrt(n)` 表示：当 `divisor` 超过 $\sqrt n$ 时，所有较小的因子都已经检查过，配对的较大因子也已经在更早的层里加过，继续枚举只会重复，所以返回 0。

为什么终止条件用 `>` 而不是 `>=`：以 $n=16$ 为例，$\sqrt{16}=4$。如果写成 `divisor >= sqrt(n)`，`divisor` 等于 4 时会在处理前直接返回，平方根因子 4 就漏掉了，结果会变成 $1+16+2+8=27$，而不是正确的 31。用 `>` 才能让 `divisor = 4` 进入循环，再由“两个因子相等”的分支只加一次。

这里的判断写在 `n % divisor == 0` 成立的分支内，所以 `n / divisor` 一定是整数，整数除法不会截断。整除后的三种情况：

- $d=n/d$：$d$ 是平方根因子，两个因子重合，只加 `divisor` 一次；
- $d\ne n/d$：$d$ 与 $n/d$ 是两个不同的因子，两个都加；
- $d$ 不整除 $n$：本层不加，继续检查下一个除数。

以 80 为例：

| `divisor` | 是否整除 | 本层加入 | 累计和 |
| --- | --- | --- | --- |
| 1 | 是 | $1+80=81$ | 81 |
| 2 | 是 | $2+40=42$ | 123 |
| 3 | 否 | 0 | 123 |
| 4 | 是 | $4+20=24$ | 147 |
| 5 | 是 | $5+16=21$ | 168 |
| 6 | 否 | 0 | 168 |
| 7 | 否 | 0 | 168 |
| 8 | 是 | $8+10=18$ | 186 |
| 9 | 停止 | $\sqrt{80}\approx8.94<9$ | 186 |

80 的正除数是 1、2、4、5、8、10、16、20、40、80，和为 186。16 的过程是：$d=1$ 加 17，$d=2$ 加 10，$d=3$ 跳过，$d=4$ 因 $4=16/4$ 只加 4，$d=5>4$ 停止，总和 $17+10+4=31$，对应正除数 1、2、4、8、16。

**边界情况。**

- $n=1$：$\sqrt 1=1$，`divisor=1` 时 $1=1/1$，加 1；下一层 `divisor=2>1` 停止，结果为 1。
- 素数 $p$：`divisor=1` 时加 $1+p$；从 2 到 $\lfloor\sqrt p\rfloor$ 都不整除，最终结果就是 $1+p$。例如 $p=2$，`divisor=2` 已经大于 $\sqrt 2\approx1.414$，结果直接是 3。
- 完全平方数：平方根因子只加一次，这是去重条件存在的原因。

`sqrt(n)` 返回 `double`，`divisor > sqrt(n)` 是整数与浮点数比较；在本例的数值范围内没有问题。若想完全避开浮点运算，可以把条件写成 `divisor > n / divisor`（整数除法），判定效果相同。

#### 反序输出（一）：递归读字符

读入一串以 `!` 结尾的字符，然后按相反顺序输出。

```cpp
#include <iostream>
using namespace std;

void reverse()
{
    char ch;          // 局部量
    cin >> ch;
    if (ch != '!')
        reverse();
    cout << ch;
}

int main()
{
    cout << "Input a string : " << endl;
    reverse();
    cout << endl;
}
```

**解析。**

`reverse` 没有参数，每层调用都定义一个局部变量 `ch`。递归调用发生在 `cout << ch` 之前，所以每层读到的字符先压在栈上；读到 `!` 时不再递归，开始返回，返回过程中才依次执行 `cout << ch`。栈顶是最后读入的 `!`，于是先输出 `!`，再输出 `c`、`b`、`a`。

以输入 `abc!` 为例，按代码推导：

| 调用层 | 读入的 `ch` | 是否继续递归 | 返回时输出 |
| --- | --- | --- | --- |
| 第 1 层 | `a` | 是 | `a` |
| 第 2 层 | `b` | 是 | `b` |
| 第 3 层 | `c` | 是 | `c` |
| 第 4 层 | `!` | 否 | `!` |

返回顺序是第 4 层 → 第 3 层 → 第 2 层 → 第 1 层，所以输出为 `!cba`；把表中“返回时输出”一列从下往上读，正是这个顺序。

有两点需要注意：

1. `cout << ch` 在 `if` 之外，哨兵 `!` 也会被输出。如果只想得到 `cba`，应把输出放进 `if`：`if (ch != '!') { reverse(); cout << ch; }`。这时读到 `!` 的层既不递归也不输出，返回后依次输出 `c`、`b`、`a`。
2. `cin >> ch` 默认跳过空白字符，所以这个方法不能原样反序带空格的句子；需要保留空格时用 `cin.get(ch)`。输入必须以 `!` 结束：若输入结束前都没有 `!`，`cin >> ch` 会失败而 `ch` 的值不会变成 `!`，递归会继续下去，直到调用栈耗尽；这个程序只适用于带哨兵的输入。

函数名 `reverse` 与标准库的 `std::reverse` 同名。本例没有包含 `<algorithm>`；即使包含了，零参数的 `reverse()` 调用也会匹配这个全局函数，不会自动产生二义。只是同名容易让读者混淆，实际工程中可改名为 `reversePrint` 之类。

#### 反序输出（二）：递归输出正整数的数字串

输入一个正整数，把它的十进制数字按相反顺序输出。

```cpp
#include <iostream>
using namespace std;

void reverse(int n)
{
    cout << n % 10;        // 输出最右一位数字
    if (n / 10 != 0)
        reverse(n / 10);   // 求商，递归
}

int main()
{
    int k;
    cout << "Input a integer n: ";
    cin >> k;
    reverse(k);
    cout << endl;
}
```

**解析。**

这里先执行 `cout << n % 10`，再递归处理 `n / 10`。以 123 为例，按代码推导：`reverse(123)` 输出 3，再 `reverse(12)` 输出 2，再 `reverse(1)` 输出 1；`1 / 10 == 0` 时停止，得到 `321`。输出顺序天然是从最低位到最高位，不需要利用函数返回顺序，所以这里的递归是尾递归，可以直接改成循环。

幻灯片问“可以直接取消递归，用循环代替吗？”答案是可以：

```cpp
void reverse(int n)
{
    do {
        cout << n % 10;
        n /= 10;
    } while (n != 0);
}
```

用 `do...while` 而不是 `while`，是为了让 `n = 0` 时也输出一个 0。对 100 这类末尾有 0 的数，输出是 `001`——这是“反序输出数字串”，不是把数倒过来做数值运算，所以前导 0 会保留。

#### 主观题：递归求年龄

题目给出下面的程序：

```cpp
#include <iostream>
using namespace std;

int age(int n)
{
    int f;
    if (n == 1)
        f = 10;
    else
        f = age(n - 1) + 2;
    return f;
}

int main()
{
    cout << "age : " << age(5) << endl;
}
```

**解析。**

递归定义是 $age(1)=10$，$age(n)=age(n-1)+2$（$n>1$）。展开：

$$
age(5)=age(4)+2=age(3)+4=age(2)+6=age(1)+8=10+8=18
$$

运行结果为 `age : 18`。`f` 是每层独立的局部变量，`return f` 把本层结果交回上一层，上一层再加 2，所以每往上一层年龄增加 2 岁。

#### 主观题：带默认参数的递归函数

```cpp
#include <iostream>
using namespace std;

int rec(int n, int base = 4);
int main()
{
    cout << rec(3);
}

int rec(int n, int base)
{
    if (n == 1)
        return base;
    return rec(n - 1, base + 2) + n;
}
```

**解析。**

原型 `int rec(int n, int base = 4);` 给出默认值，定义处不再重复写。`rec(3)` 等价于 `rec(3, 4)`。展开：

$$
rec(3,4)=rec(2,6)+3=(rec(1,8)+2)+3=8+2+3=13
$$

运行结果为 `13`。注意每次递归都显式传 `base + 2`，默认值 4 只在最外层调用时生效，不会在每层自动叠加。

#### 主观题：递归打印数字

```cpp
#include <iostream>
using namespace std;

void draw(int n);
int main()
{
    draw(3);
}

void draw(int n)
{
    if (n <= 0)
        return;
    cout << n << " ";
    draw(n - 1);
    cout << n << " ";
}
```

**解析。**

`draw(n)` 先打印 `n` 和一个空格，再递归 `draw(n-1)`，返回后再打印一次 `n`。以 $n=3$ 为例：

- 下降阶段依次输出 `3`、`2`、`1`；
- 到 `draw(0)` 时 `n <= 0`，直接返回；
- 上升阶段依次输出 `1`、`2`、`3`。

所以完整输出为 `3 2 1 1 2 3`；去掉空格看就是 `321123`。控制台里的空格较窄，按代码每个数后都输出了一个空格。

若把第二个 `cout` 删掉，输出只剩 `3 2 1`；若把第一个 `cout` 删掉，输出变成 `1 2 3`。递归调用前后的语句分别对应“进入时”和“返回时”，这是理解递归输出顺序的关键。


## 4.4 内联函数和重载函数

函数调用本身有开销：保存现场、压栈、跳转、返回。对只有一两行、又被频繁调用的小函数，这些开销可能比函数体还大。内联函数从“展开代码”入手减少这笔开销；函数重载则解决“同一类操作、不同数据类型”的函数命名问题。

### 4.4.1 内联函数

**作用与机制**

内联函数用于减少频繁调用小子程序的运行时间开销。其典型实现是：编译时把函数体展开到每个调用处，用函数代码替换调用表达式，从而省去跳转、压栈等操作，提高执行速度。

例如 `add(10, 20)` 若被展开，调用处等价于直接计算 `10 + 20`。

内联函数用 `inline` 说明：

```cpp
inline 返回类型 函数名(形式参数表);
```

使用规则：

- 适用于只有 1–5 行的小函数；
- 不适合包含复杂控制结构；
- 不适合递归调用（递归函数通常难以完全展开）；
- `inline` 可以写在原型上、定义上，或分别写在两处。使用该函数的翻译单元需要能看到函数定义，所以通常把内联函数定义放在头文件。

**`inline` 是请求，不是保证。** 现代编译器会综合函数大小、调用次数和优化级别决定是否真正展开；即使写了 `inline`，编译器也可能按普通函数调用处理；反过来，没写 `inline` 的小函数也可能被优化器自动内联。`inline` 的另一个语言作用是允许函数定义在多个翻译单元中出现（通常把内联函数定义放在头文件），这一点与“优化展开”不是同一件事。

**常见写法**

形式一：原型写 `inline`，定义不再写：

```cpp
inline int smallf();

int main()
{
    // ...
    a = smallf();
    // ...
}

int smallf()
{
    // ...
}
```

形式二：没有单独原型，在定义处写 `inline`，且定义出现在使用之前：

```cpp
inline int smallf()
{
    // ...
}

int main()
{
    // ...
    a = smallf();
    // ...
}
```

两种形式都在调用点之前声明了该函数。定义可以放在调用之后，只要在使用它的翻译单元内可达。若多个源文件都调用它，可以把定义放在它们共同包含的头文件里。

**变体一：原型和定义都写 `inline`（冗余但合法）**

```cpp
inline int smallf();

int main()
{
    // ...
    a = smallf();
    // ...
}

inline int smallf()
{
    // ...
}
```

这里的两个 `inline` 分别属于原型与定义两个声明。只在其中一个声明写一次就足够。同一个声明里写成 `inline inline int smallf();` 会违反说明符只能出现一次的规则。

**变体二：只在定义处写 `inline`**

```cpp
int smallf();

int main()
{
    // ...
    a = smallf();
    // ...
}

inline int smallf()
{
    // ...
}
```

同一翻译单元中，先作普通声明、后在定义处写 `inline` 可以合法声明一个内联函数；不能把编译过程想成看到调用点就永久决定是否展开。是否进行内联优化与说明符出现的先后并不等价，即使没有 `inline`，编译器也可能展开调用。跨翻译单元使用时要遵守内联声明、定义可达性和单一定义规则，通常把内联定义放在头文件。

**例4.15 内联函数示例**

**代码。**

```cpp
#include <iostream>
using namespace std;

inline int add(int a, int b) // 内联函数定义
{
    return a + b;
}

inline int multiply(int a, int b) // 内联函数定义
{
    return a * b;
}

int main()
{
    int sum = add(10, 20);
    int product = multiply(10, 30);
    cout << "10 + 20 = " << sum << endl;
    cout << "10 * 30 = " << product << endl;
}
```

**编译器展开后的等价形式。**

```cpp
int sum = 10 + 20;
int product = 10 * 30;
```

**运行结果。**

```text
10 + 20 = 30
10 * 30 = 300
```

**解析。**

`add` 和 `multiply` 都只有一条 `return`，适合作为内联候选。展开后省去了两次函数调用的跳转和栈帧建立；但这是编译器的优化结果，不是 `inline` 关键字强制执行的。若编译器不展开，程序结果仍然是 30 和 300，只是执行方式不同。

### 4.4.2 函数重载

**关键概念**

函数重载让一组功能相似、但处理不同类型或个数参数的函数共用同一个名字。编译器根据**函数参数表**（也称函数特征标）进行调用匹配：参数的类型和个数不同，就是不同的重载版本。

```cpp
void print(const char* str, int len); // #1
void print(double d, int len);        // #2
void print(int i, int len);           // #3
void print(const char* str);          // #4

print("hello", 10); // 匹配 #1
print(2024, 12);    // 匹配 #3
print("student");   // 匹配 #4
print(2024.0, 10);  // 匹配 #2
```

匹配时优先选择不需要转换或转换最少的那一版。`2024` 是 `int`，直接匹配 #3；`2024.0` 是 `double`，直接匹配 #2；`"hello"` 是字符串字面量，传给 `const char*`。

**例4.16 函数的重载实例程序**

**代码。**

```cpp
#include <iostream>
using namespace std;

void print(int i) // 重载函数：打印整数
{
    cout << "Printing int: " << i << endl;
}

void print(double f) // 重载函数：打印浮点数
{
    cout << "Printing double: " << f << endl;
}

void print(char c) // 重载函数：打印字符
{
    cout << "Printing char: " << c << endl;
}

void print(int i1, int i2) // 重载函数：打印两个整数
{
    cout << "Printing two int: " << i1 << " " << i2 << endl;
}

int main()
{
    print(5);     // 调用 int 版本的 print
    print(5.5);   // 调用 double 版本的 print
    print('A');   // 调用 char 版本的 print
    print(5, 5);  // 调用两个 int 参数版本的 print
}
```

**运行结果。**

```text
Printing int: 5
Printing double: 5.5
Printing char: A
Printing two int: 5 5
```

**解析。**

四次调用分别按实参的静态类型和个数匹配：`5` 是 `int`，`5.5` 是 `double`，`'A'` 是 `char`，`(5, 5)` 是两个 `int`。匹配在编译期完成，与运行时变量的实际内容无关。若某个实参类型没有精确匹配，编译器会尝试提升或转换；转换路径不唯一时就可能产生二义。

**重载的约束**

1. **返回值类型不参与重载。** 仅返回类型不同的两个函数不是重载：

```cpp
int average(int, int);
double average(int, int); // 错误：函数重复声明
```

调用 `average(1, 2)` 时，编译器无法只凭实参决定选哪一个返回类型，因此这两个声明被视为同一函数。

2. **不能用值/引用区分同一类型。** 下面的两个声明可以共存，但用 `double` 左值调用时二者都是精确匹配，产生二义：

```cpp
double circle_area(double r);
double circle_area(double& r);
```

常见规则把这对声明直接称为“重复说明”；更准确地说，声明本身可以存在，问题在调用匹配。不能靠它实现“按值/按引用”的重载。

3. **默认参数可能造成二义。** 一个函数有默认参数、另一个没有时，同一个调用可能同时匹配两个版本：

```cpp
void print(int, int);
void print(int, int, int = 10);

print(5, 3); // 错误：与两个 print 函数都匹配
```

`print(5, 3)` 既可调用两个参数的版本，也可调用第三个参数取默认值的版本，编译器无法抉择。

4. **整型提升优先于普通转换。** 例如：

```cpp
void print(int);
void print(long);

char c = '5';
print(c); // 可能误认为两者都匹配
```

按现代重载决议，`char→int` 是整型提升，`char→long` 是转换，`int` 版本的转换等级更好，实际会选 `int` 版本，并不构成二义。这个例子想提醒的是：重载时不要依赖隐式转换；如果确实需要区分，应提供精确匹配的版本，或在调用处显式转换。

**单选题**

以下正确的重载函数是（ ）。

- A. `int fun(int,double); double fun(int, double);`
- B. `int fun(int, double); int fun(int, double);`
- C. `int fun(int=0); int fun(int);`
- D. `int fun(int, double); int fun(int, double, double);`

**答案：D。**

A 只有返回类型不同，不是重载；B 两个声明完全相同，是重复声明；C 的参数表相同，默认参数不构成新的重载，两个声明是同一函数；D 的参数个数不同，参数表不同，构成重载。

## 4.5 变量的存储特性与标识符的作用域

同一个变量名，背后至少有三个不同的问题：它占用的内存在哪里、活多久；它的名字在源码的哪些位置可见；它能否被其他源文件访问。相应的术语是**存储期/存储位置**、**作用域**、**链接性**。三者相关但不能互相替代：`static` 局部变量有静态存储期，却只有块作用域；全局变量默认有外部链接，但加上 `static` 就变成内部链接；普通局部变量没有链接性，具有自动存储期；是否实际放在栈上由实现决定。本节先按常见的六类存储特性展开，再讲六种作用域。

### 4.5.1 变量的存储特性

**程序的内存区域**

程序运行时的内存通常按用途分成四块：

![程序运行时的主要内存区域](/images/campus-cpp-programming/memory-areas.svg)

- **代码区（code area）**：存放编译后的程序指令。
- **全局数据区（data area）**：存放全局变量和静态变量，包括写在函数内的静态局部变量。
- **堆区（heap area）**：存放 `new` 分配的动态数据，由 `delete` 释放。
- **栈区（stack area）**：存放局部变量、函数参数、返回地址等随函数调用自动创建和销毁的数据。

**存储特性是什么**

变量的存储特性主要指两件事：**存储位置**（在内存的哪里）和**生命周期**（变量存在的时间）。常见的六类：自动存储、静态存储、动态存储、寄存器存储、线程存储、外部链接。这里需要先把概念分开：

| 存储期 | 何时创建、何时销毁 | 典型对象 |
| --- | --- | --- |
| 自动存储期 | 进入声明所在的块时创建，离开块时销毁 | 普通局部变量、函数参数 |
| 静态存储期 | 程序开始到程序结束 | 全局变量、`static` 局部变量、`static` 全局变量 |
| 动态存储期 | `new` 时创建，`delete` 时销毁 | 堆上的对象 |
| 线程存储期 | 每个线程独立存在，线程结束时销毁 | `thread_local` 变量 |

- **寄存器存储**是“尽量放在 CPU 寄存器中”的优化提示，不是一种独立的存储期；变量仍然有其原本的存储期。
- **外部链接**是链接性，不是存储期；它回答的是“其他源文件能不能访问这个名字”，而不是“这个变量活多久”。

**1. 自动存储类**

函数的参数和局部变量默认是自动存储的：进入声明它们的函数或程序块时创建，离开作用域时销毁，通常存放在栈上。

**例4.17 在函数内部声明的变量**

**代码。**

```cpp
#include <iostream>
using namespace std;

void function()
{
    int localVariable = 10; // 自动存储期，局部变量
    cout << "Inside function: " << localVariable << endl;
}

int main()
{
    function();
    // localVariable 在这里不可访问，因为它是局部变量
}
```

**运行结果。**

```text
Inside function: 10
```

**解析。**

`localVariable` 在 `function` 被调用时创建，初值 10；函数返回时销毁。`main` 中不能使用这个名字，因为它的作用域只在 `function` 的函数体（更准确地说，是它所在的块）内。每次调用 `function` 都会得到一个新的 `localVariable`，上一次的值不会保留。

> 这里的“自动”指存储期，不是让你写 `auto` 关键字。C++11 起，`auto` 用于类型推导；旧式 `auto` 存储类说明符已经不再使用。普通局部变量不写任何说明符，默认就是自动存储期。

**2. 静态存储类**

静态变量存放在全局数据区，在程序的整个运行期间都存在。静态变量包括静态局部变量和静态全局变量，用关键字 `static` 声明。

需要区分两种 `static`：

- 在**局部作用域**写 `static`：改变的是**存储期**——变量从“每次调用重建”变成“程序全程只建一次”，但名字仍然只在函数内可见。
- 在**全局作用域**写 `static`：改变的是**链接性**——变量从“其他源文件也能访问”变成“只在本文件可见”，存储期本来就是静态的。

全局变量本身就有静态存储期；把“静态全局变量”直接等同于“全局变量”会混淆存储期和链接性。全局变量默认具有外部链接，加 `static` 后才是内部链接。

**例4.18 全局变量实例**

**代码。**

```cpp
#include <iostream>
using namespace std;

static int globalVariable = 20; // 静态存储期，全局变量

void function()
{
    cout << "Inside function: " << globalVariable << endl;
}

int main()
{
    cout << "Inside main: " << globalVariable << endl;
    function();
    return 0;
}
```

**运行结果。**

```text
Inside main: 20
Inside function: 20
```

**解析。**

`globalVariable` 定义在所有函数之外，`main` 和 `function` 都能访问。这里的 `static` 让它只在当前源文件内可见（内部链接），但不影响它的静态存储期；它在程序开始前就已存在，初值 20，程序结束时才销毁。

**例4.19 静态局部变量实例**

**代码。**

```cpp
#include <iostream>
using namespace std;

void function()
{
    static int staticLocalVariable = 30; // 静态存储期，静态局部变量
    staticLocalVariable += 1;
    cout << "Inside function: " << staticLocalVariable << endl;
}

int main()
{
    function();
    function();
}
```

**运行结果。**

```text
Inside function: 31
Inside function: 32
```

**解析。**

`staticLocalVariable` 只在第一次执行到声明时初始化一次，初值 30；第一次调用加 1 后输出 31。函数返回时它**不销毁**，第二次调用直接使用上次留下的 31，再加 1 输出 32。这就是“只初始化一次、跨调用保持”。

但它的**作用域仍然是局部的**：`main` 不能直接写 `staticLocalVariable`，这个名字只在 `function` 内可见。静态局部变量是“存储期长、作用域短”的典型：对象一直活着，名字却出不了函数。

**无编号演示：用静态变量测试密码输入次数**

例4.19 之后是一个没有编号的密码重试演示。例号从 4.19 直接跳到 4.21，**例4.20 缺号**；这个演示不能确认就是被略去的例4.20，因此按无编号保留，不自行补号。

**代码。**

```cpp
#include <iostream>
using namespace std;

int password(const int key);

int main()
{
    if (password(123456)) // 调用函数，测试用户输入密码
        cout << "Welcome!" << endl;
    else
        cout << "Sorry, you are wrong!" << endl;
}

int password(const int key)
{
    static int n = 0; // 静态变量
    int k;
    cout << "Please input your password: ";
    cin >> k; // 输入密码
    n++;      // 记录输入次数，即函数调用次数
    if (n < 3) // 输入次数合法
    {
        if (k == key) return 1; // 密码正确
        else password(key);     // 递归，重新输入
    }
    else // 连续输入3次
    {
        if (k == key) return 1; // 第3次正确
        else return 0;
    }
}
```

`const int key` 是按值传递的 `const` 参数，不是常引用；`const` 只表示函数内不能修改 `key`，每次递归调用仍会复制一份。

**思路。** `n` 是静态局部变量，第一次调用时初始化为 0；此后每次进入 `password`（包括递归调用）都执行 `n++`，所以它记录的是“到目前为止尝试了几次”，而不是某一次函数调用内部的局部计数。`n < 3` 时，输错就递归调用自己，让用户再输一次；`n` 达到 3 时不再递归，直接根据第三次输入返回 1 或 0。

按设计意图（补充说明）：

- 前两次输错、第三次输对：第三次进入 `else` 分支，返回 1，`main` 输出 `Welcome!`；
- 三次都输错：第三次返回 0，`main` 输出 `Sorry, you are wrong!`。

**两个需要注意的地方。**

第一，递归分支写的是 `else password(key);`，没有把内层调用的返回值传出来。这样第二层、第一层调用执行完 `if/else` 后会走到函数末尾，而有返回值的函数走到末尾属于未定义行为，`main` 得到的值不可靠。要正确传递结果，应写成：

```cpp
else return password(key); // 把内层结果返回给外层
```

第二，`static n` 的生命周期是整个程序，不是一次登录。三次尝试用完后，如果再次调用 `password`，`n` 不会重新从 0 开始，而是继续累加；也就是说，“三次机会”是程序级的，不是每次登录重置。这个例子用来说明静态局部变量的跨调用保持，实际登录逻辑应把计数放在每次会话的对象里，并在新会话开始时重置。

**3. 动态存储类**

用 `new` 和 `delete` 分配、释放的变量具有动态存储期，存放在堆区。它的生命周期由程序员控制：`new` 时开始，`delete` 时结束；忘记 `delete` 会造成内存泄漏，重复 `delete` 或使用已释放的指针会造成未定义行为。这部分内容在第5章详细展开。

```cpp
int* p = new int(10); // 动态分配，堆区
// 使用 *p
delete p;             // 手动释放
p = nullptr;
```

**4. 寄存器存储**

为了优化性能，变量可以尽量放在 CPU 寄存器中，而不是内存中；通常用于频繁访问的变量，如循环计数器。用 `register` 关键字声明，但现代编译器通常会自动优化，是否放入寄存器由编译器决定，程序员无法强制。

**例4.21 寄存器存储实例**

**代码。**

```cpp
#include <iostream>
using namespace std;

int main()
{
    register int registerVariable = 50; // 历史寄存器提示，仍具有自动存储期
    cout << "Inside main: " << registerVariable << endl;
}
```

**运行结果。**

```text
Inside main: 50
```

**解析。**

`register` 只是给编译器的提示，不保证变量真的进入寄存器；变量仍然可以像普通 `int` 一样参与运算和输出。这段代码按历史写法保留；C++17 起 `register` 不再是存储类说明符，现代代码通常不再写它，直接交给编译器优化即可。

**5. 线程存储**

线程存储的变量在每个线程中都有独立实例：通常在该线程首次使用前（块作用域的 `thread_local` 在首次执行到声明时）初始化，线程结束时销毁。它用于多线程编程，避免多个线程共享同一份数据而需要加锁。

> 这里的标题“线性存储”是笔误，代码中的 `thread_local` 表明实际讲的是**线程存储**。C++ 的标准写法是 `thread_local`；代码中的 `_Thread_local` 是 C 的拼写，MSVC 的 `_declspec(thread)` 是编译器扩展，语义都是“每个线程一份”。

**例4.22 线程存储实例**

**代码。**

```cpp
#include <iostream>
#include <thread>
using namespace std;

thread_local int threadVariable = 60; // 线程存储

void threadFunction()
{
    cout << "Inside thread: " << threadVariable << endl;
}

int main()
{
    thread t1(threadFunction);
    thread t2(threadFunction);
    t1.join();
    t2.join();
}
```

**运行结果。**

```text
Inside thread: 60
Inside thread: 60
```

**解析。**

`t1` 和 `t2` 是两个线程，每个线程都有自己的 `threadVariable` 实例，初值都是 60，所以各输出一次 60。两个线程的输出可能交错；实际运行的控制台可能叠成 `Inside thread: Inside thread: 60` 和 `60` 两行，这是并发执行造成的，不代表两次输出的内容不同。若把 `thread_local` 去掉，两个线程访问同一个全局对象；本例若仍只有读取，不会仅因共享而产生数据竞争。若增加并发写入，则需要相应同步。

有一种简化说法是线程变量“存储在线程的栈上”；更准确地说，它具有**线程存储期**，每个线程一份实例，具体放在哪里由实现管理。理解“每个线程独立”比记具体位置更重要。

**6. 外部链接**

全局变量和函数可以具有外部链接，意思是它们可以在其他源文件中被访问。用 `extern` 关键字声明一个在其他文件中定义的变量或函数。

**例4.23 声明外部链接**

**file1.cpp**

```cpp
// file1.cpp
#include <iostream>
using namespace std;

extern int externalVariable; // 声明外部链接变量，该变量在文件2中定义
extern void function1();

void function()
{
    externalVariable = 70;
    cout << "Inside function: " << externalVariable << endl;
}

int main()
{
    function();
    function1();
}
```

**file2.cpp**

```cpp
// file2.cpp
#include <iostream>
using namespace std;

int externalVariable = 80; // 定义外部链接变量

void function1()
{
    cout << "Inside function1: " << externalVariable << endl;
}
```

**运行结果。**

```text
Inside function: 70
Inside function1: 70
```

**解析。**

`file2.cpp` 中的 `int externalVariable = 80;` 是**定义**，它为变量分配存储并给出初值 80。`file1.cpp` 中的 `extern int externalVariable;` 是**声明**，只告诉编译器“这个变量在别处定义”，本身不分配存储。程序先调用 `function()`，把 `externalVariable` 改成 70；再调用 `function1()`，读到的是同一对象，所以输出 70，而不是初值 80。

`function1` 在 `file1.cpp` 中通过 `extern void function1();` 声明，定义在 `file2.cpp`；链接时把两个目标文件连在一起。编译命令可以是：

```bash
g++ file1.cpp file2.cpp -o extern_demo
```

**外部链接不是存储期。** `extern` 说明的是链接性：这个名字能否跨翻译单元访问。变量活多久仍由它的定义方式决定；例中的 `externalVariable` 是全局变量，具有静态存储期。

**存储期、作用域、链接性的对照**

| 概念 | 回答的问题 | 例子 |
| --- | --- | --- |
| 存储期 | 对象活多久 | 局部变量自动存储期；全局变量和 `static` 局部变量静态存储期；`new` 对象动态存储期；`thread_local` 线程存储期 |
| 作用域 | 名字在源码的哪里可见 | 块作用域、函数作用域、全局作用域、命名空间作用域 |
| 链接性 | 名字能否被其他翻译单元访问 | 全局变量/函数默认外部链接；文件作用域 `static` 内部链接；局部变量无链接 |

同一个对象可以同时具有“静态存储期 + 局部作用域”（静态局部变量），也可以具有“静态存储期 + 内部链接”（文件作用域 `static` 全局变量）。分析变量时分别问这三个问题，不要用一个词代替另一个。

**主观题：静态局部变量与全局变量**

**题目。**

阅读程序，写出输出结果。

```cpp
#include<iostream>
using namespace std;

int sub( int, int );
int a = 1;

int main()
{
    int m = 1, n = 2, f;
    f = sub( m, n );
    cout << a << '\t' << f << endl;
    f = sub( m, n );
    cout << a << '\t' << f << endl;
}

int sub( int c, int d )
{
    static int m = 2, n = 5;
    cout << m << '\t' << n << '\t' << endl;
    a = ++a;
    c = m++;
    d = n++;
    return c + d;
}
```

**输出。**

```text
2	5
2	7
3	6
3	9
```

**解析。**

`sub` 中的 `m`、`n` 是静态局部变量，只在第一次调用时初始化为 2、5，之后跨调用保持；`main` 中的 `m`、`n` 是普通局部变量，和它们不是同一对象；`a` 是全局变量。

第一次调用 `sub(1, 2)`：

- 静态 `m = 2`、`n = 5`，先输出 `2	5`；
- `a = ++a`：全局 `a` 从 1 变成 2；
- `c = m++`：`c` 取 2，`m` 变成 3；
- `d = n++`：`d` 取 5，`n` 变成 6；
- 返回 `c + d = 2 + 5 = 7`，`main` 输出 `a = 2`、`f = 7`。

第二次调用 `sub(1, 2)`：

- 静态 `m`、`n` 保持上次的 3、6，先输出 `3	6`；
- `a = ++a`：全局 `a` 从 2 变成 3；
- `c = m++`：`c` 取 3，`m` 变成 4；
- `d = n++`：`d` 取 6，`n` 变成 7；
- 返回 `3 + 6 = 9`，`main` 输出 `a = 3`、`f = 9`。

> 对这里的普通 int，`a = ++a` 从 C++11 起已有确定的先后关系：前置递增先完成，再取得右侧值，最后赋回 a；不能仅凭“同一表达式修改两次”断言它是未定义行为。C++03 的旧序列点规则不同。它与后置递增 `a = a++` 的规则不能混为一谈；本例直接写 `++a;` 更清楚。参见 [WG21 核心问题 637](https://cplusplus.github.io/CWG/issues/637.html)。

### 4.5.2 标识符的作用域

**作用域**是标识符在源码中可见的区域。离开作用域，名字就不能再直接使用；对于局部变量，对象通常也在离开作用域时销毁。常见分类有六种：局部、块、函数、静态、全局、命名空间。

**1. 局部作用域（Local Scope）**

局部作用域通常存在于函数、代码块或循环内部。在其中声明的变量称为局部变量，只在该作用域内可见；离开作用域，**自动存储期**的局部变量就被销毁（`static` 局部变量是例外，它的对象继续存在）。

```cpp
void function()
{
    int localVar = 10; // 局部作用域
}
```

函数参数也是局部变量，作用域覆盖整个函数体。

**2. 块作用域（Block Scope）**

块作用域由一对花括号定义。块内声明的变量只在该块内可见；块可以嵌套，内层块的变量会隐藏同名的外层变量。

```cpp
void function()
{
    int blockVar = 20; // 块作用域
    {
        int inner = 30; // 只在这个内层块可见
    }
    // 这里不能访问 inner
}
```

同名屏蔽的例子：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 1; // 外层的 a
    {
        int a = 1; // 内层的 a
        a++;
        cout << "inside a = " << a << endl;
    } // 内层的 a 作用域结束
    cout << "outside a = " << a << endl;
} // 外层的 a 作用域结束
```

**运行结果。**

```text
inside a = 2
outside a = 1
```

**解析。**

内层块重新声明了一个 `a`，它屏蔽了外层的 `a`。`a++` 改的是内层的 1，输出 2；离开内层块后，内层 `a` 销毁，外层的 `a` 仍然是 1，所以输出 1。如果内层不重新声明，直接写 `a++`，改的就是外层的 `a`。

**3. 函数作用域（Function Scope）**

函数作用域是整个函数内的区域。在函数作用域中声明的变量（包括函数参数）在整个函数内都是可见的。

```cpp
void function(int param)
{
    int funcVar = 30; // 函数作用域
}
```

需要说明的是，标准 C++ 中的“函数作用域”主要用于标号；函数参数属于函数参数作用域，函数体局部变量属于块作用域。这里用“函数作用域”统称“函数内声明的变量在整个函数内可见”，理解可见范围即可，不必把分类名称当成互斥的存储属性。

**4. 静态作用域（Static Scope）**

用 `static` 定义在文件作用域的变量，在程序整个运行期间都存在，但只在定义它的文件中可见。

```cpp
static int staticVar = 40; // 文件作用域，内部链接
```

这就是前面说的**内部链接**：其他源文件不能通过 `extern` 访问它。称为“静态作用域”是一种方便说法；更准确的描述是“文件作用域 + 内部链接 + 静态存储期”。不要把文件作用域的 `static` 和函数内的 `static` 混为一谈：前者改链接性，后者改存储期。

**5. 全局作用域（Global Scope）**

全局作用域是所有函数之外的区域。全局变量从定义的位置开始，到整个程序末尾都可见，除非被其他作用域中的同名变量隐藏。

```cpp
int globalVar = 50; // 全局作用域
```

**例：全局变量 a、b、c 的可见性**

**代码。**

```cpp
#include <iostream>
using namespace std;

int a = 1, b = 1; // a、b 的作用域从这里开始

void f1(int x) // f1 可以访问 a、b
{
    a = x * x;
    b = a * x;
}

int c; // c 的作用域从这里开始，默认初始值为 0

void f2(int x, int y) // f2 可以访问 a、b、c
{
    a = x > y ? x : y;
    b = x < y ? x : y;
    c = x + y;
}

int main() // main 可以访问 a、b、c
{
    f1(4);
    cout << "call function f1 :\n";
    cout << "a = " << a << ", b = " << b << endl;
    f2(10, 23);
    cout << "call function f2 :\n";
    cout << "a = " << a << ", b = " << b << ", c = " << c << endl;
}
```

**运行结果。**

```text
call function f1 :
a = 16 , b = 64
call function f2 :
a = 23 , b = 10 , c = 33
```

**解析。**

- `a`、`b` 定义在 `f1` 之前，`f1`、`f2`、`main` 都能访问。`f1(4)` 执行 `a = 4*4 = 16`，`b = 16*4 = 64`。
- `c` 定义在 `f1` 之后、`f2` 之前。`f1` 看不到 `c`（名字还没声明），`f2` 和 `main` 可以看到。
- `c` 是全局变量，具有静态存储期，程序开始前被零初始化，所以默认初值是 0；`f2(10, 23)` 执行 `a = 23`（较大者），`b = 10`（较小者），`c = 10 + 23 = 33`。
- 全局变量的作用域从声明点开始，不是“整个文件从头到尾都能用”。在声明之前定义的函数不能访问它。

**在函数体内访问被屏蔽的全局变量**

局部变量可以和外层变量同名。想在函数内访问被局部变量屏蔽的全局变量，可以用全局作用域运算符 `::`：

```cpp
#include <iostream>
using namespace std;

int x; // 全局变量，零初始化为 0

int main()
{
    int x = 256; // 局部变量，屏蔽同名的全局 x
    cout << "global variable x = " << ::x << endl;
    cout << "local variable x = " << x << endl;
}
```

**运行结果。**

```text
global variable x = 0
local variable x = 256
```

**解析。**

`::x` 前面的 `::` 表示全局命名空间，所以访问的是函数外的 `x`；不加 `::` 的 `x` 是 `main` 内的局部变量。全局 `int x;` 没有显式初始化，但全局变量会零初始化，因此值是 0，而不是随机值。

**6. 命名空间作用域（Namespace Scope）**

命名空间用于组织代码、避免名称冲突。在命名空间中声明的标识符只在该命名空间内可见，除非使用 `using` 声明、`using namespace` 或命名空间别名访问。具体用法在 4.7 节展开。

```cpp
namespace MyNamespace
{
    int namespaceVar = 60; // 命名空间作用域
}
```

在命名空间外访问时要写 `MyNamespace::namespaceVar`；直接写 `namespaceVar` 找不到这个名字。

**单选题 1**

阅读程序，写出输出结果：

```cpp
#include <iostream>
using namespace std;

int a = 1;

int main()
{
    int a = 5;
    if (a > 0)
    {
        int a = 10;
        cout << a << " ";
    }
    cout << a << " ";
    cout << ::a << endl;
    return 0;
}
```

- A. `10 1 5`
- B. `10 5 1`
- C. `5 10 1`
- D. `10 5 5`

**答案：B。**

`main` 内层局部 `a = 5`；`if` 块内又声明 `a = 10`，块内输出 10；离开块后，块内的 `a` 销毁，`main` 的 `a` 仍是 5，输出 5；`::a` 访问全局 `a`，值为 1，输出 1。三个值依次是 10、5、1。

**单选题 2**

阅读程序，写出输出结果：

```cpp
#include <iostream>
using namespace std;

int x = 100;

void fun()
{
    int x = 20;
    static int y = 10;
    x++;
    y++;
    cout << x << "," << y << " ";
}

int main()
{
    fun();
    fun();
    cout << x << endl;
    return 0;
}
```

- A. `21,11 21,12 100`
- B. `21,11 21,11 100`
- C. `21,11 22,12 100`
- D. `21,11 21,12 21`

**答案：A。**

`fun` 内的 `int x = 20` 是普通局部变量，每次调用都重新创建，加 1 后输出 21，所以两次都是 `21`。`static int y = 10` 只初始化一次，第一次加 1 输出 11，第二次在上次的 11 上再加 1 输出 12。`main` 最后输出的是全局 `x`，它没有被 `fun` 内的局部 `x` 影响，仍是 100。因此输出 `21,11 21,12 100`。

## 4.6 预处理指令和多文件结构

预处理指令在编译之前执行，用来处理源文件的文本：包含其他文件、替换宏、按条件保留或丢弃代码。预处理指令以 `#` 开头，一条指令占一行，行末不加分号。预处理的结果仍然是一份源程序，之后才进入编译阶段。

本节先讲五类常用预处理指令，再讲一个 C++ 程序怎样拆成多个文件。

### 4.6.1 预处理指令

#### 1. 文件包含 `#include`

`#include` 在编译之前把指定文件的全部内容插入到指令所在的位置，相当于把那个文件“复制”到这里，再一起编译。它不是链接一个库，也不是运行时加载文件。

有两种写法：

```cpp
#include <文件名>
#include "文件名"
```

- `#include <文件名>`：通常用于标准库或系统头文件。编译器在系统头文件目录中查找，例如 `#include <iostream>`。
- `#include "文件名"`：通常用于用户自定义头文件。编译器一般先在当前源文件所在目录查找，找不到再按系统头文件的路径查找，例如 `#include "myheader.h"`。
- 尖括号和双引号的核心差别是查找起点；具体搜索顺序由编译器实现决定。初学阶段按“系统头文件用尖括号、自己的头文件用双引号”使用即可。

```cpp
#include <iostream>    // 包含标准输入输出库
#include "myheader.h"  // 包含用户自定义头文件
```

头文件被包含后，其中的声明、宏、类型定义就出现在当前源文件里。多个源文件都可以包含同一个头文件，每个源文件都会得到一份声明；这没有问题。但头文件中一般只放声明，不放函数定义，原因在 4.6.2 说明。

#### 2. 宏定义 `#define` 与 `#undef`

`#define` 用来定义宏。宏可以是一个符号常量，也可以是一段带参数的替换文本。`#undef` 用来取消一个宏的定义。

```cpp
#define PI 3.14159          // 定义符号常量
#define SQUARE(x) (x * x)   // 定义宏函数
#define MAX 100
#undef MAX                  // 取消 MAX 的定义
```

- **符号常量宏**：把一个标识符定义为一个值。预处理时，程序正文中出现的 `PI` 会被替换成 `3.14159`。
- **宏函数**：定义一个可以替换的代码片段。预处理时，`SQUARE(x)` 按参数位置把 `x` 替换成实参文本。
- 宏名没有类型，也不占运行时的存储空间；它只是预处理阶段的文本替换。
- `#define` 行末不加分号。如果写成 `#define MAX 100;`，分号会成为替换文本的一部分，`MAX` 被替换后可能多出一个分号。

**宏替换的求值陷阱。** 宏参数不是函数形参，替换时不会先计算实参，也不会自动加括号。如果替换体中的参数没有括号，运算优先级会改变：

```cpp
#define PI 3.14159
#define AREA(r) PI * r * r

double x = 3.6;
double s = AREA(x + 1);
```

`AREA(x + 1)` 展开为

```cpp
PI * x + 1 * x + 1
```

而不是 `PI * (x + 1) * (x + 1)`。正确写法是给每个参数和整个替换体都加括号：

```cpp
#define AREA(r) (PI * (r) * (r))
```

前面示例中的 `#define SQUARE(x) (x * x)` 也有同类问题：`SQUARE(a + b)` 会展开为 `(a + b * a + b)`，仍然不是 $(a+b)^2$。应写成 `#define SQUARE(x) ((x) * (x))`。

带副作用的实参还会被重复求值。例如 `SQUARE(i++)` 展开后会把 `i++` 写两次，产生两次自增；这类写法结果不可靠，应避免。

**宏替换示例。**

```cpp
#include <iostream>
using namespace std;

// 不带参数宏替换。在程序正文中，用 3.1415926 代替 PI
#define PI 3.1415926
// 带参数宏替换。在程序正文中，PI*r*r 代替 area(x)，r 是参数
#define area(r) PI*r*r

int main()
{
    double x, s;
    x = 3.6;
    s = area(x);
    cout << "s=" << s << endl;
}
```

运行结果：

```text
s=40.715
```

`area(x)` 在预处理后变成 `PI * x * x`，代入 $x=3.6$ 得 $3.1415926\times 3.6^2\approx 40.715$。这个例子中实参只是一个变量，没有暴露优先级问题；如果写成 `area(x + 1)`，就会得到错误结果。

**C++ 中的替代写法。** 对于符号常量，C++ 更推荐用 `const`；对于简单的“宏函数”，更推荐用内联函数：

```cpp
#include <iostream>
using namespace std;

// 不带参数的宏替换，在 C++ 中使用常量定义：
const double PI = 3.1415926;
// 带参数宏替换，C++ 使用内联函数：
inline double area(double r) { return PI * r * r; }

int main()
{
    double x, s;
    x = 3.6;
    s = area(x);
    cout << "s=" << s << endl;
}
```

同样的输入仍然输出 `s=40.715`。两种写法的区别不只是形式：

- `const double PI` 有明确的类型和作用域，编译器会做类型检查；宏 `PI` 只是文本，预处理后类型由上下文决定。
- `inline double area(double r)` 的形参有类型，实参在调用前求值一次；宏 `area(r)` 既不检查类型，也可能重复求值实参。
- 内联函数向编译器提出“在调用处展开”的请求，用来减少小函数的调用开销；是否真正展开由编译器决定。宏则由预处理器强制做文本替换。

#### 3. 条件编译

条件编译指令包括 `#ifdef`、`#ifndef`、`#if`、`#else`、`#elif`、`#endif`。它们根据预处理阶段能够确定的条件，决定某一段代码是否参与编译。

| 指令 | 作用 |
| --- | --- |
| `#ifdef` | 如果宏已经定义，则编译下面的代码 |
| `#ifndef` | 如果宏没有定义，则编译下面的代码 |
| `#if` | 如果常量表达式为真（非零），则编译下面的代码 |
| `#else` | 如果前面的 `#ifdef`、`#ifndef` 或 `#if` 条件为假，则编译下面的代码 |
| `#elif` | 在前面的条件为假时，再提供一个条件分支 |
| `#endif` | 结束条件编译块 |

常用的三种形式：

**形式 1：单分支。**

```cpp
#if 常量表达式
    程序段
#endif
```

**形式 2：双分支。**

```cpp
#if 常量表达式
    程序段1
#else
    程序段2
#endif
```

**形式 3：多分支。**

```cpp
#if 常量表达式1
    程序段1
#elif 常量表达式2
    程序段2
#elif 常量表达式n
    程序段n
#else
    程序段n+1
#endif
```

`#if` 后面要求的是编译期常量表达式；`#ifdef` 和 `#ifndef` 只检查一个宏是否定义，不能写一般表达式。`defined(宏名)` 是条件编译中的运算符，用来判断某个宏是否定义，可以配合 `#if` 使用：

```cpp
#if defined(DEBUG)
    // DEBUG 已定义时编译
#endif
```

`#ifdef X` 等价于 `#if defined(X)`，`#ifndef X` 等价于 `#if !defined(X)`。在 `#if` 的表达式中，没有定义的标识符按 0 处理；`defined` 只检查是否定义，不展开宏的值。

**条件编译示例。** 下面的片段默认文件前面已经有 `#include <iostream>` 和 `using namespace std;`，并且位于某个函数体内。

```cpp
#ifdef DEBUG
    cout << "Debug mode" << endl;
#elif defined(RELEASE)
    cout << "Release mode" << endl;
#else
    cout << "Unknown mode" << endl;
#endif
```

- 如果定义了 `DEBUG`，只编译第一段，后面的分支不再考虑。
- 如果没有定义 `DEBUG` 但定义了 `RELEASE`，编译第二段。
- 如果两个都没有定义，编译 `#else` 中的第三段。
- 只有一个分支会进入编译；其余分支的代码不会出现在最终的目标代码中。

> 说明：这个示例在原件中连续出现两次，内容相同，这里只保留一份。

**头文件保护宏。** 同一个头文件可能被间接包含多次。用 `#ifndef` / `#define` / `#endif` 把整个头文件包起来，可以保证它在同一个源文件中只被展开一次：

```cpp
#ifndef CALCULATE_H
#define CALCULATE_H

double circle(double radius)
{
    const double pi = 3.14159;
    return pi * radius * radius;
}

#endif
```

第一次包含时，`CALCULATE_H` 还没有定义，`#ifndef` 条件为真，于是定义 `CALCULATE_H` 并编译中间的内容；第二次包含时，`CALCULATE_H` 已经定义，`#ifndef` 条件为假，中间的内容被跳过。这个宏通常按头文件名大写加下划线命名，例如 `CALCULATE_H`、`FUNCTIONS_H`。

这里用函数定义演示保护宏的写法。实际的多文件项目中，头文件通常只放函数声明；如果把函数定义放在头文件里，又被多个源文件包含，链接时会出现重复定义。原因见 4.6.2。

**`#ifdef` 的简单例子。**

```cpp
#include <iostream>
using namespace std;

//#define TEST

int main()
{
#ifdef TEST
    cout << "TEST已定义" << endl;
#else
    cout << "TEST未定义" << endl;
#endif
}
```

因为 `#define TEST` 被注释掉了，`TEST` 没有定义，按代码推得输出：

```text
TEST未定义
```

如果把 `//#define TEST` 改成 `#define TEST`，再重新编译，输出就变成 `TEST已定义`。条件编译的结果在编译之前已经确定，运行时不会再去判断 `TEST`。

#### 4. `#pragma`

`#pragma` 用来向编译器发出特定的指令或警告。它的具体含义和可用参数依赖编译器，不属于 C++ 标准统一规定的行为。

```cpp
#pragma once  // 确保头文件只被包含一次（非标准，但广泛支持）
```

`#pragma once` 让编译器在同一个源文件中只展开某个头文件一次。它比头文件保护宏写起来简单，但不是标准语法；头文件保护宏的可移植性更好。实际项目中两种写法都很常见，有些编译器还会对 `#pragma once` 做额外优化。

`#pragma once` 通常写在头文件最上面。它依赖编译器识别“这是同一个文件”；如果同一个文件通过不同的路径被包含，个别实现可能识别不出来，所以标准头文件通常仍使用保护宏。

#### 5. `#error`

`#error` 在预处理阶段产生一条错误信息，并终止编译。它常用来检查编译环境是否满足要求：

```cpp
#if defined(_MSC_VER) && (_MSC_VER < 1900)
#error "Compiler version too old."
#endif
```

- `_MSC_VER` 是 Microsoft 编译器预定义的版本宏；其他编译器通常不会定义它。
- 如果使用 MSVC 且版本号小于 1900，`#if` 条件为真，预处理阶段就报错并显示 `Compiler version too old.`。
- 如果不是 MSVC，`defined(_MSC_VER)` 为假，整个 `#error` 分支被跳过。

`#error` 和普通的 `#warning`（部分编译器支持）不同：`#error` 会阻止继续编译，适合表达“当前环境不支持，不能继续”的情况。

### 4.6.2 多文件结构

一个 C++ 程序称为一个项目，通常由一个或多个文件组成。把程序按逻辑功能拆成多个文件，便于组织、管理和测试。一个多文件项目通常包含以下几类文件：

| 文件类型 | 常见扩展名 | 主要内容与职责 |
| --- | --- | --- |
| 头文件 | `.h`、`.hpp` | 函数声明、类声明、模板声明、宏定义、常量定义等；用于在多个源文件之间共享接口 |
| 源文件 | `.cpp` | 函数定义、类成员函数定义、变量定义等；实现头文件中声明的接口 |
| 资源文件 | 图像、音频、视频、配置文件等 | 程序运行时加载的资源 |
| 库文件 | 静态库 `.lib`/`.a`，动态库 `.dll`/`.so` | 已经预编译好的代码，可以被多个项目共享 |

一个典型的多文件项目可以画成“头文件—实现文件—主文件”的结构：

```text
头文件 A        头文件 B        头文件 C
   ↓               ↓               ↓
实现文件 A.cpp  实现文件 B.cpp  实现文件 C.cpp
   ↘               ↓               ↙
            主文件 M.cpp
```

主文件包含它需要的头文件，各个实现文件包含自己对应的头文件。编译器分别编译每个 `.cpp` 文件，生成目标文件；链接器再把主文件和各个实现文件的目标代码合成为可执行程序。头文件本身不单独编译，它只是被 `#include` 展开到包含它的源文件中。

#### 例 4.24　多文件结构实例

这个例子把“输出两个整数之和”拆成四个文件：`main.cpp` 是程序入口，`functions.h` 放函数声明，`functions.cpp` 放函数定义，`config.h` 放配置宏。四个文件合起来才是一个完整程序，它们不是四份相同的代码，而是分别负责入口、声明、配置和实现。

**`main.cpp`**

```cpp
// exp4-24: main.cpp
#include <iostream>
#include "functions.h"
#include "config.h"
using namespace std;

int main() {
    cout << "The result is: " << add(2, 3) << endl;
    return 0;
}
```

**`functions.h`**

```cpp
// exp4-24: functions.h
#ifndef FUNCTIONS_H
#define FUNCTIONS_H

int add(int a, int b);

#endif // FUNCTIONS_H
```

**`config.h`**

```cpp
// exp4-24: config.h
#ifndef CONFIG_H
#define CONFIG_H

#define VERSION "1.0.0"

#endif // CONFIG_H
```

**`functions.cpp`**

```cpp
// exp4-24: functions.cpp
#include "functions.h"

int add(int a, int b) {
    return a + b;
}
```

运行结果（按代码推得）：

```text
The result is: 5
```

**四个文件的分工。**

- `main.cpp` 是程序入口。它包含 `<iostream>` 以使用 `cout`、`endl`，包含 `"functions.h"` 以获得 `add` 的声明，包含 `"config.h"` 以获得配置宏 `VERSION`。`main` 中调用 `add(2, 3)` 时，编译器已经从 `functions.h` 知道 `add` 的参数类型和返回类型，因此可以检查调用是否正确。
- `functions.h` 只放 `add` 的函数原型 `int add(int a, int b);`，不放大括号函数体。它被 `main.cpp` 和 `functions.cpp` 同时包含：`main.cpp` 用它来声明接口，`functions.cpp` 用它来核对“定义与声明是否一致”。
- `config.h` 放配置信息，本例中定义了字符串宏 `VERSION`。它被 `main.cpp` 包含，表示主程序可以使用这个版本号；本例没有实际输出 `VERSION`，只是演示配置文件怎样参与编译。宏在预处理阶段替换，不会产生链接器符号。
- `functions.cpp` 放 `add` 的定义。它包含 `"functions.h"`，这样编译器能把定义和头文件中的原型对照；如果参数表或返回类型写得不一致，编译阶段就能发现。

`functions.h` 和 `config.h` 都使用了头文件保护宏。`FUNCTIONS_H`、`CONFIG_H` 第一次被包含时定义，第二次再遇到同一个头文件时，`#ifndef` 为假，整个文件体被跳过，从而避免同一个源文件里出现重复声明。`config.h` 目前只被 `main.cpp` 包含一次，保护宏暂时没有发挥作用，但这是头文件的标准写法，应该保留。

**为什么头文件只放声明，函数定义只放一份。**

C++ 的多个源文件是分别编译的。`main.cpp` 和 `functions.cpp` 各自生成目标文件，最后才由链接器合并。对于 `add` 这样的函数：

- 声明 `int add(int a, int b);` 可以出现在多个源文件中，它只告诉编译器“这个函数存在，参数和返回值是这样”，不产生函数体。
- 定义 `int add(int a, int b) { return a + b; }` 只能有一份。如果把它写进 `functions.h`，而 `main.cpp` 和 `functions.cpp` 都包含了这个头文件，那么两个目标文件里都会有一份 `add` 的定义；链接器会发现同一个函数被定义多次，报“重复定义”错误。
- 因此通常的分工是：头文件放声明，一个源文件放定义。这样声明可以反复出现，定义在整个程序中只有一份。这个规则常称为“单一定义规则”（One Definition Rule，ODR）。内联函数、类内定义的成员函数、模板等有例外，初学阶段先记住普通函数“声明可重复、定义只一份”。

`main.cpp` 包含 `"functions.h"` 后，编译器在调用点知道 `add` 的接口；`functions.cpp` 提供定义后，链接器才能把 `main.o` 中对 `add` 的引用解析到 `functions.o` 中的实现。缺少声明时，编译器在调用点不知道 `add` 是什么，C++ 不会像旧式 C 那样隐式推断函数参数；缺少定义时，编译可以通过，但链接阶段会报“无法解析的外部符号”。

> 说明：原件中的文件名标签有 `function.cpp`、`function.h` 的单数写法，但代码注释、`#include` 和实际文件名均为 `functions.cpp`、`functions.h`；另有一处标注称 `functions.h`“包含函数定义”，实际它只含 `add` 的声明，定义在 `functions.cpp`。这里和代码统一按 `functions.*` 处理，并按“头文件声明、源文件定义”讲解。

## 4.7 命名空间

命名空间是类、函数、对象、类型和其他名字的集合。它的主要作用是避免命名冲突：不同的库或不同的模块可能都定义了名为 `print` 的函数，如果它们都直接放在全局作用域，名字就会冲突；把各自的名字放进不同命名空间后，可以用 `A::print` 和 `B::print` 区分。

命名空间本身不是运行时的容器：它不分配内存，也不产生可执行代码；它只影响名字的归属和查找方式。命名空间里面定义的变量和函数才占用存储或生成代码。

### 4.7.1 标准命名空间

C++ 标准库的所有实体，包括函数、对象、类型定义等，都放在名为 `std` 的标准命名空间中。使用标准库的组件时，需要让编译器知道这个名字属于 `std`。

#### `std` 中常见的名字

| 名字 | 说明 |
| --- | --- |
| `std::ios` | 输入输出流的基类 |
| `std::istream` | 输入流类，`std::cin` 是它的对象 |
| `std::ostream` | 输出流类，`std::cout` 是它的对象；`std::endl` 是输出操纵符 |
| `std::iostream` | 同时支持输入和输出的流类 |
| `std::string` | 字符串类 |
| `std::vector` | 动态数组容器 |
| `std::map` | 键值对映射容器 |
| `std::set` | 唯一元素集合容器 |
| `std::sort`、`std::find` | 标准算法，定义在 `<algorithm>` 中 |
| `std::numeric_limits` | 数值限制的类模板 |
| `std::exception` | 标准异常基类 |

这些名字有时被统称为 `std` 中的“子命名空间和组件”。严格说，上表中的 `ios`、`istream`、`ostream`、`iostream` 是类，`string`、`vector`、`map`、`set` 是类型，`sort`、`find` 是函数模板，`numeric_limits` 是类模板，`exception` 是类；它们都是 `std` 中的名字，并不各自构成一个子命名空间。初学阶段把它们理解为“标准库放在 `std` 里的常用名字”即可。

#### 使用 `std` 的三种方式

**方法一：使用 `using namespace std;`。**

```cpp
// 方法一：
#include <iostream>  // 包含头文件
using namespace std;

int main()
{
    int a, b;
    cin >> a;
    cin >> b;
    cout << "a+b=" << a + b << "\n";
}
```

`using namespace std;` 是一条 **using 指令**（using-directive）。它让 `std` 中的所有名字在当前作用域内可以直接使用，所以 `cin`、`cout` 不必再写 `std::` 前缀。它没有“包含”标准库，也没有“声明” `std`；真正把 `cin`、`cout` 的声明带进来的是 `#include <iostream>`。

**方法二：使用 `using std::cin;`、`using std::cout;`。**

```cpp
// 方法二：
#include <iostream>
using std::cin;
using std::cout;

int main()
{
    int a, b;
    cin >> a;
    cin >> b;
    cout << "a+b=" << a + b << '\n';
}
```

每一条 `using std::名字;` 是一条 **using 声明**（using-declaration），只把指定的那个名字引入当前作用域。这里只引入了 `cin` 和 `cout`，没有引入 `std` 中的其他名字；程序使用 `'\n'` 而不是 `endl`，所以也不需要引入 `std::endl`。

> 说明：原件方法二曾写作 `using namespace std::cin;`，这不是合法写法：`std::cin` 是一个对象，不是命名空间，不能对它使用 `using namespace`。正确写法是 `using std::cin;`，下文按正确写法给出。

**方法三：每次写全限定名。**

```cpp
// 方法三：
#include <iostream>

int main()
{
    int a, b;
    std::cin >> a;
    std::cin >> b;
    std::cout << "a+b=" << a + b << '\n';
}
```

完全不使用 `using`，每次通过 `std::` 指定名字所属的命名空间。这种写法最啰嗦，但最明确，不会把 `std` 中的其他名字带进当前作用域。

**三种方式的取舍。**

- 方法一最短，适合小程序和教材示例；但它把 `std` 中的所有名字都暴露到当前作用域，名字多时可能和自己的变量、函数发生冲突。不要把它放进头文件，否则每个包含该头文件的源文件都会受到污染。
- 方法二只引入确实需要的名字，冲突风险小；需要引入的名字较多时，逐条写会比较长。
- 方法三最明确，适合头文件、名字容易冲突的场合，或者需要让读者一眼看出名字来源的代码。
- 无论用哪种方式，`std::cin`、`std::cout` 这些实体的完整名字都没有改变；`using` 只影响不加限定的名字能否被找到。

### 4.7.2 定义命名空间

自定义命名空间的语句格式是：

```cpp
namespace 标识符 {
    语句序列
}
```

其中 `namespace` 是关键字，标识符是用户定义的命名空间名称，花括号内可以包含类、函数、对象、类型以及其他命名空间的定义或声明。

```cpp
#include <iostream>

namespace MyNamespace
{
    int value = 10;

    void function()
    {
        std::cout << "Inside MyNamespace" << std::endl;
    }
}
```

这个命名空间中有两个元素：`value` 是变量，`function` 是函数。它们的完整名字分别是 `MyNamespace::value` 和 `MyNamespace::function`。在命名空间外部使用时，要用作用域解析运算符 `::` 指定命名空间：

```cpp
MyNamespace::function();
std::cout << MyNamespace::value << std::endl;
```

#### 嵌套、不连续与合并

命名空间实际上是一个作用域，可以嵌套。一个命名空间中可以定义多个其他命名空间：

```cpp
namespace A
{
    void f();
    void g();
}

namespace B
{
    void h();

    namespace C
    {
        void i();
    }
}

namespace A   // 为 namespace A 追加说明
{
    void j();
}
```

- `A` 中有 `f`、`g`、`j` 三个函数；`B` 中有 `h`，并嵌套了 `C`；`C` 的完整名字是 `B::C`，其中有 `i`。
- 访问时分别写 `A::f()`、`A::g()`、`A::j()`、`B::h()`、`B::C::i()`。`C` 不是全局命名空间中的名字，不能直接写 `C::i()`。
- 第二个 `namespace A` 不是重新定义一个不同的 `A`，而是重新打开同一个命名空间，把 `j` 追加进去。命名空间可以是不连续的，同一个命名空间可以分散在几个不同的地方，甚至分散在多个文件中；编译器在编译时会把同名的命名空间合并成一个。
- 合并的是命名空间这个“作用域”，不是里面的实体。每个函数、变量仍然只能有一份定义；声明可以出现在多个头文件中，定义仍要遵守单一定义规则。

这种“可重新打开、可分散定义”的性质，使标准库可以把 `std` 中的名字分散在大量头文件中，而使用者看到的仍然是同一个 `std`。

### 4.7.3 使用命名空间

#### 三种访问方式

假设已经有 4.7.2 中的 `MyNamespace`，访问它的成员有三种方式。下面的访问片段都写在某个函数体内。

**（1）直接指定。** 使用命名空间名和作用域解析运算符 `::`：

```cpp
MyNamespace::function();
std::cout << MyNamespace::value << std::endl;
```

**（2）using 声明。** 在当前作用域中引入命名空间中的一个名字：

```cpp
using MyNamespace::value;
std::cout << value << std::endl;   // 直接使用 value
```

这条 `using` 只引入 `value`，没有引入 `function`；如果还要直接调用 `function`，需要再写 `using MyNamespace::function;`，或者继续写 `MyNamespace::function()`。

**（3）using 指令。** 在当前作用域中引入整个命名空间：

```cpp
using namespace MyNamespace;
function();                        // 直接使用 function
std::cout << value << std::endl;   // 直接使用 value
```

`using namespace MyNamespace;` 让 `MyNamespace` 中的所有名字在当前作用域内都可以不加限定地使用。

> 说明：按 C++ 标准，`using MyNamespace::value;` 叫 **using 声明**（using-declaration），`using namespace MyNamespace;` 叫 **using 指令**（using-directive）。原件把这两个名称写反了；这里按标准术语表述，避免把“引入一个名字”和“引入整个命名空间”混为一谈。

#### `using` 不改变定义归属

这是最容易误解的一点：`using` 只影响**名字查找**，不改变实体的定义归属、存储位置或链接性。

- `MyNamespace::value` 这个变量仍然定义在 `MyNamespace` 中。写 `using MyNamespace::value;` 之后，`value` 只是当前作用域中可以使用的一个名字，指向的仍是同一个 `MyNamespace::value`；没有创建新变量，也没有把变量“搬”到当前作用域。
- 写 `using namespace MyNamespace;` 之后，`value` 和 `function` 仍然属于 `MyNamespace`。`MyNamespace::value` 和直接写的 `value` 是同一个实体；对 `value` 取地址，得到的是同一个地址。
- `using` 不改变函数的链接性。一个命名空间作用域中的普通函数默认具有外部链接；`static` 才会把它改成内部链接。`using` 既不把外部链接变成内部链接，也不把内部链接变成外部链接。
- `using` 的作用范围受它所在的作用域限制。写在函数内，只影响该函数；写在某个 `.cpp` 的全局作用域，影响该文件后面的代码；写在头文件中，则会影响所有包含该头文件的源文件，因此头文件中通常避免写 `using namespace ...;`。

区分三个概念：

- **名字查找/可见性**：在某个位置写一个不加限定的名字，编译器能不能找到它、找到哪一个。`using` 改变的是这一层。
- **定义归属**：实体真正定义在哪个命名空间、哪个作用域。`using` 不改变这一层。
- **链接性**：不同源文件中的同名符号是否指向同一个实体，由 `extern`、`static`、`inline` 等决定，不由 `using` 决定。

#### 嵌套命名空间与别名

命名空间可以嵌套定义，以提供更细粒度的代码组织：

```cpp
namespace MyNamespace
{
    namespace NestedNamespace
    {
        int nestedValue = 20;
    }
}

namespace MN = MyNamespace::NestedNamespace; // MN 是 MyNamespace::NestedNamespace 的别名

int main()
{
    MyNamespace::NestedNamespace::nestedValue = 40; // 访问嵌套命名空间中的变量
    MN::nestedValue = 40;                           // 使用别名访问命名空间中的实体
}
```

`NestedNamespace` 的完整名字是 `MyNamespace::NestedNamespace`，其中的 `nestedValue` 要写全为 `MyNamespace::NestedNamespace::nestedValue`。`namespace MN = ...;` 定义的是命名空间别名，不是新的命名空间；`MN::nestedValue` 和 `MyNamespace::NestedNamespace::nestedValue` 访问的是同一个变量。别名只是给这个长名字起一个短名字，便于书写。

#### 例 4.25　命名空间使用实例

> 说明：原件把下面的普通版和嵌套版都编为“例 4.25”，两个示例内容不同。这里保留原编号，按出现顺序分列，不合并。

**普通版：头文件定义命名空间，主文件使用。**

`my_header.h`：

```cpp
// my_header.h
#ifndef MY_HEADER_H
#define MY_HEADER_H

#include <iostream>

namespace MyLibrary { // 定义命名空间 MyLibrary
    void libraryFunction()
    {
        std::cout << "Function from MyLibrary" << std::endl;
    }
}

#endif // MY_HEADER_H
```

`main.cpp`：

```cpp
// main.cpp
#include "my_header.h"
using namespace MyLibrary; // 使用命名空间 MyLibrary

int main() {
    libraryFunction();
}
```

运行结果：

```text
Function from MyLibrary
```

- `my_header.h` 用头文件保护宏包住命名空间定义，防止同一个源文件重复包含时重复定义 `libraryFunction`。
- `libraryFunction` 定义在 `MyLibrary` 中，完整名字是 `MyLibrary::libraryFunction`。
- `main.cpp` 包含头文件后，用 `using namespace MyLibrary;` 让 `libraryFunction` 在当前文件中可以直接使用；这条 using 指令只影响 `main.cpp`，不会影响其他源文件。
- 头文件中的 `std::cout`、`std::endl` 使用了全限定名，因此头文件自己包含 `<iostream>` 后就能独立编译，不依赖包含者先写 `using namespace std;`。
- 这个示例为了简短，把 `libraryFunction` 的定义直接放在头文件中，并且只有一个 `main.cpp` 包含它。实际的多文件项目中，如果头文件会被多个源文件包含，应把函数定义移到某个 `.cpp` 中，头文件只保留声明，避免链接时重复定义。

> 说明：原件 `my_header.h` 直接使用未限定的 `cout`、`endl`，却没有包含 `<iostream>`，单独编译会找不到这些名字；这里在头文件中加入 `<iostream>` 并写成 `std::cout`、`std::endl`，命名空间的结构和输出不变。

**嵌套版：多层命名空间与限定调用。**

```cpp
#include <iostream>
using namespace std;

namespace A
{
    void f()
    { cout << "f() : from namespace A\n"; }

    void g()
    { cout << "g() : from namespace A\n"; }

    namespace B
    {
        void f()
        { cout << "f() : from namespace B\n"; }

        namespace C
        {
            void f()
            { cout << "f() : from namespace C\n"; }
        }
    }
}

void g()
{
    cout << "g() : from global namespace" << endl;
}

int main()
{
    // 调用全局命名空间中的 g 函数
    g();
    // 调用命名空间 A 中的 f 和 g 函数
    A::f();
    A::g();
    // 调用命名空间 A::B 中的 f 函数
    A::B::f();
    // 调用命名空间 A::B::C 中的 f 函数
    A::B::C::f();
}
```

运行结果：

```text
g() : from global namespace
f() : from namespace A
g() : from namespace A
f() : from namespace B
f() : from namespace C
```

**调用关系。**

- `g()` 不加限定，`main` 位于全局作用域，查找时找到全局的 `g()`，输出 `g() : from global namespace`。
- `A::f()` 和 `A::g()` 用 `A::` 指定命名空间，分别调用 `A` 中的 `f` 和 `g`。`A::g` 和全局 `g` 是两个不同的函数，名字相同但限定名不同。
- `A::B::f()` 调用 `A::B` 中的 `f`；它不会调用 `A::f`，也不会调用更深层的 `A::B::C::f`。限定名写到哪一层，就从哪一层开始查找。
- `A::B::C::f()` 调用最内层 `C` 中的 `f`。三个 `f` 的函数名都叫 `f`，但完整名字分别是 `A::f`、`A::B::f`、`A::B::C::f`，因此可以共存，不会冲突。
- `using namespace std;` 只把 `std` 中的名字引入当前作用域，和 `A`、`B`、`C` 无关；它让 `cout`、`endl` 可以直接写，但不会让 `A`、`B`、`C` 中的 `f` 或 `g` 变成可以直接调用的名字。

这个例子说明了命名空间的两个要点：一是同名实体可以分别放在不同命名空间中，用限定名区分；二是嵌套命名空间的完整名字要逐层写出，`A::B::f` 和 `A::B::C::f` 是不同层次的两个函数。

## 4.8 应用举例

下面先看两个完整程序。例 4.26 把最大公约数和最小公倍数拆成两个函数；例 4.27 把“判断素数”和“反转整数”拆成两个函数，再由主函数枚举 Emirp。两个例子都遵循同一套组织方式：先声明函数，主函数只负责输入、调用和输出，具体计算放在函数定义中。

### 例 4.26　求两个正整数的最大公约数和最小公倍数

**题目。**

求两个正整数的最大公约数和最小公倍数。

**分析。**

最大公约数用辗转相除法。设两个数为 $x_1$ 和 $x_2$，当 $x_2\ne 0$ 时，反复做

$$
\gcd(x_1,x_2)=\gcd(x_2,x_1\bmod x_2)
$$

直到 $x_2=0$，此时的 $x_1$ 就是最大公约数。

这个等式成立的原因：$x_1$ 和 $x_2$ 的任意公因数，也整除 $x_1\bmod x_2$；反过来，$x_2$ 和 $x_1\bmod x_2$ 的任意公因数也整除 $x_1$。两边的公因数集合相同，最大公因数自然相同。

每次迭代都保持 $\gcd(x_1,x_2)$ 不变，而 $x_2$ 严格减小（余数小于除数），所以循环必然终止；终止时 $x_2=0$，$\gcd(x_1,0)=x_1$。

最小公倍数用公式

$$
\operatorname{lcm}(x_1,x_2)=\frac{x_1x_2}{\gcd(x_1,x_2)}
$$

对正整数成立。设 $g=\gcd(x_1,x_2)$，$x_1=ga$，$x_2=gb$，其中 $\gcd(a,b)=1$。$x_1$ 和 $x_2$ 的公倍数必须同时是 $ga$ 和 $gb$ 的倍数；因为 $a$ 与 $b$ 互素，这样的数必须是 $gab$ 的倍数，而 $gab$ 本身就是一个公倍数，所以最小公倍数是 $gab=x_1x_2/g$。

程序把这两个计算分别写成 `gcd` 和 `lcm`。`main` 只负责读入两个整数、调用两个函数并输出结果。两个函数在 `main` 之前先声明，定义放在 `main` 之后，这样 `main` 中的调用点已经知道函数的参数和返回类型。

**代码。**

```cpp
#include <iostream>
using namespace std;

int gcd(int x1, int x2); // 声明求最大公约数的函数
int lcm(int x1, int x2); // 声明求最小公倍数的函数

int main()
{
    int a1, a2;
    cout << "Enter two positive integers: ";
    cin >> a1 >> a2; // 用户输入两个参数
    cout << "The GCD of " << a1 << " and " << a2 << " is " << gcd(a1, a2) << endl; // gcd函数调用
    cout << "The LCM of " << a1 << " and " << a2 << " is " << lcm(a1, a2) << endl; // lcm函数调用
    return 0;
}

int gcd(int x1, int x2) { // 求最大公约数函数定义
    while (x2 != 0) {
        int temp = x2;
        x2 = x1 % x2;
        x1 = temp;
    }
    return x1;
}

int lcm(int x1, int x2) { // 求最小公倍数函数定义
    return (x1 * x2) / gcd(x1, x2);
}
```

**运行结果。**

```text
Enter two positive integers: 15 6
The GCD of 15 and 6 is 3
The LCM of 15 and 6 is 30
```

**`gcd` 的执行过程。** 以 $x_1=15$、$x_2=6$ 为例：

1. 进入循环时 $(x_1,x_2)=(15,6)$。`temp` 保存 6，`x2` 变成 $15\bmod 6=3$，`x1` 变成 6，得到 $(6,3)$。
2. 下一次循环 $(6,3)$。`temp` 保存 3，`x2` 变成 $6\bmod 3=0$，`x1` 变成 3，得到 $(3,0)$。
3. 此时 `x2 == 0`，循环结束，返回 `x1`，即 3。

`temp` 不能省。如果直接写

```cpp
x2 = x1 % x2;
x1 = x2;
```

第一步已经把 `x2` 改成余数，第二步再把 `x1` 赋成这个余数，原来的 `x2` 就丢失了，得到的不是辗转相除的结果。必须先用 `temp` 保存旧的 `x2`，再更新两个变量。

**`lcm` 的计算。** `lcm(15, 6)` 返回 $15\times 6/3=30$。因为 `gcd` 返回的 3 整除 15 和 6，所以这个除法是精确的。

**边界与前提。**

- 题目限定两个正整数。若把范围扩展到 0：`gcd(x, 0)` 会直接返回 `x`，循环不执行；但如果两个数都是 0，`gcd(0, 0)` 返回 0，`lcm` 中的除法就会除以 0。因此 0 必须单独处理，不能直接套用这个 `lcm`。
- 1 与任何正整数 $n$ 的最大公约数是 1，最小公倍数是 $n$；辗转相除和公式都能得到这个结果。
- 两个数相等时，`gcd` 和 `lcm` 都等于这个数；即使这个数是平方数，例如 36 和 36，结果仍是 36，平方数本身不需要特殊分支。
- `lcm` 中先算 `x1 * x2` 可能溢出 `int`。更稳妥的写法是把除法提前：

```cpp
int lcm(int x1, int x2) {
    return x1 / gcd(x1, x2) * x2;
}
```

因为 `gcd(x1, x2)` 一定整除 `x1`，先除后乘不会丢失整数精度，也能减小中间结果溢出的风险。若两个数较大，应把返回类型和中间变量改为 `long long`。上面的代码先乘后除，在 15 和 6 这样的输入下没有问题，但输入接近 `int` 上限时可能溢出。

### 例 4.27　Emirp

**题目。**

Emirp 是英文 prime 拼写的逆序。Emirp 是这样一种素数：将其反转后仍然是素数。例如 17 是素数，71 也是素数，因此 17 和 71 是 emirp 素数。编写程序，输出前 $n$ 个 emirp 素数。

题面用 17 和 71 说明“反转后仍然是素数”。程序中的条件

```cpp
num != reverseInt(num)
```

进一步排除了 11、101 这类反转后等于自身的回文素数。因此本程序输出的 Emirp 是：**反转后仍是素数，且反转数与原数不同**的素数。若不排除回文素数，前几个输出会是 2、3、5、7、11……，与示例从 13 开始不符。

**分析。**

题目需要两个独立功能：

1. **判断素数**：给定整数 $k$，判断它是不是素数。
2. **反转整数**：把整数的十进制数字顺序颠倒，例如 17 变成 71。

这两个功能分别写成 `isPrime` 和 `reverseInt`，主函数从 2 开始逐个检查，满足条件就输出并计数，直到输出了 $n$ 个为止。这样拆分后，每个函数只做一件事，便于单独检查和复用；`main` 只负责枚举和输出。

**代码。**

```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(int k) { // 判断素数
    if (k < 2) return false;
    int bound = sqrt(k);
    for (int i = 2; i <= bound; i++) {
        if (k % i == 0) {
            return false;
        }
    }
    return true;
}

int reverseInt(int n) { // 整数反转函数
    int res = 0;
    while (n) {
        res = res * 10 + n % 10;
        n /= 10;
    }
    return res;
}

int main() {
    int n, cnt = 0;
    cout << "Enter the number of emirps to generate: ";
    cin >> n;
    int num = 2; // 从2开始检查每个数
    while (cnt < n) {
        if (isPrime(num) && isPrime(reverseInt(num)) && num != reverseInt(num)) {
            cout << num << " ";
            cnt++;
        }
        num++;
    }
    cout << endl;
}
```

**运行结果。**

```text
Enter the number of emirps to generate: 5
13 17 31 37 71
```

每个数后面输出一个空格，最后用 `endl` 换行。

**`isPrime` 的上界为什么是 $\sqrt{k}$。** 如果 $k$ 有一个大于 $\sqrt{k}$ 的因数 $d$，那么 $k/d$ 是一个小于 $\sqrt{k}$ 的因数；也就是说，只要 $k$ 不是素数，它在 $2$ 到 $\sqrt{k}$ 之间一定有一个因数。因此循环只需要枚举到 $\lfloor\sqrt{k}\rfloor$，不需要枚举到 $k-1$。

```cpp
int bound = sqrt(k);
for (int i = 2; i <= bound; i++) {
```

这里用 `<=` 而不是 `<`，是为了处理完全平方数。以 $k=49$ 为例，$\sqrt{49}=7$，循环必须检查到 $i=7$，才能发现 $49\bmod 7=0$；如果写成 `i < bound`，就会漏掉 7，把 49 错判成素数。$k=25$、$k=121$ 也是同样的道理。`sqrt(k)` 返回浮点数，赋给 `int` 时会截断小数部分；对非平方数，得到的是 $\lfloor\sqrt{k}\rfloor$，仍然足够。

`k < 2` 的分支处理 0、1 和负数：它们都不是素数，直接返回 `false`。2 和 3 会跳过循环，返回 `true`；4 在 $i=2$ 时被发现整除，返回 `false`。

`sqrt(k)` 返回浮点数，赋给 `int` 时会截断小数部分；对非平方数，得到的是 $\lfloor\sqrt{k}\rfloor$，仍然足够。若担心浮点舍入误差，可以把循环条件写成 `i * i <= k`，完全用整数比较，避免 `sqrt` 的精度问题；此时 `i * i` 要用 `long long` 计算，防止平方本身溢出 `int`。

**`reverseInt` 的反转过程。** 以 17 为例：

1. `res = 0`，`n = 17`。
2. `res = 0 * 10 + 17 % 10 = 7`，`n = 1`。
3. `res = 7 * 10 + 1 % 10 = 71`，`n = 0`。
4. `while (n)` 结束，返回 71。

数字末尾的 0 在反转后会消失。例如 100 反转得到 1，10 反转得到 1。这不是错误：整数的十进制表示本来就不保留前导零。主函数从 2 开始枚举正整数，不会传入负数；如果传入负数，`n % 10` 会是负数，需要另行处理。

**主函数的枚举逻辑。**

- `cnt` 记录已经找到的 Emirp 个数，`num` 是当前检查的数，从 2 开始。
- `while (cnt < n)` 保证找到 $n$ 个就停止；如果 `n` 为 0 或负数，循环一次也不执行，程序在提示语之后只输出一个换行。
- 条件 `isPrime(num) && isPrime(reverseInt(num)) && num != reverseInt(num)` 按从左到右的顺序短路求值：先判断 `num` 本身是不是素数，只有它是素数才计算反序数并判断反序数是不是素数，最后排除回文素数。
- 条件成立时输出 `num` 和一个空格，`cnt++`；无论条件是否成立，`num++` 都在 `if` 外面，表示继续检查下一个整数。
- `reverseInt(num)` 在满足前两个条件的候选数上会被调用两次。可以先用一个变量保存：

```cpp
int rev = reverseInt(num);
if (isPrime(num) && isPrime(rev) && num != rev) {
```

这样只反转一次，含义也更清楚。上面的代码重复调用两次，结果相同，只是多做了一次计算。

**为什么从 13 开始。** 2、3、5、7 都是一位数，反转后还是自身，属于回文素数，被 `num != reverseInt(num)` 排除；11 反转后仍是 11，也被排除。13 是素数，反转得到 31，31 也是素数，且 $13\ne 31$，所以 13 是第一个输出。接下来 17 反转得到 71，31 反转得到 13，37 反转得到 73，71 反转得到 17，正好得到运行结果中的五个数。像 19 反转得到 91，而 $91=7\times 13$ 不是素数，所以不会输出。

**边界与溢出。**

- `n` 应为正整数。`n=0` 时没有输出（只有提示语和一个换行）；`n<0` 时同样没有输出。程序没有对输入做校验，实际使用时应先检查 `n > 0`。
- `isPrime` 已经用 `k < 2` 处理 0 和 1，用 `i <= bound` 处理完全平方数。
- `reverseInt` 中的 `res = res * 10 + n % 10` 可能溢出 `int`。例如一个接近 `int` 上限的数反转后会超过 `INT_MAX`，有符号整数溢出是未定义行为。题目只要求前 $n$ 个较小的 Emirp 时不会遇到，但如果要搜索很大的范围，应把 `res` 改为 `long long`，并相应调整返回类型。
- `num++` 在极端大的搜索范围内也可能溢出 `int`；同样可以改用 `long long`。

递归不只用来计算数列，也能直接描述具有自相似结构的过程：把规模为 $n$ 的问题拆成规模更小的同类问题，直到规模小到可以直接处理。汉诺塔和青蛙跳台阶都是这种思路的典型例子。

> 说明：这段在原课件中提前出现，例号 4.28、4.29 大于后文 4.8 的例 4.26、4.27；其中一页的页内标题把青蛙跳台阶误写成“例4.28”。这里按题面保留原例号：汉诺塔为例 4.28，青蛙跳台阶为例 4.29。

### 例 4.28　汉诺塔问题

有三根柱子 A、B、C 和 $n$ 个大小不同的圆盘。圆盘按大小顺序叠在 A 柱上，大盘在下、小盘在上。目标是把所有圆盘移到 C 柱，移动规则如下：

1. 每次只能移动一个圆盘；
2. 移动时可以借助 B 柱暂时存放圆盘；
3. 任何时刻三根柱子上的圆盘都必须保持大盘在下、小盘在上。

编写程序模拟圆盘的移动过程。

**分析。**

直接考虑每一步怎么走很难，但可以把 $n$ 个盘的移动看成一个整体：最大的盘迟早要从 A 到 C。它移动之前，上面 $n-1$ 个盘必须全部让开，而且不能待在 C（C 要空出来接最大盘），所以只能先全部搬到 B；最大盘落到 C 之后，再把 B 上的 $n-1$ 个盘搬到 C。这样就把 $n$ 个盘的问题拆成两个 $n-1$ 个盘的同类问题，外加最大盘的一步。

具体分三步：

1. 把上面 $n-1$ 个盘从起点搬到中转柱，用终点柱作辅助；
2. 把最大的第 $n$ 个盘从起点搬到终点；
3. 把中转柱上的 $n-1$ 个盘搬到终点，用起点柱作辅助。

当 $n=1$ 时，没有“上面的 $n-1$ 个盘”，直接移动并返回，这就是基本情形。

![汉诺塔的三步递归分解：先搬 n−1 个盘到中转柱，再搬最大盘，最后搬回目标柱](/images/campus-cpp-programming/hanoi-three-steps.svg)

```cpp
#include <iostream>
using namespace std;

void hanoi(int n, char from_rod, char aux_rod, char to_rod);

int main() {
    int n;
    cout << "Enter the number of disks: ";
    cin >> n;  // 用户输入圆盘的数量
    hanoi(n, 'A', 'B', 'C');  // 将 n 个圆盘从 A 柱移动到 C 柱，B 柱作为辅助
}

// hanoi 函数定义：将 n 个圆盘从 from_rod 移动到 to_rod，aux_rod 作为辅助
void hanoi(int n, char from_rod, char aux_rod, char to_rod) {
    if (n == 1) {
        // 如果只有一个圆盘，直接移动到目标柱子
        cout << "Move disk 1 from rod " << from_rod << " to rod " << to_rod << endl;
        return;
    }
    // 将 from_rod 上的上面 n-1 个圆盘移动到 aux_rod，使用 to_rod 作为辅助
    hanoi(n - 1, from_rod, to_rod, aux_rod);
    // 将最大的圆盘移动到 to_rod
    cout << "Move disk " << n << " from rod " << from_rod << " to rod " << to_rod << endl;
    // 将 aux_rod 上的 n-1 个圆盘移动到 to_rod，使用 from_rod 作为辅助
    hanoi(n - 1, aux_rod, from_rod, to_rod);
}
```

输入 3 时的运行结果：

```text
Enter the number of disks: 3
Move disk 1 from rod A to rod C
Move disk 2 from rod A to rod B
Move disk 1 from rod C to rod B
Move disk 3 from rod A to rod C
Move disk 1 from rod B to rod A
Move disk 2 from rod B to rod C
Move disk 1 from rod A to rod C
```

**参数顺序。** 函数头 `hanoi(int n, char from_rod, char aux_rod, char to_rod)` 的参数顺序是“盘数、起点、中转、终点”，不是按柱子名字 A、B、C 固定。`main` 中 `hanoi(n, 'A', 'B', 'C')` 表示从 A 出发、B 作中转、C 为终点。

两次递归的参数位置正好体现“谁给谁让路”：

- 第一次要把 $n-1$ 个盘搬到 B，所以调用 `hanoi(n - 1, from_rod, to_rod, aux_rod)`：原来的终点 `to_rod` 这次当中转，原来的中转 `aux_rod` 这次当终点，两个实参位置互换；
- 第二次要从 B 搬到 C，所以调用 `hanoi(n - 1, aux_rod, from_rod, to_rod)`：原来的中转柱成了起点，原来的起点 `from_rod` 降为辅助。

写错这两处是汉诺塔代码最常见的错误。

**基本情形的边界。** 原代码只把 `n == 1` 当作基本情形。如果输入 0 或负数，`hanoi(0, ...)` 会继续调用 `hanoi(-1, ...)`，永远到不了 `n == 1`，最终栈溢出。实际使用时应在函数开头加 `if (n <= 0) return;`，或在 `main` 中限制 `n >= 1`。上面的代码保留课件原码；输入 3 的运行结果不受影响。

**最少移动次数。** 设 $M(n)$ 为把 $n$ 个盘从一根柱子搬到另一根柱子的最少移动次数。最大盘移动之前，$n-1$ 个盘至少要移动 $M(n-1)$ 次；最大盘本身移动 1 次；之后 $n-1$ 个盘再至少移动 $M(n-1)$ 次。三步递归正好达到这个下界，所以

$$
M(1)=1,\qquad M(n)=2M(n-1)+1\quad(n\ge2)
$$

依次展开或归纳可得

$$
M(n)=2^n-1
$$

归纳验证：$M(1)=1=2^1-1$；若 $M(n-1)=2^{n-1}-1$，则

$$
M(n)=2\left(2^{n-1}-1\right)+1=2^n-1
$$

$n=3$ 时 $M(3)=7$，与上面的 7 行移动输出一致。递归深度只有 $n$ 层，但移动次数随 $n$ 指数增长；传说中 64 个盘需要 $2^{64}-1$ 步，原因就在这里。

### 例 4.29　青蛙跳台阶问题

一只青蛙一次可以跳上 1 个台阶，也可以跳上 2 个台阶，求该青蛙跳上一个 $n$ 级台阶总共有多少种跳法。这个问题也称为青蛙过河问题，课件把它归为动态规划问题；这里先用递归实现。

例如 3 级台阶有 3 种跳法：

```text
1 + 1 + 1
1 + 2
2 + 1
```

**分析：按最后一步分类。** 跳上 $n$ 级台阶的最后一步只有两种可能：

- 最后一步跳 1 级：前面已经到达 $n-1$ 级，这一段有 $f(n-1)$ 种跳法；
- 最后一步跳 2 级：前面已经到达 $n-2$ 级，这一段有 $f(n-2)$ 种跳法。

两类最后一步不同，互不重叠，并且覆盖全部跳法，所以

$$
f(n)=f(n-1)+f(n-2)\quad(n\ge2)
$$

![青蛙跳台阶按最后一步分成两类，分别对应 f(n−1) 和 f(n−2) 种跳法](/images/campus-cpp-programming/frog-last-jump.svg)

**基本情形。** $f(1)=1$ 很直观：只有“跳 1 级”这一种。$f(0)=1$ 表示“原地不跳”这一种空序列，它是为了让 $n=2$ 的递推成立：

$$
f(2)=f(1)+f(0)=1+1=2
$$

2 级台阶实际有 `1+1` 和 `2` 两种跳法，所以 $f(0)$ 必须取 1，不能取 0。代码用 `if (n <= 1) return 1;` 同时处理这两个边界。

题面只允许 1 级或 2 级两种步长，不要套用“一次可以跳 1 到 $n$ 级”的变式；步长和计数初值一变，递推式和答案都会变。

```cpp
#include <iostream>
using namespace std;

int frogJump(int n);  // 函数声明

int main() {
    int n;
    cout << "Enter the number of steps: ";
    cin >> n;  // 用户输入台阶数
    cout << "Total number of ways to jump " << n << " steps is: "
         << frogJump(n) << endl;
}

int frogJump(int n) {  // 递归函数定义：计算青蛙跳 n 个台阶的跳法数量
    if (n <= 1) {      // 如果只有 0 个或 1 个台阶，只有一种跳法
        return 1;
    }
    // 递归计算跳 n-1 个台阶和跳 n-2 个台阶的跳法数量
    // 因为青蛙可以从 n-1 个台阶跳 1 个台阶上来，或者从 n-2 个台阶跳 2 个台阶上来
    return frogJump(n - 1) + frogJump(n - 2);
}
```

输入 5 时的运行结果：

```text
Enter the number of steps: 5
Total number of ways to jump 5 steps is: 8
```

计算过程：

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| $f(n)$ | 1 | 1 | 2 | 3 | 5 | 8 |

$f(2)=2$，$f(3)=3$，$f(4)=5$，$f(5)=8$。这个数列从 $f(0)$ 开始是 1、1、2、3、5、8，与 Fibonacci 数列形状相同，但初值不同，不能直接套用 `fib` 的 $0,1$ 开头。

与 Fibonacci 一样，这个递归会重复计算子问题；$n$ 较大时可改用记忆化或自底向上递推。`main` 省略了 `return 0;`，C++ 标准规定 `main` 执行到末尾等价于返回 0。

### 主观题：Hermit 多项式的递归计算

题目给出下面的程序：

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

double Hermit(double x, int n);

int main()
{
    int n = 3;
    double x = 2.0;
    cout << "Hermit(" << fixed << setprecision(1) << x << "," << n << ")="
         << Hermit(x, n);
}

double Hermit(double x, int n)
{
    if (n == 0)
        return 1;
    else
        if (n == 1)
            return 2 * x;
        else
            return 2 * x * Hermit(x, n - 1) - 2 * (n - 1) * Hermit(x, n - 2);
}
```

**解析。**

程序用三项递推计算 Hermite 多项式：

$$
H_0(x)=1,\qquad H_1(x)=2x,\qquad H_n(x)=2xH_{n-1}(x)-2(n-1)H_{n-2}(x)\quad(n\ge2)
$$

代码把 $H_0$、$H_1$ 作为两个基本情形，$n\ge2$ 时做两项递归。取 $x=2$、$n=3$：

$$
H_2(2)=2\cdot2\cdot H_1(2)-2\cdot1\cdot H_0(2)=4\cdot4-2=14
$$

$$
H_3(2)=2\cdot2\cdot H_2(2)-2\cdot2\cdot H_1(2)=4\cdot14-4\cdot4=56-16=40
$$

`main` 中 `fixed << setprecision(1)` 让 $x$ 和结果都按一位小数输出，运行结果为：

```text
Hermit(2.0,3)=40.0
```

`setprecision` 需要包含 `<iomanip>`，程序中已经包含。函数名 `Hermit` 是课件的写法，标准名称是 Hermite 多项式；名字不影响递推关系。

### 主观题：递归打印图形

```cpp
#include <iostream>
using namespace std;

void print(int x, int y, char ch)
{
    int i;
    if (x)
    {
        for (i = 0; i < y; i++)
            cout << " ";
        for (i = 0; i < 2 * x - 1; i++)
            cout << ch;
        cout << endl;
        print(x - 1, y + 1, ch);
    }
}

int main()
{
    print(3, 0, '*');
}
```

**解析。**

`if (x)` 等价于 `if (x != 0)`，是递归的终止条件。每层先输出 `y` 个空格，再输出 $2x-1$ 个字符，然后换行，最后以 `x - 1`、`y + 1` 递归。因为打印都在递归调用之前完成，递归返回后不再打印，所以图形从上到下递减。

`print(3, 0, '*')` 的三行：

- $x=3,\ y=0$：0 个空格，5 个星；
- $x=2,\ y=1$：1 个空格，3 个星；
- $x=1,\ y=2$：2 个空格，1 个星；
- $x=0$：`if (x)` 为假，返回。

运行结果为：

```text
*****
 ***
  *
```


## 课堂小结

本章围绕“把程序拆成函数”展开。函数是 C++ 的编程模块：使用一个函数，需要提供定义、原型（声明）和调用。定义实现函数的功能，原型描述函数的接口，调用把实参传给形参并执行函数体。

C++ 默认按值传递。形参是实参的副本，函数体对形参的访问和修改都作用在副本上，因此不会破坏实参的完整性；如果希望函数修改调用者的变量，需要另外使用引用或指针。函数可以调用库函数和自定义函数，自定义函数可以嵌套调用；函数直接或间接调用自身就是递归。递归必须有终止条件，并保证每次递归都向终止条件推进。

内联函数用于减少小函数的调用开销；重载函数是名字相同、参数列表不同、实现版本不同的函数。仅返回类型不同、参数列表相同，不能构成重载。

C++ 程序可以由多个源文件组成。头文件放声明、宏和类型定义，源文件放函数定义；普通函数的定义在整个程序中只能有一份，声明可以重复。头文件保护宏或 `#pragma once` 用来防止同一个头文件被重复展开。标识符有存储特性、作用域和链接性；局部变量、静态局部变量、全局变量的生命周期不同。结构良好的程序应遵循最低权限原则，尽量不使用全局变量。

预处理指令在编译之前处理文本：`#include` 包含文件，`#define`/`#undef` 定义和取消宏，条件编译按宏或常量表达式选择代码，`#pragma` 向编译器发出实现相关指令，`#error` 在编译期报错。宏只是文本替换，参数和整个替换体都要加括号，并注意实参的副作用；能用 `const` 和内联函数时优先使用它们。

命名空间把名字分组，避免命名冲突。`std` 是标准命名空间；访问其中的名字可以直接写 `std::cin`，用 using 声明引入单个名字，或用 using 指令引入整个命名空间。`using` 只影响名字查找，不改变实体的定义归属和链接性。命名空间可以嵌套、可以重新打开，同名的命名空间会合并。

本章的易错点主要有：把函数声明当成定义，或把函数定义放进头文件导致重复定义；以为值传递能修改实参；递归缺少终止条件或不向终止条件推进；重载只改返回类型；宏参数不加括号；在头文件中写 `using namespace ...;`；把 `using` 当成“把名字搬到当前命名空间”。
