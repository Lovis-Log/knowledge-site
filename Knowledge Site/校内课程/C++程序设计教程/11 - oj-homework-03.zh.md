---
slug: "11-oj-homework-03"
title: "第三次作业（函数、递推与搜索）"
summary: "函数、递推、组合数、搜索与字典序。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "06"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/1IxOINXTMFDM_CtI5aqu5UYuMuAXhxbj8"
---

**来源**　课后作业

A–J 共 10 题。题意取自各 `.cpp` 顶部的题面注释；注释被换行截断、又影响结论的地方标为 **待确认**。

## A

<!-- homework-topic: 双曲正弦 -->

> **题目**　**双曲正弦**
>
> 已知
>
> $$y=\frac{\operatorname{sh}(1+\operatorname{sh}x)}{\operatorname{sh}(2x)+\operatorname{sh}(3x)},\qquad \operatorname{sh}t=\frac{e^t-e^{-t}}{2},$$
>
> 编写程序输入 `x`，求 `y`。
>
> 输入：多组 `x`，`x`、`y` 均为 `double`。输出：每组一行，按默认浮点格式输出。
>
> 示例：`x = 0.5` 时 $\operatorname{sh}0.5\approx0.5211$，$1+\operatorname{sh}0.5\approx1.5211$，输出约 `0.659523`。

**思路**　把 `sh` 写成 `inline` 函数，`while(cin>>x)` 里直接套公式，用 `<cmath>` 的 `exp`。没有需要保存的状态，读完即算。

代码用默认输出精度，通常为 6 位有效数字。`x = 0` 时分子为 `sh(1) > 0`，分母为 0，公式没有定义。常见浮点环境下会输出 `inf`。**待确认**　题目是否排除 `x = 0`。

**原始代码**

```cpp
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

[查看原始 A.cpp](https://drive.google.com/file/d/1PYwOb-pI9-FRGk85TzZcJ3ocZVGiHrVz/view?usp=drivesdk)

**补充解析**　分母只在 `x = 0` 处为零。`sh` 是奇函数且严格递增，`sh(2x) = -sh(3x)` 当且仅当 `2x = -3x`，即 `x = 0`；其余情况下两项同号，分母不为零。浮点溢出的临界值比想象中小：分子是 `sh(1+sh x)`，而 `sh x ≈ e^x/2`，所以 `x` 刚超过约 7.3 时 `exp(sh x)` 就已经超出 `double` 上限，输出 `inf`（实测 `x=8` 即如此）；`x` 增至约 236 时分母也溢出，`inf/inf` 得 `nan`（实测 `x=300`）；`x` 为绝对值较大的负数时同样先溢出成 `inf`。这些极端值是否需要处理，取决于题面给出的 `x` 范围。

## B

<!-- homework-topic: 求和运算 -->

> **题目**　**求和运算**
>
> 多组输入三个整数 `m n p`，求
>
> $$s=\frac{\sum_{i=1}^{m}i+\sum_{i=1}^{n}i^3}{\sum_{i=1}^{p}i^5}.$$
>
> 以 `double` 输出结果并保留四位小数。题面用 `INT_MAX` 作为判断溢出的界限，并保证单独的次方运算不会溢出；累计值超出范围时输出 `Overflow`。
>
> 输入：多组 `m n p`。输出：每组一行，四位小数或 `Overflow`。
>
> 示例：`1 2 3` → `0.0362`；`2 3 4` → `0.0300`；`1 200 300` → `Overflow`。

**思路**　三个和各自用 `long long` 累加。乘方项先转类型再乘，如 `(long long)i*i*i`，因为三个 `int` 连乘仍在 `int` 里算，可能中途溢出。最后 `s=x+y`，先判 `x>INT_MAX || y>INT_MAX || z>INT_MAX || s>INT_MAX`，再算 `(double)s/z`，输出用 `fixed<<setprecision(4)`。

**边界与疑点**：

- 样例 `1 2 3` 得到 $10/276$，输出 `0.0362`。`2 3 4` 得到 $39/1300$，输出 `0.0300`。`1 200 300` 的分母为 `122718374992500`，超过 `INT_MAX`，输出 `Overflow`。
- 公式要求分母非零。`p = 0` 时如何处理，截图未指定。
- 主版本在各部分算完后才判，`long long` 也可能先溢出。每一项非负时，累加途中一旦超过 `INT_MAX`，之后只会更大，可以立即退出。若输入范围不能保证项本身算得出来，还要在每次乘法前判断 `power > INT_MAX / i`。

**原始代码**

```cpp
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

