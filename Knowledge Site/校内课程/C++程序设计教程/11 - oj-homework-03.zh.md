---
slug: "11-oj-homework-03"
title: "第三次作业"
summary: "函数、递推、组合数、搜索与字典序。"
updatedAt: "2026-11-18"
content_type: "reference"
group: "homework"
displayNumber: "06"
---

**来源**　课后作业

## A

**双曲正弦**

题意：多组输入 `x`，按 `sh(t)=(e^t-e^-t)/2` 求 `y=sh(1+sh(x))/(sh(2x)+sh(3x))`，每组输出一行。

思路：把 `sh` 写成 `inline` 函数，`while(cin>>x)` 里直接套公式，用 `<cmath>` 的 `exp`。没有需要保存的状态，读完即算。

代码用默认输出精度，通常为 6 位有效数字。`x = 0` 时分子为 `sh(1) > 0`，分母为 0，公式没有定义。常见浮点环境下会输出 `inf`。**待确认**　题目是否排除 `x = 0`。

**原始代码**

```cpp
/*题目描述
已知y=sh(1+sh(x))/(sh(2*x)+sh(3*x)),其中sh为双曲正弦函数,即sh(t)=(e^t-e^-t)/2,
编写一个程序,输入x的值,求y的值。注意:测试数据有多组输入,x、y的数值
类型都为double类型。*/

#include <iostream>
using namespace std;
#include <cmath>

inline double sh(double t) {
    return (exp(t)-exp(-t))/2;
}

int main() {
    double x;
    while(cin>>x) {
        double y;
        y=sh(1+sh(x))/(sh(2*x)+sh(3*x));
        cout<<y<<endl;
    }
}
```

## B

**求和运算**

多组输入三个整数 `m n p`。按题目「习题 4-2」，求

$$
s=\frac{\sum_{i=1}^{m}i+\sum_{i=1}^{n}i^3}{\sum_{i=1}^{p}i^5}.
$$

以 `double` 输出结果并保留四位小数。题面用 `INT_MAX` 作为判断溢出的界限，并保证单独的次方运算不会溢出。累计值超出范围时输出 `Overflow`。

思路：三个和各自用 `long long` 累加。乘方项先转类型再乘，如 `(long long)i*i*i`，因为三个 `int` 连乘仍在 `int` 里算，可能中途溢出。最后 `s=x+y`，先判 `x>INT_MAX || y>INT_MAX || z>INT_MAX || s>INT_MAX`，再算 `(double)s/z`，输出用 `fixed<<setprecision(4)`。

边界与疑点：

- 样例 `1 2 3` 得到 $10/276$，输出 `0.0362`。`2 3 4` 得到 $39/1300$，输出 `0.0300`。`1 200 300` 的分母为 `122718374992500`，超过 `INT_MAX`，输出 `Overflow`。
- 公式要求分母非零。`p = 0` 时如何处理，截图未指定。
- 主版本在各部分算完后才判，`long long` 也可能先溢出。每一项非负时，累加途中一旦超过 `INT_MAX`，之后只会更大，可以立即退出。若输入范围不能保证项本身算得出来，还要在每次乘法前判断 `power > INT_MAX / i`。

**原始代码**

