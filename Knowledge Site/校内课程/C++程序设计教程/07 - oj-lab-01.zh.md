---
slug: "07-oj-lab-01"
title: "第一次线下实验（条件分支、分类与计费）"
summary: "用条件分支处理分类、计费、时间差与方程求根。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "02"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/1qm6T_UGDMynjY6lCzuw0XcwSBqxGOQVP"
---

**来源**　课后作业

ddl 26.10.11 ｜ A–H 共 8 题

题意按 `0catalog` 的题名与本地 `.cpp` 还原；题面没有给出、又会影响提交的部分在每题末尾标为 **待确认**。

## A

<!-- homework-topic: 判断三角形类型 -->

> **题目**　**判断三角形类型**
>
> 多组输入，每行三个实数 `a b c`，读到文件结束。每组输出一行类别：
>
> `Not a triangle` / `Equilateral triangle` / `Isosceles triangle` / `Right triangle` / `Scalene triangle`。
>
> `3 4 5` 输出 `Right triangle`，`1 2 3` 输出 `Not a triangle`。

**思路**　先用三角形不等式排除退化情形，再按优先级分类。等边也满足等腰条件，所以等边必须先判。

**关键步骤**

- `a+b<=c || a+c<=b || b+c<=a` 一条语句排掉共线与退化，三种配对都要写，因为输入不保证 `c` 最大。
- 分类用 `else if` 链，保证每组只输出一个类别。
- 直角判定要枚举「谁是斜边」三种情况，同样是因为边长无序。
- 等腰分支写成 `a==b&&c!=a || a==c&&b!=a || b==c&&a!=b`，三组都把「恰好两边相等」写全，避免与等边重叠。

**补充要点**　等腰直角三角形的类别在本程序的输出集合里没有位置：`isosceles` 分支排在 `right` 之前，只要两边相等就永远进不到直角分支。若题面要求单独输出 `Isosceles right triangle`，必须把它排在 `isosceles` 之前。

**补充要点（浮点比较）**　`==` 要求计算结果精确相等。把 `sqrt(5)` 近似成 `2.23606798` 时，`1 2 2.23606798` 会被原程序判成 `Scalene triangle`。若题目把这样的近似输入视为直角三角形，比较平方和时应按题目规定的精度留出容差。先排序也可以把斜边判定缩减为一次比较。

**待确认**　等腰直角三角形的期望输出，以及直角判定的容差。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    double a,b,c;
    while (cin>>a>>b>>c) {

    if (a+b<=c||a+c<=b||b+c<=a) {
        cout<<"Not a triangle"<<endl;
    } else if (a==b&&b==c) {
            cout<<"Equilateral triangle"<<endl;
            } else if (a==b&&c!=a||a==c&&b!=a||b==c&&a!=b) {
                cout<<"Isosceles triangle"<<endl;
                } else if (a*a+b*b==c*c||a*a+c*c==b*b||b*b+c*c==a*a) {
                        cout<<"Right triangle"<<endl;
                        } else
                        cout<<"Scalene triangle"<<endl;
    }
    return 0;

}

