---
slug: "08-oj-homework-03-supplement"
title: "第 3 次作业补充（日期、字符与过程模拟）"
summary: "日期计算、字符处理和逐步模拟。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "03"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/175QBSIQ4ebol86y1K9ifhd4-54efu65g"
---

**来源**　课后作业

ddl 26.10.26 ｜ A–F 共 6 题

题意按 `0catalog` 的题名与本地 `.cpp` 的题面注释还原；程序与题面不一致的地方单列，题面没有给出、又会影响提交的部分标为 **待确认**。

## A

<!-- homework-topic: 黑色星期五 -->

> **题目**　**黑色星期五**
>
> 输入 2017 年的一个日期，格式为「月 日」，判断这一天是否会让黑色星期五病毒发作：当天是 13 号，又恰好是星期五。是则输出 `Yes`，否则输出 `No`。
>
> 题面注明 2017 年 1 月 1 日是星期日。例如 `1 13` 输出 `Yes`，`2 13` 输出 `No`。

**思路**　把日期换算成距 2017 年 1 月 1 日的天数偏移，再用它确定星期：偏移对 7 取模，0 是星期日，5 是星期五。题面要求「13 号且星期五」，两个条件同时成立才输出 `Yes`。

**关键变量与循环状态**

- `monthdays` 是平年的逐月天数表，下标 1–12 对应 1–12 月，`monthdays[0]` 留 0 只作占位，这样 `for (i = 1; i < month; i++)` 累加「该月之前的整月天数」时不用减 1。
- `total` 先累加之前各月天数，再加 `day - 1`，得到距 1 月 1 日的天数。1 月 1 日自身偏移为 0，正是因为减了这 1。
- `total % 7 == 5` 只说明那天是星期五；还要 `day == 13` 才是黑色星期五。

**为什么成立**　星期每 7 天循环一次，所以只需 `total` 的余数；2017 年是平年，2 月固定 28 天，月表不会因为年份而变。以 `1 13` 为例，`total = 12`，`12 % 7 = 5`，判 `Yes`；`2 13` 时 `total = 31 + 12 = 43`，`43 % 7 = 1`，判 `No`。

**差异（题面一组，程序读到 EOF）**　题面写的是「输入 2017 年的一个日期」，程序却写成 `while (cin >> month >> day)`，会一直读到文件结束。这个差异不影响正确性：每轮开头都把 `total` 置 0，多组之间不会累加；单组输入时读一次就遇到 EOF，结果也一致。注释里强调「不能提前把 `total` 赋值为 0」、「`total` 必须在 `while` 里清零」，说的正是这件事。要严格贴合题面，可改成一次 `cin >> month >> day`。

**易错点**

- `total` 放在 `while` 外初始化，第二组会接着上一组的天数继续加，星期整体偏移。
- 把 `total % 7 == 5` 当成充分条件，会漏掉「必须 13 号」。
- 月表若按闰年写（2 月 29 天），2017 年 3 月以后全部错位。

**边界**　代码不校验日期合法性，默认输入都是 2017 年的有效日期。每组 `O(1)`（最多 12 次累加）。

**补充要点**　若题目改成任意年份，需要先判闰年再取 2 月天数；星期也可以直接用蔡勒公式从年月日算出，不必依赖「1 月 1 日是星期几」这个给定条件。

**原始代码**

```cpp
#include<iostream>
using namespace std;

int main() {
    int monthdays[]={0,31,28,31,30,31,30,31,31,30,31,30,31}; //定义数组
    int month,day,total;  //这里不能提前把toatl赋值为0，不然循环会导致结果叠加
    while(cin>>month>>day) {
        total=0;    //由于多次循环，total须在while循环里赋值为0，不然第二次结果会叠加到第一次；注意别放到for循环里面了

        for(int i=1;i<month;i++) {  //for循环括号里用；而不是，
            total+=monthdays[i];
        }
    total+=(day-1);
    if (total%7==5&&day==13) {
        cout<<"Yes"<<endl;
    } else {
        cout<<"No"<<endl;
    }
     }
}
```

