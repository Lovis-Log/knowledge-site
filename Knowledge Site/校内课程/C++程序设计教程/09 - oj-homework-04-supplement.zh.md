---
slug: "09-oj-homework-04-supplement"
title: "第四次作业补充（数位计数、递推与搜索）"
summary: "数位计数、约瑟夫环、素数、整数拆分与字典序。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "04"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/1t-f3t2lQ_2TgHaeMOwWyGFRUjAmnzpSF"
---

**来源**　课后作业

ddl 26.10.30 ｜ A–G 共 7 题

题意按 `0catalog` 的题名与本地 `.cpp` 的题面注释还原；程序与题面不一致的地方单列，题面没有给出、又会影响提交的部分标为 **待确认**。

## A

<!-- homework-topic: 1的个数 -->

> **题目**　**1的个数**
>
> 先读组数 `T`，每组一个十进制整数 `N`，统计 `1` 到 `N` 的所有整数中数字 `1` 一共出现了多少次，输出一个总数。
>
> `2` 输出 `1`，`12` 输出 `5`。

**思路**　写一个拆位函数统计单个整数里 `1` 的个数，再枚举 `1..N` 累加。

**关键变量**　`getcount` 里 `n /= 10` 必须在取模之后，否则会丢掉当前位；`total` 每组都要重新置 0，否则上一组的结果会累加进来（注释里写了这一条）。外层用 `while (T--)` 而不是 `if`，少写一个循环就只处理第一组。

**复杂度**　枚举每个数并拆位，时间 `O(N log N)`，在 `N` 到 `10^6` 量级时可以接受。

**补充解法**　按数位统计，把复杂度降到 `O(log N)`。对位权 `place`（1、10、100…），每 `10 * place` 个数里，这一位恰好有 `place` 个 `1`。设 `high = N / place / 10`、`digit = N / place % 10`、`low = N % place`，则完整段贡献 `high * place`，最后一段再按 `digit` 补：`digit == 0` 补 0，`digit == 1` 补 `low + 1`，`digit > 1` 补 `place`。

```cpp
long long countOnes(int n) {
    long long count = 0;
    for (long long place = 1; place <= n; place *= 10) {
        const long long high = n / place / 10;
        const int digit = n / place % 10;
        const long long low = n % place;

        count += high * place;
        if (digit == 1) {
            count += low + 1;
        } else if (digit > 1) {
            count += place;
        }
    }
    return count;
}
```

**为什么按位拆就够**　每个 `1` 都恰好属于一个数位，按位分别数再把结果相加，不会重不漏。以 `N = 213` 的十位为例：`10–19`、`110–119` 两整段各 10 个，最后一段 `210–213` 有 4 个，共 24 个。三档补充的来历是：当前位为 0 时尾段一个都没有；为 1 时尾段只到 `low` 为止；大于 1 时尾段已经走满一整段。

**边界**　`N = 0` 时答案为 0。`N` 取 `int` 上限 `2147483647` 时答案约 `2.97×10^9`，已经超出 `int`，所以答案与位权都要用 `long long`（实测该输入下累加值 `2971027783`）。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int getcount(int n) {
    int count=0;
    while(n>0) {
        int k;
        k=n%10;
        n/=10;
        if(k==1) {
            count++;
        }
    }
    return count;
}