```cpp
/*题目描述
输入m、n和p的值,求s=1+2+…+m+13+23+…+n3的值。注意判15 +23+ ... +p3断运算中的溢出。
注意:测试数据有多组输入。提示:int类型的最大值可以用INT_MAX表示,需要#include<climits>，
单独的次方运算保证不会溢出。保留四位小数需要#include<iomanip>,可以参考代码:
cout << fixed << setprecision(4) << s <<endl;
*/

#include <iostream>
using namespace std;
#include <iomanip>
#include<climits>

long long sum1(int m) {       //防止在加的过程中溢出，直接定义long long
    long long sum=0;          //sum要定义在for循环之外，加法一定要初始化sum为0！！！
    for (int i=1;i<=m;i++) {
        sum+=(long long)i;
    }
        return sum;        //return放在for循环之外
}

long long sum3(int n) {
    long long sum=0;
    for(int i=1;i<=n;i++) {
        sum+=(long long)i*i*i;         //3个 int 相乘，结果还是 int，不会自动变成 long long。过程中可能溢出
    }
        return sum;
}

long long sum5(int p) {
     long long sum=0;
    for(int long long i=1;i<=p;i++) {
        sum+=(long long)i*i*i*i*i;
    }
        return sum;
}

int main() {
    int a,b,c;
    while(cin>>a>>b>>c) {
        long long x,y,z,s;
        double res;
        x=sum1(a);
        y=sum3(b);
        z=sum5(c);
        s=x+y;

        if (x>INT_MAX || y>INT_MAX || z>INT_MAX|| s>INT_MAX) {   //一次性枚举出所有溢出情况，使代码更简洁
            cout << "Overflow" << endl;
            continue;
        }
            res=(double)s/z;    //s and t都是int，会先做整数除法，所以需要做类型转换

        cout<<fixed<<setprecision(4)<<res<<endl;
    }
}



/*
#include <iostream>
#include <iomanip>   // 用于格式化输出
#include <climits>   // 用于使用 INT_MAX

using namespace std;

int main() {
    int m, n, p;

    // 处理多组输入
    while (cin >> m >> n >> p) {
        long long numerator = 0;   // 使用 long long 防止中间累加过程溢出
        long long denominator = 0; // 虽然题目分母是 p^5，但用 long long 更安全
        bool isOverflow = false;

        // 1. 计算分子：(1 + 2 + ... + m) + (1^3 + 2^3 + ... + n^3)
        // 计算 1 到 m 的和
        for (int i = 1; i <= m; ++i) {
            numerator += i;
            if (numerator > INT_MAX) { // 检查是否超过 int 最大值
                isOverflow = true;
                break;
            }
        }

        // 如果没有溢出，继续累加 1 到 n 的立方和
        if (!isOverflow) {
            for (int i = 1; i <= n; ++i) {
                // 注意：这里不能直接写 i*i*i，因为 i 可能很大，i*i*i 会在计算过程中作为 int 溢出
                // 应该将其转换为 long long 进行乘法
                long long cube = (long long)i * i * i;
                numerator += cube;
                if (numerator > INT_MAX) {
                    isOverflow = true;
                    break;
                }
            }
        }

        // 2. 计算分母：1^5 + 2^5 + ... + p^5
        if (!isOverflow) {
            for (int i = 1; i <= p; ++i) {
                // 同样，使用 long long 进行乘法防止计算 i^5 时溢出
                long long power5 = (long long)i * i * i * i * i;
                denominator += power5;
                if (denominator > INT_MAX) {
                    isOverflow = true;
                    break;
                }
            }
        }

        // 3. 输出结果
        if (isOverflow) {
            cout << "Overflow" << endl;
        } else {
            // 题目要求 s 类型为 double，保留四位小数
            double s = (double)numerator / denominator;
            cout << fixed << setprecision(4) << s << endl;
        }
    }

    return 0;
}
*/
```

**优化版**　随算随查。只有乘法与累加均未超过 INT_MAX 才继续，三个原题样例的输出与题面一致。按公式有定义的输入范围处理。

```cpp
#include <climits>
#include <iomanip>
#include <iostream>

bool addPowers(int last, int exponent, long long& total) {
    for (long long base = 1; base <= last; ++base) {
        long long term = 1;
        for (int i = 0; i < exponent; ++i) {
            if (term > INT_MAX / base) return false;
            term *= base;
        }

        if (total > INT_MAX - term) return false;
        total += term;
    }
    return true;
}

int main() {
    int m, n, p;
    std::cout << std::fixed << std::setprecision(4);
    while (std::cin >> m >> n >> p) {
        long long numerator = 0;
        long long denominator = 0;
        if (!addPowers(m, 1, numerator) || !addPowers(n, 3, numerator)
            || !addPowers(p, 5, denominator)) {
            std::cout << "Overflow\n";
            continue;
        }

        std::cout << static_cast<double>(numerator) / denominator << '\n';
    }
}
```

## C

**算数游戏**

题意：用线性同余发生器 `r_k=(25173*r_{k-1}+13849)%65536`（`r_0=0`）生成随机数，实现小学生四则运算练习。输入先给练习轮数 `t`；每轮输出 `Start now? (Y or N)`，输入 `N` 跳过本轮；输入 `Y` 后依次输入难度（1：操作数 0–9；2：10–99）和运算符（`+ - * /`），随后 10 道题、每题 10 分；每题输出算式等待作答，立即反馈对错，最后输出总分。

思路：

