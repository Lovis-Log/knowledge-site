---
slug: "08-oj-homework-03-supplement"
title: "第 3 次作业补充"
summary: "日期计算、字符处理和逐步模拟。"
updatedAt: "2026-11-18"
content_type: "reference"
group: "homework"
displayNumber: "03"
---

**来源**　课后作业

## A

**黑色星期五**

2017 年给定月和日，判断该日是否为 13 号星期五。按代码，可连续读入多组 `month day` 直到文件结束，每组输出 `Yes` 或 `No`。

- **思路**：2017 年是平年。先累加该月之前各月的天数，再加 `day - 1`，得到从 1 月 1 日（星期日）起算的偏移。星期日为 0，星期五对应偏移模 7 余 5；再与 `day == 13` 同时判断即可。
- **边界**：月份表按平年固定；代码未校验非法日期，默认输入都是 2017 年的有效日期。**待确认**：题面说“一个日期”，代码却循环处理到 EOF；若 OJ 确实只有一组，结果不受影响，但多组输入的格式应以 OJ 为准。

**原始代码**

```cpp
/*题目描述 有一种计算机病毒叫黑色星期五,如果当天是13号,又恰好是星期五,就会发作起来毁坏计算机的存储系
统,输入2017年的一个日期(输入格式为月,日),判断该日是否会有病毒发作。(注:2017年1月1日为星期日)*/

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

## B

**符号三角形（C++ 程序设计基础 2.4.12）**

每组输入行数 `n` 和组成符号 `ch`，输出 `n` 行居中的等腰三角形；按代码可多组读到 EOF。

- **思路**：第 `i` 行先打印 `n - i` 个空格，再打印 `2i - 1` 个符号。两条内层循环分别控制空格和符号，换行放在外层行循环内。
- **边界**：`cin >> ch` 会跳过空白，因此符号不能是空格；`n` 为 0 或负数时不会输出任何行。题目简单，按行构造即可。

**原始代码**

```cpp
/*题目描述
编写程序显示由符号组成的三角形图案。根据输入输出对应图形,如:输入显示的行数:5输入显示的符号 :*输出的图形如下
    *
   ***
  *****
 *******
*********   */

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

## C

**电子邮件加密**

先输入测试组数 `T`，随后 `T` 行明文；每行可含空格，输出对应的密文。例如 `Wonderful!` 变成 `Asrhivjyp!`。

- **思路**：逐字符判断。`A`–`V` 和 `a`–`v` 后移 4 位；`W`–`Z` 和 `w`–`z` 后移 4 位会越过字母表末尾，减 22 等价于循环回绕；非英文字母原样保留。
- `getline` 保留行内空格。当前 `cin.ignore()` 只丢一个字符，适用于 `T` 后紧跟换行的输入。若组数这一行可能有尾随空格，可用 `cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n')` 丢掉该行剩余内容。遍历时用 `char&` 才能原地修改字符串。
- **边界**：空行会原样输出空行。**待确认**：题面没有说明先给 `T`，代码按“`T` 后跟 `T` 行”实现；若 OJ 是单行或读到 EOF，需要调整读取方式。

**原始代码**

```cpp
/*题目描述
英文电子邮件加密。为使电子邮件内容保密,往往按一定规律将内容加密后再发送,接收人再按约定的规律将其解密。例如,可以按以下规律将内容加密:将字母A
变成字母E,a变成e,即变成其后的第4个字母,W变成A,X变成B,Y变成C,Z变成D。英文字母按上述规律转换,非英文字母字符保持不变。如“Wonderful!”转换
为“Asrhivjyp!”。编写程序,按上述规律转换为密码后输出。*/

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

## D

**计算日期间隔天数**

同一年内的两个日期，求包含首尾两天的天数。按代码先读 `T`，每组读 `year m1 d1 m2 d2`，输出一个整数。

- **思路**：判断闰年；把每个日期换算成该年的第几天（之前整月天数加当日），两者相减后加 1，因为首尾两天都计算在内。
- **关键**：2 月天数随年份变化，不能写死 28；闰年规则是 `(year % 4 == 0 && year % 100 != 0) || year % 400 == 0`。
- 同日的结果是 1。当前实现要求起始日期不晚于结束日期。若题面允许任意顺序并要求无方向的间隔，可以用 `abs(total2 - total1) + 1`。是否先提供组数 `T` 需按原题输入样例确定。

**原始代码**

```cpp
/*题目描述
计算两个日期间隔多少天是一个有趣的问题,请你编写程序,计算某一年中两个日子相隔的天数,如计算2014年7月1日至12
月31日共有多少天(包括7月1日与12月31日当天).*/

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