int main() {
    int T;
    cin>>T;
    while(T--) {                //不要错用if
        int N;
        cin>>N;
        int total=0;            //注意初始化为0
        for(int i=1;i<=N;i++) {
            total+=getcount(i);
        }
        cout<<total<<endl;
    }
}
```

[查看原始 A.cpp](https://drive.google.com/file/d/1HzbMRVhansO3VnR518OWcc71Sv_csG6H/view?usp=drivesdk)

## B

<!-- homework-topic: 围圈报数游戏 -->

> **题目**　**围圈报数游戏**
>
> `n` 个人围成一圈，编号 1 到 `n`，从 1 号开始按 1、2、3 循环报数，报到 3 的人退出，求最后留下的人的原始编号。题面给出 `0 < n <= 50`，多组输入 `n`，读到文件结束。
>
> `3` 输出 `2`，`1` 输出 `1`，`50` 输出 `11`。

**思路**　这是报数上限为 3 的约瑟夫环。把编号改成 `0..n-1`，设 `f(i)` 为 `i` 个人时最后留下者的 0 基编号，则 `f(1) = 0`，且 `f(i) = (f(i-1) + 3) % i`。

**为什么这个递推成立**　淘汰第一个人后，剩下 `i-1` 个人仍然围成一圈。把「下一轮从谁开始报数」的那个人重新编为 0 号，这个新圈里的幸存者编号就是 `f(i-1)`。旧编号与新人号之间是一个整体旋转：新 0 号在旧编号里是第 3 个位置（人数不足时按 `% i` 回绕），所以旧编号 = `(新编号 + 3) % i`。这正是递推式的来源。

**关键变量与循环状态**　`answer` 表示「当前人数下幸存者的 0 基编号」，循环从 `i = 2` 推到 `n`，每次用上一步的 `answer` 更新自己——所以只需要一个变量，不必开数组模拟退出过程。最后 `+1` 换回题目从 1 开始的编号。

**为什么不用模拟**　模拟需要维护「谁还在圈里」和「下一个从谁开始」，`n` 次删除、每次最多扫 `n` 步，代价 `O(n²)`。递推只有 `O(n)` 时间、`O(1)` 空间，`n <= 50` 时差别不大，但把上限放大到 `10^9` 时只有递推还能跑。

**边界**　`n = 1` 时循环不执行，`answer = 0`，输出 1。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int N;
    while(cin>>N) {
        int answer=0;
        for(int i=2;i<=N;i++) {
        answer=(answer+3)%i;
        }
        cout<<answer+1<<endl;          //注意最后加1，因为answer从0开始编号
    }
}

/*约瑟夫环问题
有n个人编号为0,1,2, .. ,n-1,围坐在一张圆桌周围。编号为0的人开始报数,数到m-1的那个人出
列;他的下一个人又从0开始报数,数到m-1的那个人继续出列;依此规则重复下去,直到剩下最
后一人,那么最后剩下的人编号是多少?
设最后剩下的人的编号是f(n),则f(n)=[f(n-1)+m]modn

证明:第一轮,编号(m-l)mod n的人出列此时剩下n-1个人,仍是一个圈,但起点变化
设k=(m-l)modn,则下一个报数的人是(k+l)mod n，把他看作新的0号
而我们知道,编号0.1.2,…,n-2中.最后剩下的是f(n-1)
新编号f(n-1),对应旧编号[f(n-1)+k+1]mod n
所以f(n)= [f(n-1) + k+l ] mod n
       = [f(n-1) + (m-1)mod n + 1 ] mod n
       =[f(n-1)+m]modn

注：从0编号是为了对应模取余结果为0，1，2.....,n-1
*/
```