/*
#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

// 浮点数近似相等
bool almostEqual(double x, double y) {
    return fabs(x - y) < 1e-9;
}

int main() {
    double a, b, c;
    while (cin >> a >> b >> c) {
        // 边长必须为正数
        if (a <= 0 || b <= 0 || c <= 0) {
            cout << "Not a triangle" << endl;
            continue;
        }

        // 三角形不等式：任意两边之和大于第三边
        if (a + b <= c || a + c <= b || b + c <= a) {
            cout << "Not a triangle" << endl;
            continue;
        }

        // 排序，使 x <= y <= z
        double x = a, y = b, z = c;
        if (x > y) swap(x, y);
        if (y > z) swap(y, z);
        if (x > y) swap(x, y);

        bool equilateral = almostEqual(x, y) && almostEqual(y, z);
        bool isosceles   = almostEqual(x, y) || almostEqual(y, z) || almostEqual(x, z);
        bool right       = almostEqual(x * x + y * y, z * z);

        if (equilateral) {
            cout << "Equilateral triangle" << endl;
        } else if (isosceles && right) {
            cout << "Isosceles right triangle" << endl;
        } else if (isosceles) {
            cout << "Isosceles triangle" << endl;
        } else if (right) {
            cout << "Right triangle" << endl;
        } else {
            cout << "Scalene triangle" << endl;
        }
    }
    return 0;
}
*/
```

[查看原始 A.cpp](https://drive.google.com/file/d/1xhXB_U8EToV72yaFiY4QnFkLTfWCji6P/view?usp=drivesdk)

## B

<!-- homework-topic: 24 小时制时间差计算器 -->

> **题目**　**24 小时制时间差计算器**
>
> 多组输入，每行 `h1 m1 h2 m2`，输出 `Duration: X hours Y minutes`。
>
> 结束时刻早于开始时刻时视为跨过午夜。`10 30 12 10` 输出 `Duration: 1 hours 40 minutes`，`23 50 0 10` 输出 `Duration: 0 hours 20 minutes`。

**思路**　时和分不能各自相减，分钟不够减时要向小时借 1。按「是否跨小时」和「分钟是否够减」两两组合枚举，是这类入门题最不容易漏项的做法。

**关键步骤**　代码分五种情况：

- 同行内且分钟够减（`h1<=h2 && m1<=m2`）：直接相减。
- 后者小时更大但分钟不够（`h1<h2 && m1>m2`）：小时差减 1，分钟用 `60-m1+m2`。
- 跨午夜且分钟不够（`h1>h2 && m1>m2`）：小时取 `23-h1+h2`，借位已经在常数 23 里抵消。
- 跨午夜但分钟够（`h1>h2 && m1<=m2`）：小时取 `24-h1+h2`。
- 同一小时且分钟不够（`h1==h2 && m1>m2`）：等价于跨午夜，小时为 `23`。

**易错点**　第二种情况的 `X=h2-h1-1` 最容易漏写这个减 1；第五种情况 `h1==h2 && m1>m2` 既不满足 `h1<h2`，也不满足 `m1<=m2`，前四个分支一个都接不住，必须单独列，否则这一组会带着上一组的 `X`、`Y` 输出。

**边界**　起止相同落入第一个分支，输出 `0 hours 0 minutes`。`X`、`Y` 在每组都会被某个分支赋值，不会读到上一组的残留值。

**补充解法**　把两个时刻都换成距零点的分钟数，差值对一天取模，五种分支压成一行：

```cpp
#include <iostream>
using namespace std;

int main() {
    int h1, m1, h2, m2;
    while (cin >> h1 >> m1 >> h2 >> m2) {
        int start = 60 * h1 + m1;
        int end   = 60 * h2 + m2;
        int minutes = (end - start + 24 * 60) % (24 * 60);
        cout << "Duration: " << minutes / 60 << " hours " << minutes % 60 << " minutes\n";
    }
}
```

跨午夜自然由 `+24*60` 与取模处理，`O(1)`。

**待确认**　题干未给出时、分的取值范围；程序不校验 `m1`、`m2` 是否在 `0–59` 内。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int h1,m1,h2,m2,X,Y;
    while (cin>>h1>>m1>>h2>>m2) {
        if (h1<h2&&m1>m2) {
            X=h2-h1-1;
            Y=(60-m1)+m2;
        } else if (h1<=h2&&m1<=m2) {
            X=h2-h1;
            Y=m2-m1;
        } else if (h1>h2&&m1>m2) {
            X=23-h1+h2;
            Y=60-m1+m2;
        } else if (h1>h2&&m1<=m2) {
            X=24-h1+h2;
            Y=m2-m1;
        } else  if (h1==h2&&m1>m2) {
            X=23;
            Y=60-m1+m2;
        }

        cout<<"Duration: "<<X<<" hours "<<Y<<" minutes"<<endl;
    }
    return 0;
}


/*
#include <iostream>
using namespace std;

int main() {
    int startHour, startMinute;
    int endHour, endMinute;

    cout << "请输入起始时间的时和分：";
    cin >> startHour >> startMinute;

    cout << "请输入结束时间的时和分：";
    cin >> endHour >> endMinute;

    // 转换为从 00:00 开始的总分钟数
    int startTotal = startHour * 60 + startMinute;
    int endTotal = endHour * 60 + endMinute;

    // 如果结束时间早于开始时间，说明跨越了午夜，加 24 小时
    if (endTotal < startTotal) {
        endTotal += 24 * 60;
    }

    int diff = endTotal - startTotal;

    int hours = diff / 60;
    int minutes = diff % 60;

    cout << hours << " hours " << minutes << " minutes" << endl;

    return 0;
}
*/
```