- 发生器状态 `r` 定义在所有循环之外，跨题、跨轮持续递推，不重置（题面明确要求多次练习继续用公式生成）。
- 取操作数用 `do { r=(25173*r+13849)%65536; } while(不在难度范围)`，连续取两个；减法要求 `a>b`，除法要求 `b!=0` 且 `a%b==0`，不满足就继续用当前 `r` 重新取一对（`continue` 回到 `while(true)` 开头）。
- 判分直接比较输入与算出的 `answer`；难度、运算符输入非法时用循环重新读。
- 乘加中间量约 1.65e9，虽在 `int` 上限内，用 `long long` 更稳。

边界与疑点：

- 题面样例是截图，代码里的提示语（`Start now? (Y or N)`、`Please enter difficulty (1 or 2):`、`Your grades are: ` 等）是照样例抄的，空格和标点是否逐字符一致 **待确认**，OJ 通常严格比对输出。
- 第一行整数 `t` 表示练习轮数，这一点在题面截断的文字里没有明确，是从代码读出的，**待确认**。
- 难度 1 时 0 是合法操作数；除法分支已排除除数为 0。输入除 `N/n` 以外字符时代码按继续处理。

**原始代码**

```cpp
/*题目描述
用线性同余法生成随机数序列的公式为rk=(multiplierx rk-1 + increment)% modulus,序列中的每个数rk都可以由它
的前一个数rk-1计算出来。例如,如果有rk=(25173×rk-1+13849)%65536,则可以产生65536个各不相同的整型随机数。设
计一个函数作为随机数生成器,生成1位或2位的随机数。利用这个随机数生成器,编写一个小学生学习四则运算的练习程序,要求:
(1)可以进行难度选择,一级难度只用1位数(0-9),二级难度用2位数(10-99);
(2)可以选择运算类型,包括加、减、乘、除等;
(3)给出错误提示;
(4)每次练习10道题,一题10分,可以统计成绩。
补充说明:
(1)生成每道题都需要两个随机数,rk的初始值ro=0,按照公式r1=(25173×0+ 13849) % 65536 = 13849, r2 = (25173×13849 + 13849)% 65536=48742 ... 直
到它是一个1位数或者2位数(根据难度要求),则用来作为运算数。接着继续生成另一个运算数。如果有多次练习也不需要把r重新置0,而是继续带入公式生成。
(2)如果是减法,需要保证被减数大于减数;如果是除法,需要保证结果是整数。如果生成的两个随机数不符合要求,则重新按照(1)的方式在之前的rk的基础上继续
生成两个随机数,直到符合要求。
(3)样例输出可以参考下图,输出的语句可以复制样例输出,输入Y继续流程,输入N会直接进入下一轮,重新输出Start Now?(Y or N)*/


#include <iostream>
using namespace std;

int main() {
    long long r = 0;
    int t;
    cin >> t;

    for (int k = 1; k <= t; k++) {
        char start, op;
        int difficulty;
        int a, b, answer, input;
        int score = 0;

        cout << "Start now? (Y or N)" << endl;
        cin >> start;

        if (start == 'N' || start == 'n')
            continue;

        cout << "Please enter difficulty (1 or 2):" << endl;
        cin >> difficulty;

        while (difficulty != 1 && difficulty != 2) {
            cout << "Input error, please re-enter!" << endl;
            cin >> difficulty;
        }

        cout << "Please enter type of operation (+, -, *, /):" << endl;
        cin >> op;

        while (op != '+' && op != '-' &&
               op != '*' && op != '/') {
            cout << "Input error, please re-enter!" << endl;
            cin >> op;
        }

        for (int i = 1; i <= 10; i++) {

            while (true) {

                // 生成第一个符合难度的随机数
                do {
                    r = (25173 * r + 13849) % 65536;
                } while ((difficulty == 1 && r > 9) ||
                         (difficulty == 2 && r < 10) ||
                         (difficulty == 2 && r > 99));

                a = r;

                // 生成第二个符合难度的随机数
                do {
                    r = (25173 * r + 13849) % 65536;
                } while ((difficulty == 1 && r > 9) ||
                         (difficulty == 2 && r < 10) ||
                         (difficulty == 2 && r > 99));

                b = r;

                if (op == '+') {
                    answer = a + b;
                }
                else if (op == '-') {
                    if (a <= b)
                        continue;

                    answer = a - b;
                }
                else if (op == '*') {
                    answer = a * b;
                }
                else {
                    if (b == 0 || a % b != 0)
                        continue;

                    answer = a / b;
                }

                break;
            }

            cout << a << op << b << "=" << endl;
            cin >> input;

            if (input == answer) {
                cout << "You're right, get 10 points." << endl;
                score += 10;
            }
            else {
                cout << "answer incorrectly." << endl;
            }
        }

        cout << "Your grades are: " << score << endl;
    }

    return 0;
}
```