## E

**蜗牛爬井**

井深 `m` 米，第一天白天爬 `n` 米，之后每天白天的爬升是前一天的 `1/3`，晚上下滑 1 米；白天到达井口就离开。求第几天出去，永远出不去则输出 `Never`。按代码多组 `m n` 读到 EOF。

- **思路**：先处理第一天就能出去的 `m <= n`，答案为 1。否则用 `peak` 记录当天最高点；下一天爬升 `next = prev / 3`，新的最高点是 `peak + next - 1`，即先减去前一夜下滑的 1 米，再加白天爬升。
- **关键**：如果某天爬升不足 1 米，由于前一天未出井时次日早晨离井口必超过 1 米，之后不可能到达井口，直接输出 `Never`。循环退出时 `peak >= m`，当前天数就是答案。
- **边界**：`next == 1` 时当天净升高为 0，再下一天会小于 1 米，最终仍是 `Never`；浮点比较使用 `double`。**待确认**：题面只写“正数”，未给 `m`、`n` 的范围和小数位数，代码按实数处理。

**原始代码**

```cpp
/*题目描述
井底的蜗牛离井口m米。白天蜗牛向上爬若干米,晚上向下滑下来1米。每天白天向上爬的距离是前一天的1/3.已知第一天白天能向上爬n米,问
几天后蜗牛能爬出井外(到井口就出去了)。输入两个正数m和n,输出第几天爬出井口。如果永远爬不出去,则输出”Never”。(测试数据有多组)*/

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

## F

**弹跳模拟**

输入初始高度 `h0` 与弹性系数 `k`，其中 `h0 > 0.1`，`k` 以小数倍率输入。每次反弹到前一次高度的 `k` 倍。计算到新高度小于 `0.1` 为止，第一行输出保留两位小数的总高度，第二行输出撞击次数。

初始给总高度加上 `h0`，把初次落地记为 1 次。每轮先乘 `k` 得到新高度，再把它加到总高度并将计数加 1，最后判断是否继续。这样首次低于 `0.1` 的反弹也会计入。原题样例 `10 0.7` 中，第 12 次反弹约为 `0.13841`，第 13 次约为 `0.09689`。相加得到 `33.10726`，四舍五入为 `33.11`，加上初次落地共 `14` 次。源文件末尾「总高度不要加下落的高度」的注释与样例口径冲突。

原代码在 `h0 > 0.1` 时继续。按题面的「小于」停止，恰好等于 `0.1` 时仍应继续。若保留源码读到 EOF 的写法，每读一组都要重新把总高度设为该组的 `h0`，把撞击次数设为 1。弹性系数需小于 1 才会衰减至阈值。

**原始代码**

```cpp
/*题目描述
一个弹性球从一定高度自由落下,并且每次弹起的高度是前一次弹起高度的m%(弹性系数)。你的任务是编写一个C++程序,模拟球的弹跳过程,计算球在地面上
的总撞击次数(包括最初的自由落下)以及球弹跳的总高度。球会持续弹跳,直到其弹起高度小于0.1时停止弹跳。*/

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

**优化版**　每组重新初始化计数。先计入本次反弹，再按题意用严格小于 0.1 的条件停止。适用于会逐次衰减的弹性系数。

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