[查看原始 B.cpp](https://drive.google.com/file/d/1F-3jm_Qeq71sVPVmb9cltSNzFlmoWFEp/view?usp=drivesdk)

## C

<!-- homework-topic: BMI 指数分类器 -->

> **题目**　**BMI 指数分类器**
>
> 首行组数 `n`，随后 `n` 行，每行 `w h`（体重在前，身高在后）。
>
> 每组输出 `<bmi> <分类>`，`bmi` 保留两位小数，分类取自 `Underweight` / `Normal weight` / `Overweight` / `Obesity`。
>
> `60 1.7` 输出 `20.76 Normal weight`。

**思路**　`bmi = w / (h * h)`。原程序依次用 18.5、24、28 做严格小于比较，恰好等于阈值时进入下一档。例如 `18.5` 属于 `Normal weight`，`24` 属于 `Overweight`。

**关键步骤**　`fixed << setprecision(2)` 只影响后面的输出格式，不改 `bmi` 的值，所以比较必须用原始 `bmi`：若拿四舍五入后的显示值去比，`23.999` 会显示成 `24.00` 并被判成 `Overweight`，与真实分类不符。

**边界**　公式需要正身高。若允许无效输入，先检查身高，再做除法与分类。

**待确认**　阈值取自哪套标准，以及 `w`、`h` 的单位（kg 与 m 还是 cm）。

**原始代码**

```cpp
#include <iostream>
using namespace std;
#include <iomanip>

int main() {
   int n;
   cin>>n;

   while (n--) {
    double h,w,bmi;
    cin>>w>>h;
    bmi=w/(h*h);

    cout<<fixed<<setprecision(2)<<bmi<<" ";

    if (bmi<18.5) {
        cout<<"Underweight"<<endl;
    } else if (bmi<24) {
        cout<<"Normal weight"<<endl;
    } else if (bmi<28) {
        cout<<"Overweight"<<endl;
    } else
    cout<<"Obesity"<<endl;
   }

   return 0;
}
```

[查看原始 C.cpp](https://drive.google.com/file/d/1z2CatdyVO3TTAOBTTHrTEsniAHgWu8aQ/view?usp=drivesdk)

## D

<!-- homework-topic: 检查字符类型 -->

> **题目**　**检查字符类型**
>
> 逐个读入字符直到文件结束，每个字符输出一行类别：`Lowercase letter` / `Uppercase letter` / `Number` / `Other character`。换行符不输出。
>
> 输入 `aA1 ?`（行内有一个空格）输出五行，其中空格和 `?` 都是 `Other character`。

**思路**　按 ASCII 区间判断：97–122 小写、65–90 大写、48–57 数字，其余归 `Other character`。这些区间等价于 `'a'..'z'`、`'A'..'Z'`、`'0'..'9'` 字符字面量。

**关键步骤**　`cin.get(ch)` 连空格、换行都能取到，`cin >> ch` 会跳过空白，判空格和标点必须用前者；`\n` 要 `continue` 掉，否则每行结束都会多打一行 `Other character`。

**边界**　行内空格也各输出一行，所以「读到 EOF」与题面若规定的「每行一个字符」在有多余空白时输出条数不同。

**待确认**　题面是否先给字符个数 `n`；若给，用 `while (n--)` 读 `n` 个更贴合。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    char ch;
    while (cin.get(ch)) {
        if (ch=='\n') continue;

        if (ch>=97&&ch<=122) {
            cout<<"Lowercase letter"<<endl;
        } else if (ch>=65&&ch<=90) {
            cout<<"Uppercase letter"<<endl;
        } else if (ch>=48&&ch<=57) {
            cout<<"Number"<<endl;
        } else
        cout<<"Other character"<<endl;
    }
    return 0;
}


/*
#include <iostream>
using namespace std;

int main() {
    char ch;
    while (cin.get(ch)) {
        if (ch == '\n') continue;  // 跳过换行符

        if (ch >= 'a' && ch <= 'z') {
            cout << "Lowercase letter" << endl;
        } else if (ch >= 'A' && ch <= 'Z') {
            cout << "Uppercase letter" << endl;
        } else if (ch >= '0' && ch <= '9') {
            cout << "Number" << endl;
        } else {
            cout << "Other character" << endl;
        }
    }
    return 0;
}
*/
```

[查看原始 D.cpp](https://drive.google.com/file/d/1r7pL1rrfp2N1c_nAdwchvRUKQM3UpCOr/view?usp=drivesdk)

## E

<!-- homework-topic: 包裹计费 -->

> **题目**　**包裹计费**
>
> 多组输入，每行 `weight zone`，`zone` 为 `A` 或 `B`。输出 `Total shipping fee is N`；地区不是 A、B 时输出 `Invalid zone`。
>
> 重量按整公斤向上取整后计费。`2.1 A` 输出 `Total shipping fee is 16`，`5 B` 输出 `Total shipping fee is 35`。

**思路**　`ceil(weight)` 把 2.1 kg 按 3 kg 计费。A 区 1 kg 收 10 元、每多 1 kg 加 3 元；B 区 1 kg 收 15 元、每多 1 kg 加 5 元。两条公式分别是 `10+3*(w-1)` 和 `15+5*(w-1)`。

**关键步骤**　四个合法分支与一个兜底分支构成完整分类：`w==1` 与 `w>1` 分开写，是因为公式里的 `(w-1)` 在 `w==1` 时为 0，本来可以直接合并成一条，但分开写更贴近「首重、续重」的说法。兜底 `else` 同时接住非法地区和不合法的重量。

**缺陷**　`w==0`（重量为 0 或负数取整后为 0）不会进入任何合法分支，会输出 `Invalid zone`——把计费错误报成了地区错误。实测 `0 A` 得到 `Invalid zone`。若题面保证重量为正，这条只是分类不精确；否则要先单独处理重量。

**待确认**　首重是否为 1 kg、续重单价与「向上取整」是否与题面一致；重量非正时的期望输出。

**原始代码**

```cpp
#include <iostream>
using namespace std;
#include <cmath>

int main() {
    char ch;
    double weight;
    while (cin>>weight>>ch) {
    int w=ceil(weight);


        if (ch=='A'&&w==1) {
       cout<<"Total shipping fee is "<<10<<endl;
        } else if (ch=='A'&&w>1) {
        cout<<"Total shipping fee is "<<(10+3*(w-1))<<endl;
        } else if (ch=='B'&&w==1) {
        cout<<"Total shipping fee is "<<15<<endl;
        } else if (ch=='B'&&w>1) {
        cout<<"Total shipping fee is "<<(15+5*(w-1))<<endl;
        } else
        cout<<"Invalid zone"<<endl;
    }
    return 0;
}
```

[查看原始 E.cpp](https://drive.google.com/file/d/1OZdhEwhW5gR4ZC19Ibm8m1tSFtEC_fAI/view?usp=drivesdk)

## F

<!-- homework-topic: 电影票价 -->

> **题目**　**电影票价**
>
> 读入年龄与节假日标记，`Y` 表示节假日。基础票价 60 元，节假日加 20 元，12 岁以下半价，65 岁及以上七折。
>
> 输出 `The ticket price is X`，`X` 保留一位小数。`10 Y` 输出 `The ticket price is 40.0`。

**思路**　先按节假日加价，再乘年龄系数。

**关键步骤**　加价与折扣的先后顺序直接决定结果：代码先 `+20` 再乘系数，节假日儿童票是 `(60+20)*0.5 = 40.0`，而不是 `60*0.5+20 = 50.0`。`age<12` 与 `age>=65` 互斥，用 `else if` 即可。

**边界**　`age=12` 与 `age=64` 都无折扣；`age=65` 走七折。年龄为负时同样落进 `age<12` 半价分支。

**补充解法**　若评测是多组数据，把读入改成 `while (cin >> age >> ch)`，把 `price` 的定义挪进循环体——`price += 20` 是累加，放在循环外会跨组叠加：

```cpp
#include <iomanip>
#include <iostream>

int main() {
    int age;
    char holiday;
    while (std::cin >> age >> holiday) {
        double price = 60.0;
        if (holiday == 'Y') price += 20.0;
        if (age < 12)       price *= 0.5;
        else if (age >= 65) price *= 0.7;
        std::cout << std::fixed << std::setprecision(1)
                  << "The ticket price is " << price << '\n';
    }
}
```

**待确认**　评测是否多组输入；当前主版本只读一组（实测送入三组只输出一行）。

**原始代码**

```cpp
#include <iostream>
using namespace std;
#include <iomanip>

int main() {
    int age;
    double price=60;
    char ch;
    cin>>age>>ch;

        if (ch=='Y') {
        price+=20;
        }

        if (age<12) {
        price*=0.5;
        } else if (age>=65) {
        price*=0.7;
        }
    cout<<"The ticket price is "<<fixed<<setprecision(1)<<price<<endl;

    return 0;
}

/*
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int age;
    char holiday;

    while (cin >> age >> holiday) {
        double price = 60.0;

        if (holiday == 'Y') {
            price += 20.0;
        }

        if (age < 12) {
            price *= 0.5;
        } else if (age >= 65) {
            price *= 0.7;
        }

        cout << fixed << setprecision(1)
             << "The ticket price is " << price << endl;
    }

    return 0;
}
*/
```

[查看原始 F.cpp](https://drive.google.com/file/d/1HveTGlyh5lgK9BSreN2pQEnTHFGmLUcV/view?usp=drivesdk)

## G

<!-- homework-topic: 自动售货机 -->

> **题目**　**自动售货机**
>
> 读入商品编号与投币金额：`A` 3 元、`B` 5 元、`C` 2 元。
>
> 成交输出 `Purchase successful.Your change is N yuan.`；金额不足输出 `Insufficient funds.You are short by N yuan.`；编号非法输出 `Invalid item code.`。
>
> `A 3` 输出 `Purchase successful.Your change is 0 yuan.`

**思路**　先按编号确定价格，再与投币金额比较，两种情况各算一次差值。

**缺陷（重复）**　三个商品分支各自重复了一遍「比较 + 输出找零或差额」，只有价格不同。改法是先查价、非法编号直接跳过，再用统一的比较代码——注释版就是这么写的。

**易错点**　成交句在句号后**没有空格**（`successful.Your`、`funds.You`），注释版却写成 `successful. Your`。OJ 按字符比对，这一处空格足以全错，必须照题面样例定。

**边界**　投币恰好等于价格时差额为 0，走成交分支；编号大小写敏感，`a` 会被判非法。

**待确认**　句号后是否带空格；是否多组输入（主版本只读一组）；金额为负或非整数时的期望输出。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    char ch;
    int n;
    cin>>ch>>n;

    if (ch=='A') {
        if (n>=3) {
            cout<<"Purchase successful.Your change is "<<(n-3)<<" yuan."<<endl;
        }
            else
            cout<<"Insufficient funds.You are short by "<<(3-n)<<" yuan."<<endl;

    }

    if (ch=='B') {
        int a=5;
        if (n>=5) {
            cout<<"Purchase successful.Your change is "<<(n-5)<<" yuan."<<endl;
        }
            else
            cout<<"Insufficient funds.You are short by "<<(5-n)<<" yuan."<<endl;

    }

    if (ch=='C') {
        int a=2;
        if (n>=2) {
            cout<<"Purchase successful.Your change is "<<(n-2)<<" yuan."<<endl;
        }
            else
            cout<<"Insufficient funds.You are short by "<<(2-n)<<" yuan."<<endl;

    }

    if (ch!='A'&&ch!='B'&&ch!='C') {
        cout<<"Invalid item code."<<endl;
    }

    return 0;
}

/*
#include <iostream>
using namespace std;

int main() {
    char code;
    int money;

    // 如果题目有多组测试数据，使用 while 循环；如果只有一组，也可以正常执行
    while (cin >> code >> money) {
        int price = 0;

        if (code == 'A') {
            price = 3;   // 可乐
        } else if (code == 'B') {
            price = 5;   // 薯片
        } else if (code == 'C') {
            price = 2;   // 矿泉水
        } else {
            cout << "Invalid item code." << endl;
            continue;
        }

        if (money >= price) {
            cout << "Purchase successful. Your change is "
                 << money - price << " yuan." << endl;
        } else {
            cout << "Insufficient funds. You are short by "
                 << price - money << " yuan." << endl;
        }
    }

    return 0;
}
*/
```

[查看原始 G.cpp](https://drive.google.com/file/d/1vGiEpKTDOIPMlS95HCcVAaSvZhLqgZHL/view?usp=drivesdk)

## H

<!-- homework-topic: 一元二次方程实数根求解器 -->

> **题目**　**一元二次方程实数根求解器**
>
> 多组输入，每行 `a b c`，输出方程根的情况，数值保留两位小数：
>
> `Two distinct real roots: x1 = … , x2 = …` / `One real root: x = …` / `No real roots` / `Linear equation, one root:x= …` / `Infinite solutions` / `No solution`。
>
> `1 -3 2` 输出 `Two distinct real roots: x1 = 1.00, x2 = 2.00`。

**思路**　`a==0` 退化为一元一次；否则按判别式 `d=b*b-4*a*c` 分 `>0`、`==0`、`<0` 三种。

**关键步骤**　必须先判 `a`，否则 `2*a` 会除零。`fixed<<setprecision(2)` 放在循环外只设置一次，之后所有输出都按两位小数。`x1` 取减号、`x2` 取加号，`a>0` 时自然满足 `x1<=x2`。

**逻辑错误**　`a == 0 && b == 0` 时方程是 `0 = -c`：`c == 0` 有无穷多解，`c != 0` 无解。主版本把这两条输出写反了。实测 `0 0 0` 输出 `No solution`、`0 0 1` 输出 `Infinite solutions`，都与正确结论相反。注释版已经改正。

**边界**

- `a<0` 时分母为负，按公式写出的 `x1` 反而比 `x2` 大。实测 `-1 3 -2` 输出 `x1 = 2.00, x2 = 1.00`。若题面要求递增输出，输出前交换即可。
- `b*b-4*a*c` 恰好为 0 的概率很低，构造的重根（如 `1 2 1`）能进 `d==0` 分支；题目给的重根数据若用小数近似，判等会失效。注释版改用容差。
- 文件里定义了 `fixZero` 却没有调用。`1 0 0` 的两个根都是 `-0.0`，实测输出 `One real root: x = -0.00`。要避免就先归零再打印。

**待确认**　一元一次分支的输出格式（`one root:x= ` 冒号后无空格、等号前有空格，与其余分支的 `x = ` 不一致）；`a<0` 时是否要求 `x1 < x2`。

**原始代码**

```cpp
#include <iostream>
using namespace std;
#include <cmath>
#include <iomanip>

// 将 -0.0 统一转为 +0.0
double fixZero(double x) {
    if (x == 0.0) return 0.0;
    return x;
}

int main() {
    double a,b,c,d,x1,x2;

    cout<<fixed<<setprecision(2);

    while (cin>>a>>b>>c) {
        if (a==0&&b!=0) {
            cout<<"Linear equation, one root:x= "<<(-c/b)<<endl;
        } else if (a==0&&b==0) {
            if (c!=0) {
                cout<<"Infinite solutions"<<endl;
            } else
            cout<<"No solution" <<endl;
        } else {
            d=b*b-4*a*c;
            if (d>0) {
                x1=(-b-sqrt(d))/(2*a);
                x2=(-b+sqrt(d))/(2*a);
                cout<<"Two distinct real roots: x1 = "<<x1<<", x2 = "<<x2<<endl;
            } else if (d==0) {
                cout<<"One real root: x = "<<-b/(2*a)<<endl;
            } else
                cout<<"No real roots"<<endl;
        }
    }
    return 0;
}

/*
#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

// 辅助函数：输出数值，保留两位小数，并处理 -0.00 的情况
void printNum(double x) {
    if (fabs(x) < 1e-9) x = 0.0;  // 将极接近 0 的数归零，避免输出 -0.00
    cout << fixed << setprecision(2) << x;
}

int main() {
    double a, b, c;
    const double EPS = 1e-9;  // 用于浮点数比较的极小值

    while (cin >> a >> b >> c) {
        // 处理 a == 0 的情况（一元一次方程或退化情况）
        if (fabs(a) < EPS) {
            if (fabs(b) < EPS) {
                // a == 0 且 b == 0
                if (fabs(c) < EPS) {
                    cout << "Infinite solutions" << endl;
                } else {
                    cout << "No solution" << endl;
                }
            } else {
                // a == 0 且 b != 0，一元一次方程
                double x = -c / b;
                cout << "Linear equation, one root: x = ";
                printNum(x);
                cout << endl;
            }
        } else {
            // a != 0，一元二次方程
            double delta = b * b - 4 * a * c;

            if (delta > EPS) {
                // 两个不相等的实数根
                double x1 = (-b - sqrt(delta)) / (2 * a);
                double x2 = (-b + sqrt(delta)) / (2 * a);
                if (x1 > x2) swap(x1, x2);  // 确保 x1 是较小的根
                cout << "Two distinct real roots: x1 = ";
                printNum(x1);
                cout << ", x2 = ";
                printNum(x2);
                cout << endl;
            } else if (fabs(delta) < EPS) {
                // 两个相等的实数根
                double x = -b / (2 * a);
                cout << "One real root: x = ";
                printNum(x);
                cout << endl;
            } else {
                // 没有实数根
                cout << "No real roots" << endl;
            }
        }
    }

    return 0;
}
*/
```

[查看原始 H.cpp](https://drive.google.com/file/d/1eh8bFxQjkIQvBwNrZT-SIKRpc6X_x8IY/view?usp=drivesdk)

## 方法小结

八道题都是「先分类、再计算」，可迁移的写法有三条：

- **分类要写全，兜底要有归属**：三角形先排退化再分档，包裹计费把非法地区留给最后的 `else`。分支之间要么互斥，要么顺序保证不会同时命中。
- **输出格式是题面的一部分**：句号后有没有空格、冒号前后怎么排、保留几位小数，都要按样例逐字符核对，不能只看数值对不对。
- **浮点比较不能直接用 `==`**：直角判定、判别式、重根都属于这一类，先想清楚容差，或者干脆把输入当整数构造。
