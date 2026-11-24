---
slug: "13-oj-midterm-review"
title: "期中考试复盘（日期、数位与素数）"
summary: "工作日、数位统计、校验码与回文素数。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "08"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/1GVRWqxhDooFX-dAtBCcryk8V22rbkaVF"
---

**来源**　课后作业

A–F 共 6 题。题意取自各 `.cpp` 顶部的题面注释；注释没有写明、又会影响提交的部分标为 **待确认**。

## A

<!-- homework-topic: 工作日日期推算 -->

> **题目**　**工作日日期推算**
>
> 实验室只在周一至周五开放，给定起始日期 `y m d` 和星期 `w`，从次日开始数，求第 `k` 个工作日的日期与星期；`k=0` 时原样输出起始日期（即使是周末）。多组输入，不考虑法定节假日。按公历判断闰年。
>
> 输入：多组 `y m d w k`。输出：每组一行 `y m d w`。
>
> 示例：`2026 11 20 5 1`（周五，k=1）→ 下周一 `2026 11 23 1`。

**思路**：直接逐日推进，每走一天：

1. `d++`、`w++`，`w>7` 归 1；
2. 若 `d` 超过当月天数，则月份加一并把 `d` 置 1；若月份超过 12，则年份加一、月份归 1，并重新设置 2 月天数；
3. 若新的 `w` 在 1–5 之间，就让 `k--`。

`k` 减到 0 时循环结束，输出当前 `y m d w`。这样“起始日不计入”“周末不计数”都由“先走一天再判断”自然满足。

**关键细节**：闰年条件是 `y%400==0 || (y%4==0 && y%100!=0)`；跨年时要先把 `md[2]` 复位为 28 再按新年份重判，否则会沿用上一年的 2 月长度。

**边界与疑点**：

- 星期编号按“1–5 为工作日”使用，即 1 表示周一；题面截断处没有写明编号约定，**待确认**。
- 输入保证日期与星期合法，代码未做校验；起始日是周末且 `k>0` 时，会先走到下周一才计第一个工作日。
- 逐日推进的时间是 $O(k)$。当 `k > 0` 且很大时，可以先跳过 `(k - 1) / 5` 个完整星期，每周扣掉五个工作日，再逐日找余下的 1 到 5 个工作日。保留至少一个工作日逐日查找，避免从周末出发且 `k` 恰好是五的倍数时跳过目标日期。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int y,m,d,w,k;
    while(cin>>y>>m>>d>>w>>k) {
         int md[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};
         if(y%400==0||(y%4==0&&y%100!=0)) {
            md[2]=29;
         }

        while(k>0) {
            d++;
            w++;
            if(d>md[m]) {
                m++;
                d=1;
            }
            if(w>7) {
                w=1;
            }
            if(m>12) {
                m=1;
                y++;
                md[2]=28;
                if(y%400==0||(y%4==0&&y%100!=0)) {
                    md[2]=29;
                }
            }
            if(1<=w&&w<=5) {
                k--;
        }

    }
     cout<<y<<" "<<m<<" "<<d<<" "<<w<<endl;
}
}
```

[查看原始 A.cpp](https://drive.google.com/file/d/1pMW1vGGwMQU4ivEi3vhIrSfuiC6MpLgr/view?usp=drivesdk)

**补充解析**　任意连续 7 天恰好包含 5 个工作日，所以可以整周整周地跳。设 `q = (k-1)/5`，先前进 `7q` 天、扣掉 `5q` 个工作日，剩下的 `k-5q` 在 1 到 5 之间，再逐日走最多 7 天。这样时间从 $O(k)$ 降到 $O(1)$，且跳过的都是完整周期，星期的相对位置不变。保留「至少剩 1 个」是为了让最后一步仍然逐日判断，起始日在周末时不会多算或少算。

## B

<!-- homework-topic: 数位平衡数统计 -->

> **题目**　**数位平衡数统计**
>
> 多组输入 `L R`。把正整数的数位从右往左编号为第 1、2、3…位，若奇数位数字之和等于偶数位数字之和，称为“数位平衡数”。统计 `[L,R]` 内这类数的个数以及它们的总和，分两行输出。
>
> 输入：多组 `L R`。输出：每组两行，第一行个数，第二行总和。
>
> 示例：`121` 的奇数位和为 `1+1=2`，偶数位和为 `2`，是平衡数；区间 `[120,122]` 输出 `1` 与 `121`。

**思路**：枚举区间内每个数，用临时变量 `n=i` 逐位从右往左拆：`position` 从 1 开始，奇数位累加到 `odd`、偶数位累加到 `even`，最后比较两者。相等则 `count++`、`sum+=i`。

**关键细节**：不能直接把循环变量 `i` 塞进拆位循环，否则 `i` 被改掉会破坏外层枚举；代码另用了 `n`，这是正确的做法。

**边界与疑点**：

- 题面说“正整数”，但若区间包含 0，拆位循环不执行，`odd==even==0`，代码会把 0 计入；**待确认** `L` 是否保证 ≥1。
- `sum` 用 `int`。平衡数密度不算低，区间上限到 1e6 时总和可能超过 `int`；题面未给 `L,R` 范围，**待确认**。范围大时应改用 `long long`，更大则需按位 DP 统计（同时维护个数与和），复杂度只与数位长度相关。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int L,R;
    while(cin>>L>>R) {
        int sum=0,count=0;
        for(int i=L;i<=R;i++) {
            int position=1;
            int odd=0,even=0;
            int n=i;
            while(n>0) {                        //i是循环变量，不能直接放进这个while
                if(position%2==1) {
                        odd+=n%10;
                        n/=10;
                        position++;
                    } else {
                        even+=n%10;
                        n/=10;
                        position++;
                    }
            }
            if(odd==even) {
                count++;
                sum+=i;
            }
        }
        cout<<count<<endl;
        cout<<sum<<endl;
    }
}
```