[查看原始 A.cpp](https://drive.google.com/file/d/18fNvhfaVVoL_nvXgo208ngCrZGfdl2pL/view?usp=drivesdk)

## B

<!-- homework-topic: 符号三角形（C++ 程序设计基础 2.4.12） -->

> **题目**　**符号三角形（C++ 程序设计基础 2.4.12）**
>
> 每组输入行数 `n` 和组成符号 `ch`，输出 `n` 行居中的等腰三角形：第 `i` 行有 `n-i` 个前导空格，接着 `2i-1` 个符号。
>
> `5 *` 输出：
>
> ```text
>     *
>    ***
>   *****
>  *******
> *********
> ```

**思路**　按行构造：外层循环走 `i = 1..n`，第一条内层循环打印 `n-i` 个空格，第二条打印 `2i-1` 个符号，最后在行尾换行。

**关键步骤**　换行必须放在外层行循环内、两条内层循环之后。空格和符号的循环里都不能换行，否则每打一个字符就断一次行。符号数是奇数 `2i-1`，正好让每行比上一行多两个字符，接在少一个空格的下一行下面就是居中的等腰形状。

**边界**　`n = 1` 时输出一个 `ch`；`n = 0` 或负数时外层循环不执行，不输出任何内容。`cin >> ch` 会跳过空白，所以组成符号不能是空格。

**补充要点**　当前写法在行末没有尾随空格：首行缩进 `n-1` 个空格，最后一行顶格写出 `2n-1` 个符号——这才是常见的 OJ 期望格式。若题目要求每行都补满到 `2n-1` 个字符，需要在符号后再补空格，两种格式在字符比对上不等价。

**待确认**　输入是否多组；符号是否允许空格。

**原始代码**

```cpp
#include<iostream>
using namespace std;

int main () {
    char ch;
    int n;
    while(cin>>n>>ch) {
        for(int i=1;i<=n;i++) {   //控制行数

            for(int j=1;j<=n-i;j++) {
                cout<<" ";  //这里不能endl
            }

            for(int k=1;k<=2*i-1;k++) {
                cout<<ch;   //这里不能endl
            }
            cout<<endl;    //换行须在控制行数的外层循环内
        }

    }
}
```

[查看原始 B.cpp](https://drive.google.com/file/d/1jM_rdYVtJaqWMce0TxC1LiGrKkUgDECq/view?usp=drivesdk)

## C

<!-- homework-topic: 电子邮件加密 -->

> **题目**　**电子邮件加密**
>
> 先读测试组数 `T`，随后 `T` 行明文，每行可以含空格。把每个英文字母向后移 4 位，`W`、`X`、`Y`、`Z` 分别回绕成 `A`、`B`、`C`、`D`（小写同理），非字母字符原样输出。
>
> `Wonderful!` 加密为 `Asrhivjyp!`。

**思路**　逐字符判断：`A`–`V`（65–86）与 `a`–`v`（97–118）直接 `+4`；`W`–`Z` 与 `w`–`z` 再往后就出了字母表，减 22 等价于「加 4 再减 26」。

**关键步骤**

- 用 `getline` 读整行，行内空格才不会被 `cin >>` 截断。
- 读完 `T` 后缓冲区里还留着换行，`cin.ignore()` 丢掉它，否则第一个 `getline` 会读到一个空行。
- `for (char &c : s)` 里的 `&` 是引用，改 `c` 就是改 `s` 里的字符；写成 `for (char c : s)` 只是拷贝，改完原串不变。

**边界**　空行原样输出空行。大小写分支分开写，`W` 和 `w` 都要回绕；数字、标点、空格都落到「不处理」。

**补充要点**　`cin.ignore()` 不带参数只丢一个字符，刚好够用是因为 `cin >> T` 读完数字、缓冲区里只剩行尾的 `\n`。若组数那一行后面还有空格，第一个 `getline` 会读到一段空白，此时要写成 `cin.ignore(numeric_limits<streamsize>::max(), '\n')` 丢掉整行剩余内容。

**待确认**　题面没有说明先给 `T`。若 OJ 是「读到 EOF 的若干行」，需要把外层改成 `while (getline(cin, s))`。

**原始代码**

```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {
    int T;
    // 读取测试用例数量
    if (cin >> T) {
        // 忽略读取T后留在缓冲区中的换行符，否则接下来的getline会读取到一个空行
        cin.ignore();

        while (T--) {
            string s;
            // 读取每行明文（可能包含空格，所以使用getline）
            getline(cin, s);

            // 遍历字符串进行加密
            for (char &c : s) {
                if ((c >= 'A' && c <= 'V') || (c >= 'a' && c <= 'v')) {
                    c += 4; // 正常情况下字母后移4位
                } else if ((c >= 'W' && c <= 'Z') || (c >= 'w' && c <= 'z')) {
                    c -= 22; // 超过Z/z的字母循环回到前面，相当于往后挪4位（+4-26=-22）
                }
                // 非字母字符不做处理
            }

            // 输出加密后的密文并换行
            cout << s << endl;
        }
    }
    return 0;
}


/*
for (char &c : s) 是 C++11 引入的“基于范围的 for 循环”（Range-based for loop）。
它的意思是：遍历字符串 s 中的每一个字符，并把当前字符的“引用”赋值给变量 c。
我们可以把它拆解来看：
s：你要遍历的容器（在这里是 std::string 字符串）。
char c：声明一个变量 c，每次循环它代表字符串中的当前字符。
&（关键）：表示引用（Reference）。
:：读作“在...之中”。
为什么一定要加 &？（核心区别）
如果你写成 for (char c : s)（不带 &），这叫值拷贝。每次循环，系统会把字符串里的字符复制一份给 c。你在循环里修改 c（比如 c += 4），原字符串 s 根本不会改变。
加上 & 变成 char &c 后，c 就变成了原字符串中那个字符的别名。修改 c，就是直接修改字符串 s 里的对应字符。
举个简单的例子：

string s = "ABC";
// 1. 不加 & (值拷贝，修改无效)
for (char c : s) {
    c = c + 1;
}
cout << s; // 输出仍然是 "ABC"

// 2. 加上 & (引用，修改有效)
for (char &c : s) {
    c = c + 1; // 相当于直接修改了 s 里的字符
}
cout << s; // 输出变成 "BCD"

*/
```

[查看原始 C.cpp](https://drive.google.com/file/d/1tVPEsOCfUfhsO1x4u10ZB2hIAIbJ77IY/view?usp=drivesdk)

## D

<!-- homework-topic: 计算日期间隔天数 -->

> **题目**　**计算日期间隔天数**
>
> 先读组数 `T`，随后每组一行 `year m1 d1 m2 d2`，两个日期在同一年内，求包含首尾两天的天数，输出一个整数。
>
> `2014 7 1 12 31` 输出 `184`；`2016 2 28 3 1` 输出 `3`。

**思路**　把每个日期换算成该年的第几天（之前整月天数之和加当日），两者相减再加 1——加 1 是因为首尾两天都算在内。

**关键步骤**

- `yeardays` 从 1 月加到 `month-1`，用的是 `monthdays(year, i)` 而不是写死的数组，2 月天数随年份变化。
- 闰年规则是 `(year % 4 == 0 && year % 100 != 0) || year % 400 == 0`。按 `year%4==0` 单判会把 1900 年当闰年。
- `total2 - total1 + 1`：7 月 1 日到 7 月 1 日得 1，符合「包括首尾」。

**边界**　同日结果为 1。当前实现要求起始日期不晚于结束日期，否则得 0 或负数。两个日期跨年时答案不对，因为两年之间的天数没有算进去——题面限定「某一年中」，可以不处理。

**待确认**　是否真的先给组数 `T`（主版本用 `if (cin >> T)` 读取，没有 `T` 时整组不读）；是否允许起始日期晚于结束日期，若允许应改成 `abs(total2 - total1) + 1`。

**原始代码**

```cpp
#include <iostream>
using namespace std;

bool leap_yon(int year) {
    if((year%4==0&&year%100!=0)||year%400==0) {
        return 1;
    } else return 0;
}

int monthdays(int year,int month) {
    int days[]={0,31,28,31,30,31,30,31,31,30,31,30,31};
    if (month==2&&leap_yon(year)==1) {
        return 29;
    } else {
        return days[month];
    }
}

int yeardays(int year,int month,int day) {
    int total=0,i=1;
    while(i<month) {
        total+=monthdays(year,i);
        i++;
    }
    total+=day;
    return total;
}

int main() {
    int T;          //防御性编程，输入需要测试数据的组数T。防止在没有输入时程序出错
    if (cin>>T) {
        while(T--) {
            int year,m1,d1,m2,d2;
            cin>>year>>m1>>d1>>m2>>d2;
            int total1,total2;
            total1=yeardays(year,m1,d1);
            total2=yeardays(year,m2,d2);
            cout<<(total2-total1+1)<<endl;
         }
     }
}
```

[查看原始 D.cpp](https://drive.google.com/file/d/19EnRgdglsNKSMoNTYUr_bGmw8kUZy1au/view?usp=drivesdk)

## E

<!-- homework-topic: 蜗牛爬井 -->

> **题目**　**蜗牛爬井**
>
> 井深 `m` 米。第一天白天向上爬 `n` 米，之后每天白天爬的距离是前一天的 1/3，晚上下滑 1 米；到达井口当天就出去。求第几天出去，永远出不去则输出 `Never`。多组输入 `m n`，读到文件结束。
>
> `2 2` 输出 `1`，`7 6` 输出 `2`，`10 5` 输出 `Never`。

**思路**　先处理第一天就出去的 `m <= n`，答案为 1。否则用 `height` 记录当天为止到达的最高点：下一天的爬升是 `climb /= 3`，新的最高点是 `height + climb - 1`——先减去前一夜下滑的 1 米，再加白天爬升。

**补充解析**　每轮开始时，`i` 是已经模拟过的天数，`height` 是第 `i` 天白天结束时的高度。`climb /= 3` 得到第 `i + 1` 天的爬升量，随后从 `height` 扣去前一晚下滑的 1 米，再加上这个爬升量。正常退出时，`i` 就是出井的那一天。

**为什么 `climb < 1` 就可以判 `Never`**　当天的净升高是 `climb - 1`。若 `climb < 1`，这一天比前一天还低；而 `climb` 每天再除以 3 只会更小，此后每天的净升高都为负，`height` 严格递减。进这一天时已有 `height < m`，之后所有最高点都小于 `m`，不可能出井。

> **补充证明**　设第 $j$ 天白天结束时的高度为 $H_j$，当天爬升为 $c_j$。从第 2 天起，若前一天尚未出井，则 $H_j = H_{j-1} + c_j - 1$。当 $c_j \le 1$ 时，此后各天的白天高度都不会超过 $H_{j-1}$，而 $H_{j-1}<m$，所以可以判定永远无法出井。

**易错点**　`climb == 1` 时当天高度与前一天白天结束时相同。前一天已经确认没有出井，因此改为 `climb <= 1` 也可直接输出 `Never`。

**边界**　出井天数可以大于 2。例如输入 `36 27`，前三天的白天高度依次为 27、35、37 米，第 3 天出井。题面给出 `m`、`n` 都是正数。

**待确认**　`m`、`n` 的具体上限与精度。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    double m,n;
    while(cin>>m>>n) {
        if (m<=n) {
            cout<<1<<endl;
        } else {
            double climb=n,height=n;
            int i=1;
            for(;height<m;i++) {
                climb/=3;
                if (climb<1) {
                    cout<<"Never"<<endl;
                    break;
                }
                height+=(climb-1);
            }
            if(climb>=1) {
                cout<<i<<endl;
             }
         }
     }
}




/*
#include <iostream>
using namespace std;

int main() {
    double m, n;
    while (cin >> m >> n) {
        // 第一天白天爬 n 米
        if (n >= m) {
            cout << 1 << endl;
            continue;          //continue跳过了总while循环后面的所有语句，等价于else，但使核心逻辑少了一层缩进，代码在屏幕上看起来更扁平、更清爽。
        }

        double climb = n;  // 当天的爬行距离
        double height = n; // 当天结束后的高度（第一天白天爬到的高度）
        int day = 1;

        while (height < m) {
            day++;
            climb /= 3; // 下一天的爬行距离是前一天的1/3

            // 如果下一天爬行距离小于1米，由于晚上会下滑1米，永远无法爬出
            if (climb < 1) {
                cout << "Never" << endl;
                break;
            }

            // 白天爬 climb，晚上滑 1，净增加 climb - 1
            height += (climb - 1);
        }

        // 如果是正常退出循环（爬出去了），输出天数
        if (height >= m) {
            cout << day << endl;
        }
    }
    return 0;
}
*/
```

[查看原始 E.cpp](https://drive.google.com/file/d/1jIJQYMo8jpUjkKzfu9SyuHJGxSo4isJ_/view?usp=drivesdk)

## F

<!-- homework-topic: 弹跳模拟 -->

> **题目**　**弹跳模拟**
>
> 输入初始高度 `h0 > 0.1` 与弹性系数 `k`（样例用 `0.7` 表示 70%）。球自由落下，每次弹起的高度是前一次弹起高度的 `k` 倍。第一行输出球弹跳的总高度，保留两位小数。第二行输出撞击地面的总次数，包含初次落地。
>
> 球持续弹跳，直到弹起高度小于 `0.1` 为止。`10 0.7` 输出 `33.11` 和 `14`。

**思路**　总高度先加上初始下落高度 `h0`，撞击次数从 1 开始（初次落地）。每轮把当前高度乘 `k` 得到下一次弹起高度，累加进总高度、计数加 1，再判断是否继续。

**关键步骤**　累加的只有「弹起高度」，不加每次下落的高度——学生自己的注释「注意弹跳总高度不要加下落的高度」说的就是这一点。循环条件 `h0 > 0.1` 在循环开头判断，所以第一次低于 `0.1` 的那次反弹仍会被乘出来、加进去、计一次数，之后循环退出。

**补充解析**　样例 `10 0.7` 的第 12 次弹起约 `0.13841`，第 13 次约 `0.09689`。计算先更新高度再累计，所以第 13 次也计入。13 次弹起之和约 `23.107`，加上初始的 10 得 `33.11`，撞击次数为 1 + 13 = 14。

**缺陷（计数未按组重置）**　`int count=1;` 写在 `while` 外面，第二组开始就会接着上一组的次数继续加。实测先输入 `10 0.7` 再输入 `1 0.5`：第一组输出 `33.11` / `14`，第二组输出 `1.94` / `18`——`1 0.5` 单独运行只输出 `1.94` / `5`，多出来的 13 正是上一组的计数。总高度 `H` 是在循环体内定义的，不受影响。

**边界**　初始高度不大于 `0.1` 时一次反弹都不算，输出 `h0` 和 1。弹性系数不小于 1 时高度不衰减，`h0` 永远大于 `0.1`，循环不终止——题面默认系数小于 1。

**补充解法**　每组重新初始化计数，并把停止条件写成「当前高度不小于 0.1 时继续弹」，与题面「小于 0.1 停止」逐字对应。注意这一版在弹起高度恰好等于 `0.1` 时会再多弹一次，与主版本的 `h0 > 0.1` 相差一次；浮点数据几乎不会落在这一点上，若题面明确「等于也停」则仍用 `>`。

```cpp
#include <iomanip>
#include <iostream>

int main() {
    double height, ratio;
    std::cout << std::fixed << std::setprecision(2);

    while (std::cin >> height >> ratio) {
        double totalHeight = height;
        int hits = 1;
        while (height >= 0.1) {
            height *= ratio;
            totalHeight += height;
            ++hits;
        }

        std::cout << totalHeight << '\n' << hits << '\n';
    }
}
```

**补充要点**　题目样例确定了累计口径。若求球实际经过的总路程，每次弹起后的下落也计入，公式是 `h0 + 2 × 弹起高度之和`，样例会得到 `56.21`。

**原始代码**

```cpp
#include <iostream>
using namespace std;
#include <iomanip>

int main() {
    double h0,k;
    int count=1;

    while(cin>>h0>>k) {
          double H=h0;    //这里不能定义初始弹跳总高度H为0,且须在输入了h0之后
        for (;h0>0.1;count++) {
            h0*=k;
            H+=h0;          //当h0<0.1时，是在最后一次循环里被加进去的，h0*k之后才小于了0.1
        }
        cout<<fixed<<setprecision(2)<<H<<endl;
        cout<<count<<endl;
    }
}

//注意弹跳总高度不要加下落的高度
```

[查看原始 F.cpp](https://drive.google.com/file/d/1kQrp5ECmUqbXOSo6xLNF_QnJam1y4Bgg/view?usp=drivesdk)

## 方法小结

这一组把「日期」和「逐步模拟」两条线放在一起，三条经验：

- **日期先化成距某个基准的天数**：星期间隔、年内的第几天、区间包含端点，都归结为整数偏移的加减与取模。基准选好，闰年和月份长短就只在换算时出现一次。
- **给状态变量定好含义**：蜗牛题的 `height` 是当天白天结束时的高度，弹跳题的 `totalHeight` 等于初始高度加已经计入的弹起高度之和。
- **组间重置**：凡是「读多组」的题，累加器、计数器、标记都要放在循环体内初始化。弹跳题的 `count` 放在外面，第二组起就全错。