## D

**勒让德多项式**

多组输入 `x`、`n`，要求递归计算 $n$ 阶勒让德多项式 $P_n(x)$，保留两位小数。标准勒让德多项式的初值为 $P_0(x)=1$、$P_1(x)=x$。当 $n\ge 2$ 时，递推为

$$
P_n(x)=\frac{(2n-1)xP_{n-1}(x)-(n-1)P_{n-2}(x)}{n}.
$$

把 `n == 0` 和 `n == 1` 设为递归基，其余调用前两阶并按公式合成。将 `x` 与多项式值保存在 `double` 中，除以 `n` 时会进行浮点除法。输出用 `fixed << setprecision(2)`。

疑点与改进：

- 按标准递推，代码第一项漏乘 `x`。例如 $P_2(x)=(3x^2-1)/2$，取 $x=2$ 应得 $5.5$，现有程序得到 $2.5$。本地题面转录缺失公式，笔记使用标准定义。
- 用 `float` 只有约 7 位有效数字，`n` 大时误差累积，建议 `double`。
- 朴素递归会重复计算同一阶。题目明确要求递归时，可记忆化，使时间和空间都降为 $O(n)$，其中空间含递归栈。允许迭代时，从 $P_0$、$P_1$ 向前推即可，时间 $O(n)$，额外空间 $O(1)$。

**原始代码**

```cpp
/*题目描述
已知勒让德多项式
编写程序,从键盘输入x和n的值,使用递归函数求pn(x)的值。注意:测试数据有多组输入
提示:答案保留2位小数,需要#include<iomanip>,可以参考代码:
cout << fixed << setprecision(2) << pn<< endl;*/

#include <iostream>
using namespace std;
#include<iomanip>

float legendre(float x,int n) {
    if(n==0) {
        return 1.0;    //初始化为浮点数，加上小数点,下方同理
    } else if(n==1) {
        return x;
    } else {
        return ((2.0*n-1.0)*legendre(x,n-1)-(n-1.0)*legendre(x,n-2))/n;
    }
}

int main() {
    float x;
    int n;

    while(cin>>x>>n) {
        float res;
        res=legendre(x,n);
        cout<<fixed<<setprecision(2)<<res<<endl;
    }
}
```

**优化版**　按标准勒让德公式补回乘数 `x`，保留递归并缓存每一阶的结果。每次输入重新建表，复杂度由指数级降到 $O(n)$。

```cpp
#include <iomanip>
#include <iostream>
#include <optional>
#include <vector>

using Memo = std::vector<std::optional<double>>;

double legendre(int n, double x, Memo& memo) {
    if (n == 0) return 1.0;
    if (n == 1) return x;
    if (memo[n]) return *memo[n];

    const double previous = legendre(n - 1, x, memo);
    const double earlier = legendre(n - 2, x, memo);
    memo[n] = ((2.0 * n - 1.0) * x * previous - (n - 1.0) * earlier) / n;
    return *memo[n];
}

int main() {
    double x;
    int n;
    std::cout << std::fixed << std::setprecision(2);
    while (std::cin >> x >> n) {
        Memo memo(n + 1);
        std::cout << legendre(n, x, memo) << '\n';
    }
}
```

## E

**猜数游戏**

题意：玩家心里想一个 1–1000 的整数，计算机来猜。每次先输出猜测值，玩家输入 `1` 表示猜大了、`-1` 表示猜小了、`0` 表示猜中；猜中后输出一共猜了几次。先输出三行固定开场白再开始。

思路：维护可行区间 `[low, high]`，每轮猜 `(low+high)/2`；收到 1 就把 `high` 调到 `guess-1`，收到 -1 就把 `low` 调到 `guess+1`，收到 0 输出 `count` 并 `break`。1000 个候选最多 10 次必中（`log2(1000)<10`）。

边界：固定文案里的全角标点和空格要跟样例完全一致，否则会被判错；代码是照样例抄的。若玩家回答自相矛盾，循环会因 `low>high` 结束且不再输出，属非法输入，题面未要求处理。

**原始代码**

