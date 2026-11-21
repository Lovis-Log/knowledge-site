---
slug: "07-oj-lab-01"
title: "第一次线下实验"
summary: "用条件分支处理分类、计费、时间差与方程求根。"
updatedAt: "2026-11-18"
content_type: "reference"
group: "homework"
displayNumber: "02"
---

**来源**　课后作业

## A

<!-- homework-topic: 判断三角形类型 -->

**判断三角形类型**

题意：读入三边长，先判断能否构成三角形，再给出类型（等边 / 等腰 / 直角 / 不等边）。
输入输出：多组，每行三个实数 `a b c`，读到文件结束；每组输出一行英文类别，构不成三角形时输出 `Not a triangle`。

先用三角形不等式排除退化情形，再按题目要求的优先级分类。等边也满足等腰条件，所以先判等边。直角与等腰可以同时成立，需由题面决定输出哪一类。

实现要点：
- `a+b<=c || a+c<=b || b+c<=a` 一条语句排掉共线与负数边长。
- 分类用 else-if 链，保证每组只输出一个类别。
- 直角判定要枚举三种"谁是斜边"，因为输入不保证 `c` 最大。

正确性与边界：
- 等边必须 `a==b && b==c`；`a==b || b==c || a==c` 只是等腰。
- **待确认**：如果题面要求单独输出 `Isosceles right triangle`，当前的 else-if 顺序会把等腰直角三角形判成 `Isosceles triangle`——`isosceles` 分支在 `right` 之前，直角分支永远轮不到它。文件末尾注释版按 `equilateral → isosceles&&right → isosceles → right` 的顺序补了这一类，但输出集合与提交版不同，需以题面为准。
- **待确认**：`==` 对 `double` 是精确比较。`3 4 5` 这类整数边可靠；`1 1 1.41421356` 这种构造出来的直角边会因 `a*a+b*b` 与 `c*c` 差在末位而判错。注释版换成 `fabs(x-y)<1e-9`，阈值取多大取决于题面的精度约定。

**原始代码**

```cpp
//判断三角形类型

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

## B

<!-- homework-topic: 24 小时制时间差计算器 -->

**24 小时制时间差计算器**

题意：给出起始与结束的时、分，求经过的时间；结束早于开始时视为跨过午夜。
输入输出：多组，每行 `h1 m1 h2 m2`；输出 `Duration: X hours Y minutes`。

如何想到：时和分不能各自相减，分钟不够减时要向小时借 1。按"是否跨小时"和"分钟是否够减"两两组合枚举，是这类入门题最不容易漏项的做法。

代码区分五种情况。结束小时更晚时按分钟是否够减来借位，结束小时更早时先计入跨午夜的 24 小时。同一小时且结束分钟更早时也视为跨午夜，小时部分在借位后为 `23`。

正确性与边界：
- 起止相同会落入 `h1<=h2 && m1<=m2`，得 `0 hours 0 minutes`。
- 分钟不够时 `X=h2-h1-1`，这一处最容易写成 `h2-h1`；跨午夜版 `23-h1+h2` 已抵消借位。
- 更稳的等价写法：换成当天总分钟数，若结束早于开始就加 `24*60`，再相减取商和余（注释版）。分支更少，适合做替换。

**原始代码**

```cpp
//24小时制时间差计算器

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

**优化版**　把两个时刻都换成距零点的分钟数。算出差值后，若为负数就加一天。

```cpp
#include <iostream>

int main() {
    int startHour, startMinute, endHour, endMinute;
    while (std::cin >> startHour >> startMinute >> endHour >> endMinute) {
        const int start = 60 * startHour + startMinute;
        const int end = 60 * endHour + endMinute;
        const int minutes = (end - start + 24 * 60) % (24 * 60);

        std::cout << "Duration: " << minutes / 60 << " hours "
                  << minutes % 60 << " minutes\n";
    }
}
```

## C

<!-- homework-topic: BMI 指数分类器 -->

**BMI 指数分类器**

题意：给 n 组身高体重，输出 BMI（两位小数）与体重分级。
输入输出：首行 `n`，随后 n 行，每行 `w h`（体重在前）；输出 `<bmi> <分类>`，分类为 `Underweight` / `Normal weight` / `Overweight` / `Obesity`。

先用 `w / (h * h)` 算出 BMI，其中 `h` 应大于 0。`fixed << setprecision(2)` 控制显示的位数，分类仍用原始计算值。程序使用 18.5、24、28 三个阈值，例如恰好为 18.5 时进入 `Normal weight`。

**原始代码**