[查看原始 B.cpp](https://drive.google.com/file/d/1vByevcDNy1203YRlDyXkT6UBDarIzYzS/view?usp=drivesdk)

**补充解析**　数位编号从右往左，等价于「个位是第 1 位」，所以第一次取 `n%10` 就累加到 `odd`。若从高位往左编号，奇偶会整体错位，结论完全不同；题目特意规定方向，就是为了避免歧义。`int` 上限约 `2.1e9`，而 `[1,10^6]` 内平衡数的总和可达 `10^11` 量级，`sum` 必须用 `long long`。

## C

<!-- homework-topic: 区间好数统计 -->

> **题目**　**区间好数统计**
>
> 多组输入 `a b`，统计 `[a,b]` 中满足“能被 3 整除”且“各位数字之和为偶数”的整数个数。要求按给定原型实现 `digitSum`、`isGood`、`countGood` 三个函数。
>
> 输入：多组 `a b`。输出：每组一行个数。
>
> 示例：`[1,10]` 中 3、6、9 都能被 3 整除，数位和分别为 3（奇）、6（偶）、9（奇），只有 6 同时满足两个条件，输出 `1`。

**思路**：

- `digitSum` 逐位取模累加，返回数位和；
- `isGood` 只写了一句 `digitSum(n)%6==0`。这不是随便凑的：一个数能被 3 整除，当且仅当它的数位和能被 3 整除；数位和为偶数就是能被 2 整除。两个条件合起来正好是“数位和能被 6 整除”，所以一次取模就判完了。
- `countGood` 枚举 `[a,b]`，逐个调用 `isGood` 计数。

**边界与改进**：

- 源文件括号内的上下界关系转录不清（注释写作 `a<b`，代码按闭区间遍历）。当前实现遍历闭区间，`a == b` 时检查一个数。
- 0 的数位和为 0，会被判成好数；题面限定正整数，不影响。
- 枚举 $b-a+1$ 个数，每个数再拆位。如果区间非常大，可以分别统计不超过 `b` 与不超过 `a - 1` 的正好数，再相减。数位 DP 只需记录当前位、前缀是否紧贴上界和数位和模 6 的余数。补前导零不会改变数位和，最后排除数值 0。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int digitSum(int n) {
    int sum=0;
    while(n>0) {
        sum+=n%10;
        n/=10;
    }
    return sum;
}

bool isGood(int n) {
    if(digitSum(n)%6==0) {
        return 1;
    } else return 0;
}

int countGood(int a,int b) {
    int count=0;
    for(int i=a;i<=b;i++) {
        if(isGood(i)==1) {
            count++;
        }
    }
    return count;
}

int main() {
    int a,b;
    while(cin>>a>>b) {
        cout<<countGood(a,b)<<endl;
    }
}
```

[查看原始 C.cpp](https://drive.google.com/file/d/1l6USkQBU0RP0qx_p7kucUhEua-L9q_gg/view?usp=drivesdk)

**补充解析**　把等价关系写全：设 $S(n)$ 为各位数字之和，则

$$
n\equiv 0 \pmod 3 \iff S(n)\equiv 0 \pmod 3,
$$

而「$S(n)$ 为偶数」就是 $S(n)\equiv0\pmod2$。两个同余式同时成立，等价于 $S(n)\equiv0\pmod6$。所以 `digitSum(n) % 6 == 0` 一次同时判完两个条件，不需要再算 `n % 3`。数位和的范围很小（`int` 内最多 10 位，$S\le90$），这个化简在任何输入规模下都不会溢出。

## D

<!-- homework-topic: 身份证校验码判断 -->

> **题目**　**身份证校验码判断**
>
> 多组输入 18 位身份证号（前 17 位数字，末位数字或 `X`）。把前 17 位分别乘以权重 `7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2` 后求和，对 11 取余，按余数 0–10 映射到字符 `1,0,X,9,8,7,6,5,4,3,2`，与末位相同输出“正确”，否则输出“错误”。
>
> 输入：多组 18 位号码。输出：每组一行“正确”或“错误”。
>
> 示例：`11010519491231002X` → `正确`；`110105194912310021` → `错误`。

**思路**：

- `readID` 用 `cin>>ch` 逐个读字符，`n=n*10+(ch-'0')`。17 位数字最大约 1e17，必须用 `long long`（`int` 只有约 21 亿）。
- `checkID` 把 `n` 从低位拆进 `digit[16..0]`，再对每一位用 `weight[1..17]` 加权累加；`sum%11` 作为下标取 `code`，与末位比较。
- 主函数用 `while((n=readID())!=-1)` 一次完成“读取 + 判结束”，再读末位字符。

**边界与疑点**：

- 权重表在位置 0 放了占位值，实际权重下标是 1 到 17，校验码表直接按余数用 0 到 10 作下标。
- 转录中的两个表末尾都写成了 `20`。校验码必须是单个字符，权重表按 `2` 计算时也能复现题中示例的加权和 `167`，映射结果为 `X`。笔记沿用代码的 `2`。**待确认**：原题末尾是否为 `2`（`20` 疑为 OCR 把 `2` 与下一行的 `0` 连在一起）。
- `readID` 读到 EOF 返回 -1；17 位正整数不可能是 -1，哨兵安全。若一行不足 17 个字符，已读的部分会被丢弃并结束循环，属于非法输入，代码不处理。
- 前 17 位允许前导 0，转成整数会丢前导零，但拆位时高位补 0，加权结果不变。

**原始代码**

```cpp
#include <iostream>
using namespace std;

long long readID() {
    long long n=0;
    char ch;
    for(int i=1;i<=17;i++) {
        if(cin>>ch) {
            n=n*10+(ch-'0');
        } else return -1;
    }
    return n;
}

bool checkID(long long n,char c) {
    int weight[18]={0,7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2};
    char code[11]={'1','0','X','9','8','7','6','5','4','3','2'};
    int digit[17];
    int sum=0;
    for(int i=16;i>=0;i--) {
        digit[i]=n%10;
        n/=10;
    }
    for(int k=1;k<=17;k++) {
        sum+=weight[k]*digit[k-1];
    }
    char co;
    co=code[sum%11];
    if(co==c) {
        return 1;
    } else return 0;
}

int main() {
    long long n;
    char c;
    while((n=readID())!=-1) {             //这里其实同时做了两件事：1. 执行 readID()，把返回值赋给 n   2. 判断 n 是否不等于 -1。
        cin>>c;
        cout<<(checkID(n,c)?"正确":"错误")<<endl;
    }
}
```

[查看原始 D.cpp](https://drive.google.com/file/d/1UuBkG5bjt_evKJS9BdB6zyrbfhiiqwNs/view?usp=drivesdk)

**补充解析**　加权和 `167` 的来源可以逐项核对：

$$
7\cdot1+9\cdot1+10\cdot0+5\cdot1+8\cdot0+4\cdot5+2\cdot1+1\cdot9+6\cdot4+3\cdot9+7\cdot1+9\cdot2+10\cdot3+5\cdot1+8\cdot0+4\cdot0+2\cdot2=167,
$$

`167 % 11 = 2`，校验码表第 2 项是 `X`。这也是为什么 `code` 的下标从 0 开始、而 `weight` 要从 1 开始：余数直接就是前者的下标，后者的第 0 项只是占位。

## E

<!-- homework-topic: 连续数字段 -->

> **题目**　**连续数字段**
>
> 多组输入正整数 `n`。从高位到低位看，连续相同的数字构成一段，例如 `122233100` 分为 `1|222|33|1|00` 共 5 段，最长段长 3。输出段数和最长段长度。
>
> 输入：多组 `n`。输出：每组一行「段数 最长段长」。
>
> 示例：`122233100` → `5 3`；`7` → `1 1`。

先取最低位 `last = n % 10` 作为第一段，再用 `n /= 10` 去掉这一位。每轮取下一位 `digit`。它与 `last` 相同就延长当前段，否则新开一段。每轮更新最长长度和 `last`，并去掉已处理的数字。读取方向只改变各段的出现顺序，段数和最长长度都相同。

**关键细节**：初始 `count=1、len=1、maxlen=1`，因为正整数的数字至少构成一段。

**边界与疑点**：

- `n=0` 时循环不执行，输出 `1 1`；题面只说正整数，**待确认**是否会出现 0。
- `n` 用 `int`，最多表示 10 位；若数据可能超过 2^31−1，需改 `long long`。题面未给范围，**待确认**。
- 输出格式为段数与最长长度，空格分隔，每组一行。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    while(cin>>n) {
        int count=1;
        int len=1,maxlen=1;
        int last=n%10;
        n/=10;
        while(n>0) {
            int digit=n%10;
            if(digit==last) {
                len++;
            } else {
                count++;
                len=1;
            }
            if(len>maxlen) {
                maxlen=len;
            }
            last=digit;
            n/=10;
        }
        cout<<count<<" "<<maxlen<<endl;
    }
}
```

[查看原始 E.cpp](https://drive.google.com/file/d/1Hu_U7dyCxbSTBMrem4TrIb6vV-mcpht6/view?usp=drivesdk)

**补充解析**　从低位向高位扫描时，每遇到一次「数字变化」就新开一段，变化次数加 1 就是总段数，所以初值取 1。`maxlen` 要在每次 `len` 变化之后更新，而不是只在新开段时更新；否则最后一段若最长就会被漏掉。整个过程只看一遍数字，时间与位数成正比。

## F

<!-- homework-topic: 区间回文素数 -->

> **题目**　**区间回文素数**
>
> 多组输入 `m n`，输出闭区间 `[m,n]` 内所有既是回文数又是素数的整数，按升序、空格分隔；若一个都没有，输出 `none`。
>
> 输入：多组 `m n`。输出：每组一行结果或 `none`。
>
> 示例：`[1,30]` → `2 3 5 7 11 `。

**思路**：两个判定各写一个函数，主循环对区间内每个数同时满足两者就输出并计数：

- `prime`：`n<2` 直接返回假，否则试除到 `i*i<=n`；
- `huiwen`：用 `rev=rev*10+n%10` 把数反转，与原数比较。

**边界与疑点**：

- 输出格式。命中时每个数后跟一个空格，但代码在该组有解时不输出换行，后续组的首个结果（或 `none`）会接在同一行：实测 `[1,30]` 紧跟 `[4,4]` 时，输出为一行 `2 3 5 7 11 none`。若 OJ 按行比对可能判错，按 token 比对则无影响。**待确认**题面是否要求每组单独一行、行末是否允许空格。
- `m>n` 时循环不执行，输出 `none`，题面未说明这种输入。
- 反转用 `int`：接近 `INT_MAX` 的 10 位数反转后可能超过 `int` 上限（如 `1999999999` 反转得 `9999999991`），产生溢出。若数据范围可能到 1e9 以上，反转变量应改 `long long`。题面未给范围，**待确认**。
- 区间很大时，可枚举左半部分并镜像生成回文，再对生成的候选判素数。偶数位回文数的奇偶位置数位和相等，因此都能被 11 整除，可以跳过这类候选，单独保留素数 `11`。

**原始代码**

```cpp
#include <iostream>
using namespace std;

bool prime(int n) {
    if(n<2) {
        return 0;
    }
    for(int i=2;i*i<=n;i++) {
        if(n%i==0) {
            return 0;
        }
    }
    return 1;
}

bool huiwen(int n) {
    int original=n;
    int reverse=0;
    while(n>0) {
        reverse=reverse*10+n%10;
        n/=10;
    }
    if(reverse==original) {
        return 1;
    } else return 0;
}

int main() {
    int m,n;
    while(cin>>m>>n) {
        int count=0;
        for(int i=m;i<=n;i++) {
            if(prime(i)==1&&huiwen(i)==1) {
                cout<<i<<" ";
                count++;
            }
        }
        if(count==0) {
            cout<<"none"<<endl;
        }
    }
}
```

[查看原始 F.cpp](https://drive.google.com/file/d/1g0SdoJEeWM8qS708iztMf30WBMQNXqOQ/view?usp=drivesdk)

**补充解析**　偶数位回文必被 11 整除，理由与「11 的整除判别法」相同：设回文有 $2k$ 位，从右往左第 $j$ 位与第 $2k+1-j$ 位相等，交错相加的差值为 0。因此除了 11 本身，偶数位回文中没有素数；枚举时可以直接跳过，剩下的只有奇数位候选。这条性质也解释了为什么回文素数表很短。

## 方法小结

- 日期题先固定「当月天数表」和「星期编号」，跨月、跨年时两张表都要重置。
- 数位题先确定编号方向和进位方式，再用「变化次数 + 1」这类计数，避免遗漏首段或末段。
- 判定条件能合并时先合并：`%3` 与「数位和为偶」合成 `%6`，一次取模代替两次判断。
- 固定规则的字符串/数字校验，照表逐位加权即可；注意表的起始下标和哨兵值。