```cpp
/*题目描述
猜数游戏。玩家想好了一个1~1000的整数,由计算机来猜这个数。如果计算机猜出的数比玩家想的数大,则玩家输入1;如果计算
机猜出的数比玩家想的数小,则玩家输入-1;这个过程一直进行到计算机猜中为止,玩家输入0。
提示:程序需要先输出一个猜测值然后才输入(0,1或者-1)。程序使用二分搜索来猜测,即每次都选择可能取值范围的中间值
作为猜测数字,由于初始范围是1到1000,所以先输出500。如果猜测值 500大于玩家所想的数字,则输入1,然后程序
从[1,499](闭区间)中继续二分搜索;如果如果猜测值500小于玩家所想的数字,则从[501,1000](闭区间)中继续二分搜索。依
次类推,直到猜中为止。样例的运行结果如下,假如你自己想的是125:*/

#include <iostream>
using namespace std;

int main() {
    int low=1,high=1000;
    int k;
    int count=0;
    cout<<"请你想好一个 1～1000 之内的整数，别告诉我，让我来猜猜！"<<endl;
    cout<<"猜中了，请输入0；若猜的数小了， 请输入-1；若猜的数大了，请输入1"<<endl;
    cout<<"开始猜了……"<<endl;
    while(low<=high) {                    //循环条件不好想！！！
        int guess=(low+high)/2;           //二分法，后面动态调整low and high
        count++;
        cout<<"是 "<<guess<<" 吗？"<<endl;
        cin>>k;
        if(k==1) {
            high=guess-1;
                                        //continue;没有必要加，因为该代码执行完后，循环内已经没有剩余代码需要执行
        } else if(k==-1) {
            low=guess+1;
        } else if(k==0) {
            cout<<"我猜中啦！只猜了 "<<count<<" 次，很强吧！"<<endl;
            break;            //猜对了立马退出循环
        }
    }
}
```

## F

**股票最优方案**

题意：`T` 组数据，每组一周 7 天的股票价格；只允许一次先买后卖，求最大利润，没有获利机会就输出 0。

思路：一次遍历，维护“此前见过的最低价”`minprice`；当天价格高于它时，用 `price-minprice` 更新 `maxprofit`。`maxprofit` 初值 0，天然处理不能获利的情况。关键是买入必须早于卖出，所以只能和之前的最低价配对，不能拿全局最小值直接相减。

边界与疑点：

- `minprice` 用 `unsigned int` 哨兵 `999999999`。如果首日实际价格比这个哨兵高，代码可能算出一笔不存在的获利。可先读第一天的价格，以它初始化最低价，从第二天开始更新利润。
- 价格相等时只更新最低价、不产生利润，结果仍为 0，符合“没有可能获利输出 0”。
- 有无符号混用：`price` 是 `int`、`minprice` 是 `unsigned`，比较时会把 `price` 转成无符号；价格非负时没有问题。

**原始代码**

```cpp
/*题目描述
假设现在你拥有一支股票一周的价格序列,第i天的股票价格位于序列的第i个位置,现在你只允许做一次交易,也就是说只
能先买入再卖出股票(卖出的时间要晚于买入的时间)。请设计程序找出最佳交易时机使得获利最大化。输出最大的获利结
果。如果没有可能获利,输出0。*/

#include <iostream>
using namespace std;
#include <algorithm>         //为了使用max函数

int main() {
    int T;
    cin>>T;
    while(T--) {
        int price;
        unsigned int minprice=999999999;   //第一个输入的price必然被赋进minprice
        int maxprofit=0;                  //如果没获利输出0，重要思想：一旦获利就替换掉初始值
        for(int i=1;i<=7;i++) {
        cin>>price;                       //一次for循环读取一个price,实现读取一周中每一天价格
            if(price<=minprice) {
                minprice=price;           //从左往右一次找比前一个数小的price
            } else {
            int profit=price-minprice;
            maxprofit=max(maxprofit,profit);
            }
        }
        cout<<maxprofit<<endl;
    }
}
```

**优化版**　用第 1 天的真实价格初始化最低价。每天先计算用此前最低价买入的收益，再更新最低价。

```cpp
#include <algorithm>
#include <iostream>

int main() {
    int cases;
    if (!(std::cin >> cases)) return 0;
    for (int i = 0; i < cases; ++i) {
        long long lowest;
        std::cin >> lowest;
        long long best = 0;

        for (int day = 2; day <= 7; ++day) {
            long long price;
            std::cin >> price;

            best = std::max(best, price - lowest);
            lowest = std::min(lowest, price);
        }

        std::cout << best << '\n';
    }
}
```

## G

**组合数**

题意：多组输入 `m`、`n`，求 `C(m,n)=m!/(n!(m-n)!)`。要求主函数调用 `Fabricate(m,n)`，其中再调用 `Multi(m,n)`（返回 `m*(m-1)*…*n`），并优化以降低溢出可能。