[查看原始 B.cpp](https://drive.google.com/file/d/1j9bCq4ecaQ9_4__LxeC1X1CWO81x9H6q/view?usp=drivesdk)

## C

<!-- homework-topic: 分解偶数为两素数之和 -->

> **题目**　**分解偶数为两素数之和**
>
> 读入偶数 `n`，把它表示成两个素数之和，按 `n=i+(n-i)` 的形式输出一组。多组输入读到文件结束，每组一行。
>
> `10` 输出 `10=3+7`，`4` 输出 `4=2+2`，`100` 输出 `100=3+97`。

**思路**　从小到大枚举较小的加数 `i = 2..n/2`，同时判断 `i` 和 `n - i` 是否都是素数，找到第一组就输出并 `break`。

**关键步骤**　素数判断先排除小于 2 的数（0 和 1 不是素数），再用 `i * i <= n` 试除到平方根——因子成对出现，只需试到 `sqrt(n)`。`break` 保证每个输入只输出一种表示。

**为什么必须 `break`**　注释里保留了第一版，它没有 `break`，会把所有分解都打印出来。`100` 有 `3+97`、`11+89`、`17+83`、`29+71`、`41+59`、`47+53` 六组，OJ 只要求一组，多输出就会判错（源文件上方的「输出超限，需重写」正是这个原因）。

**边界**　`n = 4` 时 `i` 只取 2，输出 `4=2+2`。`n = 2` 时没有符合条件的两个素数，原程序没有输出。题目只要求处理偶数。

**待确认**　题面只写「输入一个偶数」，是否多组；是否要求输出「较小加数最小」的那一组（程序按 `i` 从小到大枚举，天然满足）。

**原始代码**

```cpp
//输出超限，需重写

/*
#include <iostream>
using namespace std;

bool isprime(int n) {
    for(int i=2;i*i<=n;i++) {
        if(n%i==0) {
            return 0;
        }
    }
    return 1;      //注意放在for循环外面
}

int main() {
    int n;
    while(cin>>n) {
        for(int i=2;2*i<=n;i++) {
            if(isprime(i)==1&&isprime(n-i)==1) {
                cout<<n<<"="<<i<<"+"<<n-i<<endl;
            }
        }
    }
}

*/

#include <iostream>
using namespace std;

bool isprime(int n) {
    if (n < 2) return false;          // 0、1 不是素数
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int n;
    while(cin >> n) {

        for (int i = 2; i <= n / 2; i++) {
            if (isprime(i) && isprime(n - i)) {
                cout << n << "=" << i << "+" << n - i << endl;
                break;                    // 找到一种表示后立即结束
            }
        }
    }

    return 0;
}
```

[查看原始 C.cpp](https://drive.google.com/file/d/1DoXdyxEQQKkHc_H5v36aElwMTiecAbb1/view?usp=drivesdk)

## D

<!-- homework-topic: 计算两圆相交面积 -->

> **题目**　**计算两圆相交面积**
>
> 每组读六个实数 `x1 y1 r1 x2 y2 r2`（圆心与半径），输出两圆相交部分的面积，保留两位小数。多组读到文件结束。
>
> 两圆重合（`0 0 1 0 0 1`）输出 `3.14`；相离或外切面积为 0。

**思路**　先求圆心距 `d`，按位置关系分三种：

- `d >= r1 + r2`：相离或外切，面积 0。
- `d <= |r1 - r2|`：一圆包含另一圆或内切，面积是较小圆的 `π r²`。
- 其余：部分重叠，拆成两个圆弓形相加。

**为什么弓形公式长这样**　两圆心与任一个交点构成边长为 `d`、`r1`、`r2` 的三角形。由余弦定理得到第一圆里「圆心连线」与「到交点的半径」的夹角余弦 `(d²+r1²-r2²)/(2 d r1)`；乘 2 就是两条半径张成的圆心角 `θ1`。半径 `r1`、圆心角 `θ1` 的扇形面积是 `θ1 r1² / 2`，再减去两边为 `r1`、夹角为 `θ1` 的三角形面积 `r1² sin θ1 / 2`，剩下的就是落在圆外的那个弓形：`S1 = r1²(θ1 - sin θ1)/2`。两圆各算一次相加即为交集。

**关键步骤**　先判相离和内含，也就同时避开了 `d = 0`（同心）和半径为 0 时除以 0 的问题——这两种情况都会落进前两个分支。`pi = acos(-1)` 比手写 3.1415926 精度高，代价只是一次函数调用。

**缺陷（输出格式）**　`cout << 0.00` 在默认浮点格式下打印的是 `0`，不是 `0.00`。第一组就是相离时实测输出 `0`；只有在此前某组走过 `fixed << setprecision(2)` 的分支后，`fixed` 才会因为「粘性」继续生效，后续相离组才输出 `0.00`。同一份输入只要调换组的顺序，输出长度就变，这在字符比对上必错。

**补充解法**　在循环外统一设置格式，并把 `acos` 的参数夹到 `[-1, 1]` 内，防止浮点误差让余弦略微越界而返回 `NaN`。

```cpp
#include <algorithm>
#include <cmath>
#include <iomanip>
#include <iostream>

int main() {
    const double pi = std::acos(-1.0);
    double x1, y1, r1, x2, y2, r2;
    std::cout << std::fixed << std::setprecision(2);
    while (std::cin >> x1 >> y1 >> r1 >> x2 >> y2 >> r2) {
        const double d = std::hypot(x1 - x2, y1 - y2);
        if (d >= r1 + r2) {
            std::cout << 0.0 << '\n';
        } else if (d <= std::fabs(r1 - r2)) {
            const double r = std::min(r1, r2);
            std::cout << pi * r * r << '\n';
        } else {
            double c1 = (d * d + r1 * r1 - r2 * r2) / (2 * d * r1);
            double c2 = (d * d + r2 * r2 - r1 * r1) / (2 * d * r2);
            c1 = std::max(-1.0, std::min(1.0, c1));
            c2 = std::max(-1.0, std::min(1.0, c2));
            const double a1 = 2 * std::acos(c1);
            const double a2 = 2 * std::acos(c2);
            std::cout << 0.5 * r1 * r1 * (a1 - std::sin(a1))
                       + 0.5 * r2 * r2 * (a2 - std::sin(a2)) << '\n';
        }
    }
}
```

在 300 组随机圆心与半径上与原程序对比，除「首组相离的 `0` / `0.00`」外数值完全一致；`hypot` 比 `sqrt(dx*dx+dy*dy)` 多一层溢出保护，坐标很大时才显出差别。

**待确认**　半径是否保证非负；两圆重合时是否要求输出整个圆面积（当前 `d = 0` 且 `r1 = r2` 会走内含分支，得到 `π r²`，正确）。

**原始代码**

```cpp
#include <iostream>
using namespace std;
#include <iomanip>
#include <algorithm>
#include <cmath>

const double pi=acos(-1);   //精确地求出圆周率 π 的值（因为 arccos(−1)=π，这比手动写 3.1415926 精度高得多。

int main() {
    double x1,y1,r1,x2,y2,r2;
    while(cin>>x1>>y1>>r1>>x2>>y2>>r2) {
        double dx=x1-x2;
        double dy=y1-y2;
        double d=sqrt(dx*dx+dy*dy);
        double R=r1+r2;
        double r=min(r1,r2);

        if(d>=R) {
            cout<<0.00<<endl;
        } else if(d<=fabs(r1-r2)) {             //容易漏掉内含和内切的情况！调用绝对值函数
            cout<<fixed<<setprecision(2)<<pi*r*r<<endl;
        } else {
            double angle1=2*acos((d*d+r1*r1-r2*r2)/2/d/r1);    //余弦定理
            double angle2=2*acos((d*d+r2*r2-r1*r1)/2/d/r2);
            double area1=0.5*r1*r1*(angle1-sin(angle1));       //扇形面积公式0.5*r*r*α，算弓形面积
            double area2=0.5*r2*r2*(angle2-sin(angle2));
            cout<<fixed<<setprecision(2)<<area1+area2<<endl;
        }
    }
}



/*
// 强制限定在 [-1.0, 1.0] 之间
cos_a1 = max(-1.0, min(1.0, cos_a1));
cos_a2 = max(-1.0, min(1.0, cos_a2));
潜在隐患：acos 的精度越界
在浮点数计算中，(d*d+r1*r1-r2*r2)/2/d/r1 算出来的理论值在 [−1,1] 之间，但由于计算机浮点误差，它可能算出来是 1.0000000000000002。
一旦传给 acos，就会返回 NaN（非数字），导致输出错误。
修改：用 max(-1.0, min(1.0, val)) 把参数强制限制在 [−1,1] 范围内。

可以在代码开头时初始化area=0,最后统一cout<<area.可简化代码
*/
```

[查看原始 D.cpp](https://drive.google.com/file/d/1L5yxAFKHGc3b33Kh7oXCj1hrV47TDIVj/view?usp=drivesdk)

## E

<!-- homework-topic: 寻找不同数字组合个数 -->

> **题目**　**寻找不同数字组合个数**
>
> 多组输入非负整数 `n`，统计 `0 <= x < 10^n` 中各位数字互不相同的整数个数。
>
> `2` 输出 `91`，`10` 输出 `8877691`。

**思路**　按位数分类，直接构造而不是「总数减去重复的」：

- 1 位数含 0，共 10 个。
- 长度 `L >= 2` 时，首位不能为 0，有 9 种；后面 `L-1` 位从剩下的 9 个数字里有顺序地选，共 `A(9, L-1)` 种。这类数共 `9 · A(9, L-1)` 个。
- 累加 `L = 1..n` 即得答案；`n = 0` 时区间为 `[0, 1)`，只有 0，返回 1。

**关键步骤**　`A(m, k) = m(m-1)…(m-k+1)`，代码用倒序循环实现，只算乘法不除阶乘。每多一位就从「尚未使用」的数字里再选一个，乘法过程本身保证了各位互不相同，不需要额外判重。

**为什么不能「总数减重复」**　重复数字的形态要按「哪几位相同、相同的是哪个数字」分类，容斥层数随位数增长；按位构造只有一层乘法，`n <= 10` 时直接得到结果。

**缺陷（`n >= 11`）**　代码对 `n >= 11` 直接输出 0。但按题面的区间口径，`10^11` 以内的合法数并不会消失，只是不存在 11 位各位互异的数：答案应停在 `n = 10` 的 `8877691`，而不是归零。顺带一提，`A(9, 10)` 在实现里会把 0 也乘进去，结果同样是 0，所以这个分支不能用来兜底。实测 `11` 输出 `0`。

**边界**　`n = 10` 的中间量最大约 `9 · 9! ≈ 3.27×10^6`，最终结果 `8877691` 都在 `int` 范围内。`n = 0` 与 `n = 1` 分别由单独分支处理。

**待确认**　题面是否限制 `n <= 10`；`n = 0` 时区间端点如何定义。若数据保证 `n <= 10`，`n >= 11` 分支不会被触发。

同题见 [第三次作业 I](/books/campus-cpp-programming/11-oj-homework-03/#zh-i)。

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

[查看原始 E.cpp](https://drive.google.com/file/d/1QmHiwYfI2dGF1Mfar0deRyOLBDWlz6kQ/view?usp=drivesdk)

## F

<!-- homework-topic: 放课本 -->

> **题目**　**放课本**
>
> 把 `n` 本相同的书放进 `k` 张相同的课桌，每张桌可以放 0 到 `n` 本，不考虑摆放顺序，求方案数。多组输入 `n k`，读到文件结束。代码注释给出的范围是 `1 <= n, k <= 20`。
>
> `6 4` 输出 `9`，`20 20` 输出 `627`。

**思路**　这是「把 `n` 分成至多 `k` 个无序正整数」的整数拆分。设 `dp[i][j]` 为 `i` 本书放进 `j` 张相同课桌的方案数，按「是否至少有一张空桌」分类。

**关键步骤**

- 有空的课桌：等价于只用了 `j-1` 张，方案数 `dp[i][j-1]`。
- 所有课桌都非空：先给每张桌放 1 本，剩下 `i-j` 本仍分到 `j` 张桌，方案数 `dp[i-j][j]`。
- 两者相加即 `dp[i][j] = dp[i][j-1] + dp[i-j][j]`；`i < j` 时多出的空桌不影响方案，`dp[i][j] = dp[i][i]`。

**为什么这样分类不重不漏**　「有没有空桌」把方案分成互斥的两类；第一类去掉那张空桌即与 `dp[i][j-1]` 一一对应，第二类把所有桌各减 1 本即与 `dp[i-j][j]` 一一对应。两次对应都是双射，所以相加正好覆盖全部方案。

**为什么不能用隔板法**　隔板法数的是「把 `n` 分成 `k` 个有序的份额」，而课桌相同，`(1,0,2,3)` 与 `(3,1,2,0)` 算同一种。隔板法的结果会大出几十倍。

**边界**　`dp[0][j] = 1`（没有书只有一种放法）、`dp[i][1] = 1` 是递推的两条底边。`i < j` 时先读 `dp[i][i]`，而 `dp[i][i]` 在同一行的 `j = i` 处已经算过，所以内层 `j` 从 1 递增就能保证读到有效值。答案最大 `p(20) = 627`，`int` 足够。

**补充要点**　代码注释担心「`dp[20][20]` 会越界」，实际数组是 `dp[25][25]`，下标 0–24，`dp[20][20]` 合法，这句注释可以忽略。预计算只做到 20，若 `n` 或 `k` 超出这个范围会读到 0，需要按题面上限放宽数组和循环界限。

**待确认**　输入是否确为多组 `n k` 到 EOF；`n`、`k` 是否严格不超过 20。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int dp[25][25];       //定义二维数组（从0开始编号），1<=n,k<=20
                      //访问 dp[20][20] 只有0~19下标，会越界。其实dp[21][21]就够了

int main() {
    for (int j = 0; j <= 20; j++)   //初始化
        dp[0][j] = 1;

    for (int i = 0; i <= 20; i++)
        dp[i][1] = 1;

    for (int i = 1; i <= 20; i++) {
        for (int j = 1; j <= 20; j++) {
            if (i < j)
                dp[i][j] = dp[i][i];
            else
                dp[i][j] = dp[i][j-1] + dp[i-j][j];
        }
    }

    int n, k;
    while (cin >> n >> k) {
        cout << dp[n][k] << endl;
    }

    return 0;
}


/*
状态转移方程
定义：  dp[i][j] 表示将 i 本相同的书放到 j 张相同的课桌上的不同方案数。
我们分两种情况讨论。
情况 1：至少有一张课桌是空的
相当于把 i 本书放到 j−1 张课桌：dp[i][j-1]

情况 2：所有课桌都不为空
先给每张课桌放一本书，剩下 i−j 本书继续分配给 j 张课桌：dp[i-j][j]
因此：dp[i][j]=dp[i][j-1]+dp[i-j][j]

当 (i<j) 时，当书的数量小于桌子的数量时，多出来的桌子不会影响分配方案数。
必然存在空课桌，因此：dp[i][j]=dp[i][i]（此时就可以用递推公式了）

初始条件  dp[0][j]=1    dp[i][1]=1;

这里不能用隔板法
（1，2，3，0） （3，2，1，0）
对于不同的课桌，是两种方案；对于相同的课桌，却是同一种方案。
*/
```

[查看原始 F.cpp](https://drive.google.com/file/d/1CbGuYu5wDJSKJktnX5k1CzIa-MtPOcKL/view?usp=drivesdk)

## G

<!-- homework-topic: 字典序中第k个数 -->

> **题目**　**字典序中第k个数**
>
> 把整数 `1..n` 按字典序排列，输出第 `k` 个。多组输入 `n k`，读到文件结束。
>
> `13 2` 输出 `10`（序列为 1、10、11、12、13、2、3、…、9），`1 1` 输出 `1`。

**思路**　把数字看成十进制前缀树：节点 `x` 的子节点是 `x*10` 到 `x*10+9`，字典序就是这棵树的先序遍历。从 `x = 1` 出发，重复 `k-1` 次求「下一个字典序数」。

**关键步骤**　每一步只有三种动作：

- 有子节点（`x*10 <= n`）就向下走一步：`x *= 10`。
- 否则向右找兄弟：`x++`。
- 向右之前若已到分支末尾——`x % 10 == 9`，或 `x+1 > n`——就先退回父节点，即反复 `x /= 10`，再 `x++`。

**为什么总时间是 `O(k)`**　每一次 `x /= 10` 都对应之前的一次 `x *= 10`，下降次数不超过总步数，所以内层 `while` 的总上跳次数也是 `O(k)`，均摊下来每步 `O(1)`。

**易错点**　`while (x % 10 == 9 || x + 1 > n)` 里的 `x + 1 > n` 不能省。它处理的是「当前节点是父节点的最后一个合法子节点」：例如 `n = 13` 时从 `13` 往右没有 `14`，必须先退到 `1` 再进 `2`。判断能否下降写成 `x <= n / 10` 可以避免 `x * 10` 在 `n` 接近 `int` 上限时溢出。

**边界**　算法要求 `n >= 1` 且 `1 <= k <= n`，代码没有校验。`k = 1` 时循环不执行，输出 1。

**补充解法**　`O(k)` 在 `k` 很大时会超时。改成先数出每个前缀子树的节点数，整棵子树都在第 `k` 个之前就一次跳过，复杂度降到 `O(log² n)`：

```cpp
#include <algorithm>
#include <iostream>

// 统计以 prefix 为根、不超过 n 的子树节点数
long long subtreeSize(long long prefix, long long n) {
    long long count = 0;
    long long last = prefix;
    for (long long first = prefix; first <= n; first *= 10, last = last * 10 + 9) {
        count += std::min(n, last) - first + 1;
    }
    return count;
}

int main() {
    long long n, k;
    while (std::cin >> n >> k) {
        long long x = 1;
        for (long long step = 1; step < k;) {
            const long long size = subtreeSize(x, n);
            if (step + size <= k) {   // 整棵子树都在第 k 个之前，跳过
                ++x;
                step += size;
            } else {                  // 第 k 个在这棵子树里，向下走
                x *= 10;
                ++step;
            }
        }
        std::cout << x << '\n';
    }
}
```

`subtreeSize` 按层累加：第 `d` 层覆盖 `[prefix·10^d, prefix·10^d + 10^d - 1]`，与 `n` 取交后求长度，层数只有 `O(log n)`。每层要么整棵跳过、要么下降一层，所以总共 `O(log n)` 次「数子树」，每次 `O(log n)`。

**边界（补充解法）**　应保证 `1 <= k <= n`。此实现适用于 `n` 在 32 位有符号整数范围内的输入，节点总数最多为 `n`。用 `long long` 是为了给区间端点的乘 10 和加 9 留出空间。

**待确认**　题面只写 `n` 为非负整数，未给 `n`、`k` 的范围；若 `k` 可达 `10^9`，需要上面这种跳子树的写法。

同题见 [第三次作业 J](/books/campus-cpp-programming/11-oj-homework-03/#zh-j)。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, k;

    while (cin >> n >> k) {
        int x = 1;

        for (int i = 1; i < k; i++) {
            if (x * 10 <= n) {
                x *= 10;
            }
            else {
                while (x % 10 == 9 || x + 1 > n) {
                    x /= 10;
                }
                x++;
            }
        }

        cout << x << endl;
    }

    return 0;
}


/*
情况 1：向下走
如果当前数字乘 10 不超过 n：    if (x * 10 <= n)
                               x *= 10;
例如：1 -> 10  相当于从父节点走到第一个子节点。
情况 2：向右走
如果没有子节点，就尝试访问下一个兄弟节点。:   x++
例如：10->11
情况 3：向上返回
如果已经走到当前分支的末尾，例如：19->2
就需要先返回父节点：19->1
然后访问下一个兄弟：1->2
对应：while (x % 10 == 9 || x + 1 > n) {
     x /= 10;
    }
    x++;
其中：
- x % 10 == 9：当前已经是最后一个兄弟节点。
- x + 1 > n：下一个数字超出了范围。
*/
```

[查看原始 G.cpp](https://drive.google.com/file/d/1F_jvmKKT96Cv55m6rTYjNDRINyoD4ghM/view?usp=drivesdk)

## 方法小结

这一组的题面都很短，难点全在「换一个角度数数」：

- **计数要按结构分治**：`1` 的个数按数位拆、互异数字按长度拆、课本按「有没有空桌」拆、字典序按前缀树拆。拆完之后每一块都能用一个乘法或一次加法得到，避免逐个枚举。
- **递推成立要能说清对应关系**：约瑟夫环的 `(f(i-1)+3) % i`、整数拆分的两条分支，都靠「新旧编号/方案之间是双射」才相加。写不出这层对应，公式就只是背下来的。
- **先分类再计算，能避开边界**：两圆面积先判相离与内含，同心的除零、半径为零的退化就都不用单独处理。
- **复杂度要留余量**：`O(N log N)` 的枚举、`O(k)` 的遍历、`O(n²)` 的模拟在小题上都能过，但把上限放大一个量级就会超时；同一题准备一个对数级写法，是这类搜索题最值得迁移的习惯。