```cpp
//BMI指数分类器

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

## D

<!-- homework-topic: 检查字符类型 -->

**检查字符类型**

题意：逐个字符判断类别，输出 `Lowercase letter` / `Uppercase letter` / `Number` / `Other character`。

要点：`cin.get(ch)` 连空格、换行都能取到，`cin>>ch` 会跳过空白，判空格和标点必须用前者；`\n` 要 `continue` 掉，否则每个换行都会多打一行 `Other character`。区间用 ASCII 码 97–122、65–90、48–57，等价于 `'a'..'z'` 等字符字面量。

待确认：题面若先给字符个数 n 或规定"每行一个字符"，则"读到 EOF"与"读 n 个"在有多余空白时输出条数不同；当前实现连行内空格也会各输出一行。

**原始代码**

```cpp
//检查字符类型

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

## E

<!-- homework-topic: 包裹计费 -->

**包裹计费**

题意：按重量（向上取整到整公斤）与区域计算运费。
输入输出：多组 `weight zone`，zone 为 `A` 或 `B`；输出 `Total shipping fee is N`，非法区域输出 `Invalid zone`。

要点：`ceil` 把 2.1 kg 按 3 kg 计费；A 区首重 10 元、续重 3 元/kg，B 区 15 元 + 5 元/kg，即 `10+3*(w-1)` 与 `15+5*(w-1)`。

待确认：首重是否为 1 kg、续重是否真按整公斤向上取整；重量为 0 或负数时题面预期输出未在代码中体现（`w==0` 会落进 `Invalid zone` 分支）。

**原始代码**

```cpp
//包裹计费

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

## F

<!-- homework-topic: 电影票价 -->

**电影票价**

读取年龄与节假日标记，`Y` 表示节假日。基础票价 60，节假日加 20，儿童（<12）半价，老人（>=65）七折。当前版本输出 `The ticket price is X`，其中 `X` 保留一位小数。

要点：加价与折扣的先后顺序直接决定结果——代码先 `+20` 再乘系数，节假日儿童票是 `(60+20)*0.5=40.0`，而不是 `60*0.5+20=50.0`。`<12` 与 `>=65` 互斥，用 else-if 即可。

待确认：当前只读一组；注释版改成 `while(cin>>age>>ch)` 支持多组，需确认评测是否多组输入。

**原始代码**

```cpp
//电影票价

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

## G

<!-- homework-topic: 自动售货机 -->

**自动售货机**

题意：按商品编号与投币金额判断能否购买。A=3 元、B=5 元、C=2 元；成功输出 `Purchase successful.Your change is N yuan.`，不足输出 `Insufficient funds.You are short by N yuan.`，编号非法输出 `Invalid item code.`。

先按 `A`、`B`、`C` 确定价格，再与投币金额比较。原代码在三个商品分支中重复做金额判断。注释版用 `if / else if / else` 统一查价，非法编号直接结束当前组，合法编号共用一次找零或差额计算。

待确认：
- 成交句在句号后**没有空格**（`successful.Your`、`funds.You`），而注释版是 `successful. Your`。这种空格在 OJ 上是硬性字符比对，必须照题面样例定。
- 只读一组，未处理多组输入。
- 金额为负或非整数时无定义。

**原始代码**

```cpp
//自动售货机

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

## H

<!-- homework-topic: 一元二次方程实数根求解器 -->

**一元二次方程实数根求解器**

题意：对每组 `a b c` 输出方程根的情况，数值保留两位小数。
分支：`a==0` 退化为一元一次；否则按判别式 `d=b*b-4*a*c` 分 `>0` / `==0` / `<0`。

要点：先判 `a` 是否为 0，否则 `2*a` 会除零；`fixed<<setprecision(2)` 放在循环外；`x1` 取减号、`x2` 取加号，`a>0` 时自然满足 `x1<=x2`。

正确性与边界，这里有两处必须核对：

- **逻辑错误**　`a == 0 && b == 0` 时方程是 `0 = -c`。主版本把两条输出写反了。注释版已修正，`c == 0` 有无穷多解，`c != 0` 无解。
- **待确认**：一元一次分支的输出是 `Linear equation, one root:x= `（冒号后无空格、等号前有空格），其余分支是 `x1 = ` / `x = `，风格不统一；注释版统一成 `x = `。以样例为准。
- `a < 0` 时分母为负，按公式写出的 `x1` 会比 `x2` 大。若题面要求递增输出，像注释版一样在输出前交换即可。
- 主版本没有调用 `fixZero`，可能输出 `-0.00`。注释版按容差判断判别式和接近零的输出。容差应根据题目的输入精度与判重根要求选择。

**原始代码**

```cpp
//一元二次方程实数根求解器

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