思路：先利用对称性 `C(m,n)=C(m,m-n)` 把 `n` 压到不超过 `m/2`；`Multi(a, a-b+1)` 得到 `a!/(a-b)!`，`Multi(b,1)` 得到 `b!`，两者相除即得组合数。中间量用 `long long`，最后转回 `int`。

边界与改进：

- `n=0` 或 `m=n` 时两个 `Multi` 分别退化为 1，结果 1。
- 即使最终结果装得进 `int`，中间连乘也可能超出 `long long`。例如 $\binom{33}{16}=1\,166\,803\,110$，但分子连乘等于结果再乘以 $16!$，远大于 `long long` 的上限。允许改变函数组织时，可以边乘边除。

```cpp
long long res = 1;
for (int i = 1; i <= n; ++i)
    res = res * (m - i + 1) / i;   // 每一步都是整数，不会出现小数截断
```

第 `i` 次循环结束后，`res` 等于 $\binom{m}{i}$，所以除以 `i` 时恰好整除。循环前应利用对称性缩小 `n`，并保证乘法中间值不会溢出。

- 本地代码把函数写成 `long long` 返回并用小写名。题面给出了 `int Fabricate(int,int)` 和 `int Multi(int,int)`，还要求两者有调用关系。提交时按指定接口实现，边乘边除可作为理解溢出问题的补充。

**原始代码**

```cpp
/*题目描述
给定求组合数公式为C1:
m!
n!(m-n)!'
编写程序,输入两个整数m和n的值,求C”m的值。注意优化算法,降低溢出可能。
要求:主函数调用以下函数求组合数。int Fabricate(int m,int n);//返回组合数
的值在Fabricate函数中内需调用Multi函数int Multi(int m, int n);//返回m*(m-
1) *...* n注意:测试数据有多组输入*/

#include <iostream>
using namespace std;

long long multi(int m,int n) {
    long long product=1;
    for(n;n<=m;n++) {
        product*=(long long)n;
     }
    return product;
}

long long fabricate(int a,int b) {
    long long c,d;
    c=multi(a,(a-b+1));
    d=multi(b,1);
    return c/d;
}

int main() {
    int in1,in2;
    while(cin>>in1>>in2) {
        if(in2>(in1-in2)) {
            in2=in1-in2;
        }
        int res;
        res=(int)fabricate(in1,in2);
        cout<<res<<endl;
    }
}


/*
#include <iostream>
using namespace std;

// 声明函数
int Fabricate(int m, int n);

int main() {
    int m, n;
    // 注意：题目要求有多组输入
    while (cin >> m >> n) {
        cout << Fabricate(m, n) << endl;
    }
    return 0;
}

// 计算组合数 C(m, n)
int Fabricate(int m, int n) {
    // 优化1：利用对称性 C(m, n) = C(m, m-n)，让 n 尽可能小
    if (n > m - n) {
        n = m - n;
    }

    int result = 1;
    // 优化2：边乘边除，防止中间结果溢出
    // 公式：C(m, n) = (m * (m-1) * ... * (m-n+1)) / n!
    // 我们循环 n 次，每次乘一个分子上的数，同时除以一个分母上的数
    for (int i = 1; i <= n; ++i) {
        result = result * (m - i + 1) / i;
    }
    return result;
}
*/
```

## H

**美素数**

题意：`T` 组数据，每组 `L R`，统计区间内“本身是素数，且各位数字之和也是素数”的整数个数，按 `Case #i: count` 输出。

思路：`prime` 试除到 `i*i<=n`，先排除 `n<=1`；`digitsum` 取模累加，`sum` 在循环外清零一次。主循环对每个数先判素数，再算数位和并二次判素数——先判素数能省掉大部分数位和计算。

边界与改进：

- 1 不是素数，代码已排除；各位数字和为 1 也不可能通过素数判断。
- 多组区间若很大或大量重叠，逐个试除的总代价是 O(T·(R-L)·√R)。若 `R` 达 1e6 量级、`T` 很大，可先筛素数，再预处理“美素数”的前缀个数，使每组查询 O(1)。题面未给数据范围，**待确认**。
- `L>R` 时循环不执行、输出 0，题面未说明这种输入。

**原始代码**