[查看原始 B.cpp](https://drive.google.com/file/d/1I0WGxlWNxLiPobkOabg-beM5PcLzBUwg/view?usp=drivesdk)

**补充解法**　随算随查。只有乘法与累加均未超过 `INT_MAX` 才继续，三个原题样例的输出与题面一致。按公式有定义的输入范围处理。

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

优势在于「先判后算」：`term > INT_MAX / base` 保证本次乘法不会越界，`total > INT_MAX - term` 保证本次加法不会越界，判断本身就发生在溢出之前，不依赖事后比较。适用条件是题面只要求判断是否超过 `INT_MAX`；若题面改成 `long long` 上限，同样的写法把边界换成 `LLONG_MAX` 即可。三个和互不干扰，可以在同一个累加器外按顺序调用。

## C

<!-- homework-topic: 算数游戏 -->

> **题目**　**算数游戏**
>
> 用线性同余发生器 `r_k=(25173*r_{k-1}+13849)%65536`（`r_0=0`）生成随机数，实现小学生四则运算练习。输入先给练习轮数 `t`；每轮输出 `Start now? (Y or N)`，输入 `N` 跳过本轮；输入 `Y` 后依次输入难度（1：操作数 0–9；2：10–99）和运算符（`+ - * /`），随后 10 道题、每题 10 分；每题输出算式等待作答，立即反馈对错，最后输出总分。
>
> 输入：先读 `t`，随后按上文协议逐轮读字符与整数。输出：提示语、算式、判题反馈与总分，每组一轮。
>
> 示例：`t = 1`，输入 `Y`、难度 `1`、运算符 `+`，程序依次给出十道一位数加法题；全对时最后一行输出 `Your grades are: 100`。

**思路**：

- 发生器状态 `r` 定义在所有循环之外，跨题、跨轮持续递推，不重置（题面明确要求多次练习继续用公式生成）。
- 取操作数用 `do { r=(25173*r+13849)%65536; } while(不在难度范围)`，连续取两个；减法要求 `a>b`，除法要求 `b!=0` 且 `a%b==0`，不满足就继续用当前 `r` 重新取一对（`continue` 回到 `while(true)` 开头）。
- 判分直接比较输入与算出的 `answer`；难度、运算符输入非法时用循环重新读。
- 乘加中间量约 1.65e9，虽在 `int` 上限内，用 `long long` 更稳。

**边界与疑点**：

- 题面样例是截图，代码里的提示语（`Start now? (Y or N)`、`Please enter difficulty (1 or 2):`、`Your grades are: ` 等）是照样例抄的，空格和标点是否逐字符一致 **待确认**，OJ 通常严格比对输出。
- 第一行整数 `t` 表示练习轮数，这一点在题面截断的文字里没有明确，是从代码读出的，**待确认**。
- 难度 1 时 0 是合法操作数；除法分支已排除除数为 0。输入除 `N/n` 以外字符时代码按继续处理。

**原始代码**

```cpp
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

[查看原始 C.cpp](https://drive.google.com/file/d/1kscGOO8DVAgNUNa4E0G_35YRgUx45sUR/view?usp=drivesdk)

**补充解析**　这个发生器不是「随便凑的」：模数 `65536 = 2^16`，增量 `13849` 为奇数，乘数 `25173 ≡ 1 (mod 4)`，正好满足满周期条件（Hull–Dobell 定理），因此 65536 个状态互不相同，在重复之前会取遍 `0..65535`。这保证了「筛到符合难度的数」一定会结束：难度 1 需要 `r ≤ 9`，一个周期内至少出现 10 次；除法还额外要求整除，最坏情况下也只是多扫几轮，不会死循环。代价是难度 1、除法时单题可能消耗成千上万次递推，但总量仍在常数级。

## D

<!-- homework-topic: 勒让德多项式 -->

> **题目**　**勒让德多项式**
>
> 多组输入 `x`、`n`，要求递归计算 $n$ 阶勒让德多项式 $P_n(x)$，保留两位小数。
>
> 标准勒让德多项式的初值为 $P_0(x)=1$、$P_1(x)=x$。当 $n\ge 2$ 时，递推为
>
> $$P_n(x)=\frac{(2n-1)xP_{n-1}(x)-(n-1)P_{n-2}(x)}{n}.$$
>
> 输入：多组 `x n`。输出：每组一行，两位小数。
>
> 示例：`x = 2, n = 2` → `5.50`（$P_2(2)=(3\cdot4-1)/2=5.5$）。

把 `n == 0` 和 `n == 1` 设为递归基，其余调用前两阶并按公式合成。将 `x` 与多项式值保存在 `double` 中，除以 `n` 时会进行浮点除法。输出用 `fixed << setprecision(2)`。

**疑点与改进**：

- 按标准递推，代码第一项漏乘 `x`。例如 $P_2(x)=(3x^2-1)/2$，取 `x=2` 应得 `5.5`，现有程序得到 `2.5`。本地题面转录缺失公式（原稿此处是图片），笔记使用标准定义；若课程题面确有不同定义，以题面为准。**待确认**：原题公式是否含因子 `x`。
- 用 `float` 只有约 7 位有效数字，`n` 大时误差累积，建议 `double`。
- 朴素递归会重复计算同一阶。题目明确要求递归时，可记忆化，使时间和空间都降为 $O(n)$，其中空间含递归栈。允许迭代时，从 $P_0$、$P_1$ 向前推即可，时间 $O(n)$，额外空间 $O(1)$。

**原始代码**

```cpp
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

[查看原始 D.cpp](https://drive.google.com/file/d/1asaJ0xJycF5a_tkTlN8vYh5MvGi-VYuw/view?usp=drivesdk)

**补充解法**　按标准勒让德公式补回乘数 `x`，保留递归并缓存每一阶的结果。每次输入重新建表，复杂度由指数级降到 $O(n)$。

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

优势有两处：一是把重复子问题只算一次，$T(n)=T(n-1)+T(n-2)$ 从斐波那契级增长降为 $O(n)$；二是 `x` 参与乘法，$P_2(2)=5.50$ 与标准定义一致。适用条件是 `n` 从 0 起、`n` 不太大（`n` 可达上千时递归深度可能爆栈，此时改用迭代更稳）。核对：`x=2,n=0` → `1.00`；`n=1` → `2.00`；`n=2` → `5.50`；`n=3` → `17.00`（$P_3(2)=(5\cdot8-3\cdot2)/2=17$）。

## E

<!-- homework-topic: 猜数游戏 -->

> **题目**　**猜数游戏**
>
> 玩家心里想一个 1–1000 的整数，计算机来猜。每次先输出猜测值，玩家输入 `1` 表示猜大了、`-1` 表示猜小了、`0` 表示猜中；猜中后输出一共猜了几次。开始前先输出三行固定开场白。
>
> 输入：依次读入 `1`、`-1`、`0`。输出：开场白、每次的猜测值、猜中后的次数提示。
>
> 示例：心中数为 125 时，程序依次猜 500、250、125，玩家依次输入 `1`、`1`、`0`，最后输出“只猜了 3 次”。

**思路**　维护可行区间 `[low, high]`，每轮猜 `(low+high)/2`；收到 1 就把 `high` 调到 `guess-1`，收到 -1 就把 `low` 调到 `guess+1`，收到 0 输出 `count` 并 `break`。1000 个候选最多 10 次必中（`log2(1000)<10`）。

**边界**　固定文案里的全角标点和空格要跟样例完全一致，否则会被判错；代码是照样例抄的。若玩家回答自相矛盾，循环会因 `low>high` 结束且不再输出，属非法输入，题面未要求处理。

**原始代码**

```cpp
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

[查看原始 E.cpp](https://drive.google.com/file/d/1nZRqZi-AWtTmBxpqF7qp5CMqJ1ixbYNQ/view?usp=drivesdk)

**补充解析**　每轮把候选数至少压掉一半，区间长度从 1000 开始依次为 1000、500、250、125、63、32、16、8、4、2、1，所以最多 10 次。`(low+high)/2` 在 `low+high ≤ 2000` 时不会溢出；若把范围扩大到接近 `INT_MAX`，应写成 `low + (high - low) / 2`。猜中即 `break`，是因为 `k == 0` 时再调整区间已无意义；若漏掉 `break`，会重复猜同一个边界值。

## F

<!-- homework-topic: 股票最优方案 -->

> **题目**　**股票最优方案**
>
> `T` 组数据，每组一周 7 天的股票价格；只允许一次先买后卖，求最大利润，没有获利机会就输出 0。
>
> 输入：首行 `T`，随后每组 7 个价格。输出：每组一行最大利润。
>
> 示例：`7` 天价格 `10 7 5 8 11 9 6` → `6`（第 3 天 5 买入、第 5 天 11 卖出）。

**思路**　一次遍历，维护“此前见过的最低价”`minprice`；当天价格高于它时，用 `price-minprice` 更新 `maxprofit`。`maxprofit` 初值 0，天然处理不能获利的情况。关键是买入必须早于卖出，所以只能和之前的最低价配对，不能拿全局最小值直接相减。

**边界与疑点**：

- `minprice` 用 `unsigned int` 哨兵 `999999999`。如果首日实际价格比这个哨兵高，代码可能算出一笔不存在的获利。可先读第一天的价格，以它初始化最低价，从第二天开始更新利润。
- 价格相等时只更新最低价、不产生利润，结果仍为 0，符合“没有可能获利输出 0”。
- 有无符号混用：`price` 是 `int`、`minprice` 是 `unsigned`，比较时会把 `price` 转成无符号；价格非负时没有问题。

**原始代码**

```cpp
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

[查看原始 F.cpp](https://drive.google.com/file/d/19VQOkMIlfF2wPFkmbS-Ltb4BDRkllOvz/view?usp=drivesdk)

**补充解法**　用第 1 天的真实价格初始化最低价。每天先计算用此前最低价买入的收益，再更新最低价。

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

优势是去掉了哨兵：最低价来自真实输入，不存在「首日价格高于哨兵」的漏洞；先算收益再更新最低价，也保证不会用当天的价格买、当天的价格卖。适用条件是确实只有 7 天且必须先买后卖；天数一改，把循环上界换成实际天数即可。

## G

<!-- homework-topic: 组合数 -->

> **题目**　**组合数**
>
> 多组输入 `m`、`n`，求
>
> $$C(m,n)=\frac{m!}{n!\,(m-n)!}.$$
>
> 要求主函数调用 `Fabricate(m,n)`，其中再调用 `Multi(m,n)`（返回 `m*(m-1)*…*n`），并优化以降低溢出可能。
>
> 输入：多组 `m n`。输出：每组一行组合数。
>
> 示例：`5 2` → `10`；`10 3` → `120`。

**思路**　先利用对称性 `C(m,n)=C(m,m-n)` 把 `n` 压到不超过 `m/2`；`Multi(a, a-b+1)` 得到 `a!/(a-b)!`，`Multi(b,1)` 得到 `b!`，两者相除即得组合数。中间量用 `long long`，最后转回 `int`。

**边界与改进**：

- `n=0` 或 `m=n` 时两个 `Multi` 分别退化为 1，结果 1。
- 即使最终结果装得进 `int`，中间连乘也可能超出 `long long`。例如 $\binom{33}{16}=1\,166\,803\,110$，但分子连乘等于结果再乘以 $16!$，远大于 `long long` 的上限。允许改变函数组织时，可以边乘边除。
- 本地代码把函数写成 `long long` 返回并用小写名。题面给出了 `int Fabricate(int,int)` 和 `int Multi(int,int)`，还要求两者有调用关系。提交时按指定接口实现，边乘边除可作为理解溢出问题的补充。

**补充要点**　边的乘边除写法：

```cpp
long long res = 1;
for (int i = 1; i <= n; ++i)
    res = res * (m - i + 1) / i;   // 每一步都是整数，不会出现小数截断
```

第 `i` 次循环结束后，`res` 等于 $\binom{m}{i}$，所以除以 `i` 时恰好整除。循环前应利用对称性缩小 `n`，并保证乘法中间值不会溢出。

**原始代码**

```cpp
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

[查看原始 G.cpp](https://drive.google.com/file/d/1ZKNe4mQKmscTpTbop6bg9dr3ff8Q8RiG/view?usp=drivesdk)

**补充解析**　`multi` 里的 `for(n;n<=m;n++)` 直接拿形参当循环变量，语法上可行但会改掉实参的副本，可读性差；`fabricate` 先算出 `m!/(m-n)!` 和 `n!` 两个大乘积再相除，是最容易溢出的写法。组合数的结果增长也很快：`C(67,33)` 已超过 `long long`，所以「最终值装得下」并不代表中间量装得下。实测原程序对 `33 16` 输出 `369640`，而正确值是 `1166803110`——分子连乘在 `long long` 内已经回绕。若题面只给小的 `m`，原写法能过；否则应改成上面的边乘边除。

## H

<!-- homework-topic: 美素数 -->

> **题目**　**美素数**
>
> `T` 组数据，每组 `L R`，统计区间内「本身是素数，且各位数字之和也是素数」的整数个数，按 `Case #i: count` 输出。
>
> 输入：首行 `T`，随后每组 `L R`。输出：每组一行 `Case #i: count`。
>
> 示例：`L=1, R=100` → `Case #1: 14`（2、3、5、7、11、23、29、41、43、47、61、67、83、89）。

**思路**　`prime` 试除到 `i*i<=n`，先排除 `n<=1`；`digitsum` 取模累加，`sum` 在循环外清零一次。主循环对每个数先判素数，再算数位和并二次判素数——先判素数能省掉大部分数位和计算。

**边界与改进**：

- 1 不是素数，代码已排除；各位数字和为 1 也不可能通过素数判断。
- 多组区间若很大或大量重叠，逐个试除的总代价是 O(T·(R-L)·√R)。若 `R` 达 1e6 量级、`T` 很大，可先筛素数，再预处理“美素数”的前缀个数，使每组查询 O(1)。题面未给数据范围，**待确认**。
- `L>R` 时循环不执行、输出 0，题面未说明这种输入。

**原始代码**

```cpp
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

[查看原始 H.cpp](https://drive.google.com/file/d/1Xi2mEDjUN0tEns6MJdQePQ1IZouCAXm5/view?usp=drivesdk)

**补充解法**　先筛出素数，再一次性标出「美素数」，用前缀和把每组查询降到 O(1)。

```cpp
#include <iostream>
#include <vector>

int main() {
    const int LIMIT = 1000000;
    std::vector<bool> isPrime(LIMIT + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= LIMIT; ++i) {
        if (!isPrime[i]) continue;
        for (int j = i * i; j <= LIMIT; j += i) isPrime[j] = false;
    }

    std::vector<int> prefix(LIMIT + 1, 0);
    for (int n = 1; n <= LIMIT; ++n) {
        int digitSum = 0;
        for (int t = n; t > 0; t /= 10) digitSum += t % 10;
        const bool beautiful = isPrime[n] && digitSum <= LIMIT && isPrime[digitSum];
        prefix[n] = prefix[n - 1] + (beautiful ? 1 : 0);
    }

    int cases;
    if (!(std::cin >> cases)) return 0;
    for (int i = 1; i <= cases; ++i) {
        int left, right;
        std::cin >> left >> right;
        const int total = (right >= 1 ? prefix[right] : 0)
                        - (left - 1 >= 1 ? prefix[left - 1] : 0);
        std::cout << "Case #" << i << ": " << total << '\n';
    }
}
```

优势是把「判素数」和「数位和」的重复工作移到预处理，`T` 再大也只付一次 $O(R\log\log R)$ 的筛法代价；适用条件是 `R ≤ 10^6`（上界可改，代价是内存与预处理时间同比增长）。数位和最大为 `9 × 6 = 54`，远小于 `LIMIT`，所以 `isPrime[digitSum]` 一定在表内。核对：`[1,100]` 给 14，`[2,2]` 给 1，`[3,19]` 给 4（命中的是 3、5、7、11；13、17、19 的数位和 4、8、10 都不是素数）。

## I

<!-- homework-topic: 寻找不同数字组合个数 -->

> **题目**　**寻找不同数字组合个数**
>
> 多组输入非负整数 `n`，统计 `0 <= x < 10^n` 中各位数字互不相同的整数个数。例 `n=2` 时，0–99 共 100 个数里去掉 11、22、…、99 这 9 个，得 91。
>
> 输入：多组 `n`。输出：每组一行答案。
>
> 示例：`n = 0` → `1`；`n = 1` → `10`；`n = 2` → `91`。

**思路**　不要用“总数减有重复”，直接按位数构造：

- 1 位数（含 0）：10 个。
- `i` 位数（`2<=i<=n`）：首位不能为 0，有 9 种；其余 `i-1` 位从剩下 9 个数字中有序选取，共 `P(9,i-1)=9*8*…` 种。合计 `9*P(9,i-1)`。
- 累加所有位数即以 10 为上界的答案；`n=0` 时只有 0，返回 1。

`A(m,k)` 就是 `m*(m-1)*…*(m-k+1)`，代码用倒序循环实现。

**边界与疑点**：

- 代码对 `n>=11` 直接输出 0。但按例子的区间口径，`n` 超过 10 后答案不应再增加，也不会变成 0：不存在 11 位各位互异的整数，可是位数更少的数仍在 `0<=x<10^n` 内。因此 `n=11` 的答案应等于 `n=10`（8,877,691）。**待确认**题面在 `n>10` 时的预期；若数据保证 `n<=10` 则这段分支不会被触发。
- `n=10` 时中间量最大约 `9*9!≈3.27e6`，结果 8,877,691，均在 `int` 内。

同题的另一份源文件见 [第四次作业补充 E](/books/campus-cpp-programming/09-oj-homework-04-supplement/#zh-e)。

**原始代码**

```cpp
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

[查看原始 I.cpp](https://drive.google.com/file/d/1vjdCccuxmG9FLzDFT77zbvr6PMYftlMa/view?usp=drivesdk)

**补充解析**　把「按位数构造」写成公式，可以逐项核对 `n = 10` 的累计：

$$
10+\sum_{i=2}^{10}9\cdot A(9,i-1)
=10+81+648+4536+27216+136080+544320+1632960+3265920+3265920
=8\,877\,691.
$$

每位新增时可供选择的数字少一个，这正是 `9,8,7,…` 递减的来源；到第 10 位时只剩 1 个数字可用，所以 `A(9,9)=9!`。10 位以上没有新数可加，累计值保持不变。

## J

<!-- homework-topic: 字典序 -->

> **题目**　**字典序**
>
> 多组输入 `n`、`k`，把 `1..n` 按十进制字符串的字典序排序，输出第 `k` 个数。
>
> 输入：多组 `n k`。输出：每组一行答案。
>
> 示例：`n=13, k=2` 时顺序为 `1,10,11,12,13,2,3,…,9`，第 2 个是 10。

**思路**　把 `1..n` 看成一棵十叉前缀树，`getcount(prefix)` 统计以 `prefix` 为前缀且不超过 `n` 的数的个数。按层累加：当前层区间 `[first, last]` 与 `n` 取交，`count += min(n,last)-first+1`，然后 `first*=10`、`last=last*10+9` 进入下一层。

从 `prefix=1` 出发：

- 若 `k<=count`，答案在这棵子树里；`k==1` 就是 `prefix` 本身，否则下降一层：`prefix*=10`、`k-=1`（扣掉根节点）。
- 否则整棵子树跳过：`k-=count`、`prefix+=1`。

以 `n=13, k=2` 验证：`count(1)=5`（1、10、11、12、13），`k=2` 不是 1，下降到 `prefix=10`、`k=1`；下一轮 `count(10)=1`，`k==1`，输出 10。

**边界与疑点**：

- `first` 和 `last` 使用 `int`，进入下一层时可能在判断 `first <= n` 之前就发生溢出。例如 `n = 10^9` 时下一层可达 `10^10`。若 `n` 为 `int`，用 `long long` 保存区间端点即可覆盖这些中间值。
- 需要 `1<=k<=n`；`k=0` 或越界会陷入死循环，题面未要求处理。

逐个求后继的入门写法见 [第四次作业补充 G](/books/campus-cpp-programming/09-oj-homework-04-supplement/#zh-g)。

**原始代码**

```cpp
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

[查看原始 J.cpp](https://drive.google.com/file/d/1dkBL0eerD4u4ojGFO5P8jrQQpsqUuOk_/view?usp=drivesdk)

**补充解法**　先数当前十进制前缀覆盖的整数，再整棵跳过或进入下一层。端点用 64 位整数，覆盖原代码使用的 32 位输入范围。

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

优势是把「第几个」换算成 0 基下标：`k == 0` 表示当前节点就是答案，于是不必在每层单独判断 `k == 1`，循环条件也更直接。适用条件仍是 `1 <= k <= n`；若越界，`prefix` 会一直加到 `n+1` 而循环不停止。核对：`n=13,k=1` → `1`；`k=5` → `13`；`k=6` → `2`；`k=13` → `9`。

## 方法小结

- 先写清公式，再决定用 `int`、`long long` 还是 `double`；乘方和连乘要在运算前转类型。
- 需要判断溢出时，「先判后算」比「算完再比」可靠；上界比较可以写成 `a > MAX / b`。
- 递归题先分清递归基与递推式，再考虑是否记忆化；能写成迭代且不丢状态时，`O(1)` 额外空间更稳。
- 搜索与计数先想数据结构：区间折半是二分，前缀计数是十叉树，区间查询可以预处理成前缀和。