```cpp
/*题目描述
小明对数的研究比较热爱,一谈到数,脑子里就涌现出好多数的问题,今天,小明想考考你对素数的认识。问题是这样的:
一个十进制数,如果是素数,而且它的各位数字和也是素数,则称之为“美素数”,如29,本身是素数,而且2+9=11也是
素数,所以它是美素数。给定一个区间,你能计算出这个区间内有多少个美素数吗?*/

#include <iostream>
using namespace std;

bool prime(int n) {
    if(n<=1) {             //注意排除1不是素数
        return 0;
    }
    for(int i=2;i*i<=n;i++) {    //注意i从2开始
        if(n%i==0) {
            return 0;
        }
    }
            return 1;

 }


int digitsum(int n) {
    int sum=0;           //注意sum要定义在while循环外部。不然第二次循环后sum清零
    while(n>0) {
        int x;
        x=n%10;
        n=n/10;
        sum+=x;
    }
    return sum;
}

int main() {
    int T;
    if(cin>>T) {
        for(int i=1;i<=T;i++) {
             int L,R;
             cin>>L>>R;
             int count=0;              //从0开始加
             for(int k=L;k<=R;k++) {
                if(prime(k)==1) {
                    int sum=digitsum(k);
                    if(prime(sum)==1) {
                        count++;
                    }
                 }
             }
             cout<<"Case #"<<i<<": "<<count<<endl;
        }
    }
}
```

## I

**寻找不同数字组合个数**

题意：多组输入非负整数 `n`，统计 `0 <= x < 10^n` 中各位数字互不相同的整数个数。例 `n=2` 时，0–99 共 100 个数里去掉 11、22、…、99 这 9 个，得 91。

思路：不要用“总数减有重复”，直接按位数构造：

- 1 位数（含 0）：10 个。
- `i` 位数（`2<=i<=n`）：首位不能为 0，有 9 种；其余 `i-1` 位从剩下 9 个数字中有序选取，共 `P(9,i-1)=9*8*…` 种。合计 `9*P(9,i-1)`。
- 累加所有位数即以 10 为上界的答案；`n=0` 时只有 0，返回 1。

`A(m,k)` 就是 `m*(m-1)*…*(m-k+1)`，代码用倒序循环实现。

边界与疑点：

- 代码对 `n>=11` 直接输出 0。但按例子的区间口径，`n` 超过 10 后答案不应再增加，也不会变成 0：不存在 11 位各位互异的整数，可是位数更少的数仍在 `0<=x<10^n` 内。因此 `n=11` 的答案应等于 `n=10`（8,877,691）。**待确认**题面在 `n>10` 时的预期；若数据保证 `n<=10` 则这段分支不会被触发。
- `n=10` 时中间量最大约 `9*9!≈3.27e6`，结果 8,877,691，均在 `int` 内。

同题的另一份源文件见 [第四次作业补充 E](/books/campus-cpp-programming/09-oj-homework-04-supplement/#zh-e)。

**原始代码**

```cpp
/*题目描述
给定一个非负的整数n,计算从0到10n之间有多少个整数是由不同的数字组合成的。例如输入2,统计0 <= x<102之间有
多少个整数是由不同的数字组合成时,应去掉带有重复数字的整数 11、22、33、44、55、66、77、88、99,最后返回结
果为91。注意:测试数据有多组输入*/

#include <iostream>                       //容易被题目误导去用总数减有相同数字的数总数
using namespace std;

long long A(int m,int n) {                //定义排列数
    long long product=1;
    for(int i=m;i>=(m-n+1);i--) {
        product*=i;
    }
    return product;
}

int main() {
    int n;
    while(cin>>n) {
        if(n>=11) {
            cout<<0<<endl;
        } else if(n==0) {
            cout<<1<<endl;
        } else if(n>1&&n<=10) {
            int res=10;
            for(int i=2;i<=n;i++) {
                res+=(9*A(9,(i-1)));    //首位不能为0
             }
             cout<<res<<endl;
        } else if(n==1) {
                cout<<10<<endl;
        }
    }
}
```

## J

**字典序**

题意：多组输入 `n`、`k`，把 `1..n` 按十进制字符串的字典序排序，输出第 `k` 个数。例 `n=13, k=2` 时顺序为 `1,10,11,12,13,2,3,…,9`，第 2 个是 10。

思路：把 `1..n` 看成一棵十叉前缀树，`getcount(prefix)` 统计以 `prefix` 为前缀且不超过 `n` 的数的个数。按层累加：当前层区间 `[first, last]` 与 `n` 取交，`count += min(n,last)-first+1`，然后 `first*=10`、`last=last*10+9` 进入下一层。

从 `prefix=1` 出发：

- 若 `k<=count`，答案在这棵子树里；`k==1` 就是 `prefix` 本身，否则下降一层：`prefix*=10`、`k-=1`（扣掉根节点）。
- 否则整棵子树跳过：`k-=count`、`prefix+=1`。

以 `n=13, k=2` 验证：`count(1)=5`（1、10、11、12、13），`k=2` 不是 1，下降到 `prefix=10`、`k=1`；下一轮 `count(10)=1`，`k==1`，输出 10。

边界与疑点：

- `first` 和 `last` 使用 `int`，进入下一层时可能在判断 `first <= n` 之前就发生溢出。例如 `n = 10^9` 时下一层可达 `10^10`。若 `n` 为 `int`，用 `long long` 保存区间端点即可覆盖这些中间值。
- 需要 `1<=k<=n`；`k=0` 或越界会陷入死循环，题面未要求处理。

逐个求后继的入门写法见 [第四次作业补充 G](/books/campus-cpp-programming/09-oj-homework-04-supplement/#zh-g)。

**原始代码**

```cpp
/*题目描述
字典序是给对应位置元素所属集合分别相同的各个有序多元组规定顺序的方法。对于数字的字典序排列,不同排列的先后关
系是从左到右逐个比较对应的数字的先后来决定的。例如1235和12345,按字典序排序12345排列在1235之前。假设整数
序列1、2、3、 ..... n按字典序排序,现在给定非负整数n,在序列中找到第k个整数并输出其值。例如,n=13,k=2,那么对应的
字典序为[1,10,11,12,13,2,3,4,5,6,7,8,9],第2个数字为10。因此输出10。注意:测试数据有多组输入*/

#include<iostream>
using namespace std;
#include<algorithm>

int getcount(int prefix,int n) {       //计算前缀数字为x时，小于等于n的数有多少个
    int count=0;
    int first=prefix;
    int last=prefix;
    while(first<=n) {
        count+=min(n,last)-first+1;;
        first*=10;
        last=last*10+9;
    }
    return count;
}

int main() {
    int n,k;
    while(cin>>n>>k){
        int prefix=1;
        while(true) {
            int count=getcount(prefix,n);
            if(k<=count) {
                if(k==1) {
                cout<<prefix<<endl;
                break;
                }
                prefix*=10;
                k-=1;
            } else{
                k-=count;
                prefix+=1;
            }
        }
    }
}



/*
#include <iostream>
#include <algorithm>

using namespace std;

// 计算以 prefix 为根的子树中，有多少个数字 <= n
long long getCount(long long prefix, long long n) {
    long long count = 0;
    long long first = prefix;
    long long last = prefix;

    while (first <= n) {
        // 当前层中实际包含的节点数，不能超过 n
        count += min(n, last) - first + 1;
        // 进入下一层
        first *= 10;
        last = last * 10 + 9;
    }
    return count;
}

int main() {
    long long n, k;

    // 循环读取多组测试数据
    while (cin >> n >> k) {
        long long prefix = 1;

        while (true) {
            long long count = getCount(prefix, n);

            if (k <= count) {
                // 第 k 个数在当前 prefix 的子树中
                // 如果正好是当前节点本身，直接输出
                if (k == 1) {
                    cout << prefix << endl;
                    break;
                }
                // 否则进入下一层
                prefix *= 10;
                k -= 1; // 减去当前节点占用的 1 个名额
            } else {
                // 第 k 个数不在当前子树，向右移动到下一个兄弟节点
                k -= count;
                prefix += 1;
            }
        }
    }

    return 0;
}
*/
```

**优化版**　先数当前十进制前缀覆盖的整数，再整棵跳过或进入下一层。端点用 64 位整数，覆盖原代码使用的 32 位输入范围。

```cpp
#include <algorithm>
#include <iostream>

long long subtreeSize(long long prefix, int n) {
    long long size = 0;
    long long first = prefix;
    long long pastLast = prefix + 1;
    const long long limit = static_cast<long long>(n) + 1;
    while (first < limit) {
        size += std::min(pastLast, limit) - first;
        first *= 10;
        pastLast *= 10;
    }
    return size;
}

int main() {
    int n, k;
    while (std::cin >> n >> k) {
        long long prefix = 1;
        --k;

        while (k > 0) {
            const long long size = subtreeSize(prefix, n);
            if (k >= size) {
                ++prefix;
                k -= size;
            } else {
                prefix *= 10;
                --k;
            }
        }
        std::cout << prefix << '\n';
    }
}
```
