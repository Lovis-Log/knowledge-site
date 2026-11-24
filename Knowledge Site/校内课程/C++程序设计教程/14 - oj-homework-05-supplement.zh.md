---
slug: "14-oj-homework-05-supplement"
title: "第五次作业补充（字符串、模拟与前后缀）"
summary: "机器人指令、自除数、字符串解压、鞍点、亲密字符串与中心索引。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "09"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/1mx24nA4JP7TznMqBTrNJXsLfDxnbgh3Q"
---

**来源**　课后作业

截止 2026-11-30 ｜ A–F 共 6 题

题面取自各 `.cpp` 顶部的注释。注释只写要求、没有给输入输出格式的，标「据代码归纳」；缺失的约束标 **待确认**。

## A

<!-- homework-topic: 机器人指令 -->

> **题目**　**机器人指令**
>
> 有一个机器人初始位置在坐标原点 `(0,0)`。输入一串由 `U`（上）、`D`（下）、`L`（左）、`R`（右）组成的指令字符串，计算机器人执行完所有指令后的最终坐标：`U` 让 `y` 加 1，`D` 让 `y` 减 1，`L` 让 `x` 减 1，`R` 让 `x` 加 1。
>
> 输入（据代码归纳）：多组，每行一个指令串，读到文件结束。输出（据代码归纳）：每组一行 `(x, y)`，逗号后有一个空格。
>
> 示例：`URDL` → `(0, 0)`；`RRU` → `(2, 1)`。

**思路**　逐字符读取，四个方向各对应一次坐标增减；`switch` 把「字符」直接映射到「哪一维加还是减」，不需要先解析成方向编号。

**补充解析**　每种合法指令只改变一个坐标分量，所以总位移等于各方向计数之差：`x = count(R) - count(L)`，`y = count(U) - count(D)`，结果与指令的先后顺序无关。逐字符累加与这个公式等价，时间都是 $O(\lvert s\rvert)$。非法字符会被 `switch` 的 `default` 忽略，题面只保证四种字母，因此不影响结果。

**待确认**：输入是否确为多组、坐标范围与单个指令串的长度上限。

**原始代码**

```cpp
#include<iostream>
using namespace std;
#include<string>

int main() {
    string s;
    while(cin>>s) {
        int x=0,y=0;
        for(int i=0;i<s.size();i++) {
            switch(s[i]) {
                case 'U':
                y++;
                break;

                case 'D':
                y--;
                break;

                case 'L':
                x--;
                break;

                case 'R':
                x++;
                break;
            }
        }
        cout<<"("<<x<<", "<<y<<")"<<endl;
    }

}
```

[查看原始 A.cpp](https://drive.google.com/file/d/146yYDa-EKWS9zShdt6nT2f6tbQJdAEtY/view?usp=drivesdk)

## B

<!-- homework-topic: 自除数 -->

> **题目**　**自除数**
>
> 自除数是指可以被它包含的每一位数整除的数。例如 `128` 是自除数，因为 `128 % 1 == 0`、`128 % 2 == 0`、`128 % 8 == 0`；自除数不允许包含 `0`。编写函数 `bool isSelfDividing(int n)`，输出给定范围 `[Left, Right]` 内所有的自除数。
>
> 输入（据代码归纳）：多组 `Left Right`，读到文件结束。输出（据代码归纳）：每组一行，命中的数依次输出，每个数后跟一个空格。
>
> 示例：`[1, 22]` → `1 2 3 4 5 6 7 8 9 11 12 15 22 `。

**思路**　用副本 `b = n` 逐位取 `b % 10`，先判这一位是否为 0，再判 `n % a == 0`；任一位不满足就立即返回假。主函数枚举区间，命中即输出。

**补充解析**　逐位检查的次数是 `n` 的位数，单个数 $O(\log n)$；区间长度 `R-L+1` 时总共 $O((R-L+1)\log R)$。两个细节：一是「先判 0 再取模」，否则 `n % 0` 会触发除零；二是 `n = 0` 时 `while (b > 0)` 一次也不执行，函数会返回真，但 0 含数字 0、按定义不是自除数，需要在循环前单独排除。负数同样不适合这一定义。

**待确认**：`Left` 是否保证 ≥1（决定 0 是否要单独排除）、`Right` 的上界与区间最大长度。

**原始代码**

```cpp
#include<iostream>
using namespace std;

bool isSelfDividing(int n) {
    int b=n;
    while(b>0) {
        int a;
        a=b%10;
        if(a==0) {
            return 0;
        }
        if(n%a!=0) {
            return 0;
        }
        b/=10;
    }
    return 1;
}

int main() {
    int m,n;
    while(cin>>m>>n) {
        for(int i=m;i<=n;i++) {
            if(isSelfDividing(i)==1) {
                cout<<i<<" ";
            }
        }
        cout<<endl;
    }
}
```

[查看原始 B.cpp](https://drive.google.com/file/d/1zYcpPDukTnN-D92ww0q-hRyRZ1bM5CEB/view?usp=drivesdk)

## C

<!-- homework-topic: 字符串解压 -->

> **题目**　**字符串解压**
>
> 输入一个由字母和数字组成的压缩字符串（如 `A3B2C1`），将其解压还原为原始字符串（`AAABBC`）。题目保证数字为个位数（1–9）。
>
> 输入（据代码归纳）：多组，每行一个压缩串。输出（据代码归纳）：每组一行解压结果。
>
> 示例：`A3B2C1` → `AAABBC`；`X2Y1` → `XXY`。

**思路**　压缩串按「字母、数字」成对出现，所以步长为 2：`s[i]` 是字符、`s[i+1]` 是重复次数，内层循环打印 `s[i+1]-'0'` 次。

**补充解析**　`-'0'` 是把数字字符的 ASCII 码减去 `'0'` 的 ASCII 码，得到 0–9 的整数值；直接写 `int('3')` 会得到 51。步长为 2 的写法依赖「严格成对、且计数只有一位」这两个前提：若串长为奇数，最后一个字母没有计数，会被 `i < n-1` 丢掉；若两个字母相邻，`s[i+1]-'0'` 会算出一个远大于 9 的数。题面保证格式，所以原写法可用；换成一般输入就需要真正的解析。

**待确认**：压缩串的最大长度，以及是否允许计数缺省（只写字母）。

**补充解法**　用「读一个字符，再尽量读完整数字」的解析方式，兼容多位计数和缺计数的字母。

```cpp
#include <iostream>
#include <string>

int main() {
    std::string s;
    while (std::cin >> s) {
        for (std::size_t i = 0; i < s.size(); ) {
            const char ch = s[i++];
            int count = 0;
            bool hasCount = false;
            while (i < s.size() && s[i] >= '0' && s[i] <= '9') {
                count = count * 10 + (s[i] - '0');
                hasCount = true;
                ++i;
            }
            if (!hasCount) count = 1;
            for (int k = 0; k < count; ++k) std::cout << ch;
        }
        std::cout << '\n';
    }
}
```

优势是把「字符」与「计数」分成两段读，计数可以有多位，也可以省略（默认 1），不再依赖固定步长。适用条件是输入仍是「字母 + 可选数字」的拼接；本题保证单个数字，所以两种写法结果相同。核对：`A3B2C1` → `AAABBC`；`A12B` → 12 个 `A` 后接 `B`；`ABC` → `ABC`。

**原始代码**

```cpp
#include<iostream>
using namespace std;
#include<string>

int main() {
    string s;
    while(cin>>s) {
        int n=s.size();
        for(int i=0;i<n-1;i+=2) {
            for(int j=0;j<s[i+1]-'0';j++) {   //ASCII 编码转换-'0';区分int('3')=51
                cout<<s[i];
            }
        }
        cout<<endl;
    }
}
```

[查看原始 C.cpp](https://drive.google.com/file/d/1PN7AVobigsKKJKCjJlqsCwthF0fdjXyG/view?usp=drivesdk)

## D

<!-- homework-topic: 矩阵中所有鞍点 -->

> **题目**　**矩阵中所有鞍点**
>
> 在矩阵中，如果一个元素在所在行中最大、同时在所在列中最小，则称该元素为鞍点。找出矩阵中的所有鞍点。
>
> 输入（据代码归纳）：多组，每组一个 `n` 与 `n²` 个整数，构成 `n` 阶矩阵。输出（据代码归纳）：每个鞍点一行 `(行, 列) = 值`，下标从 0 开始；没有鞍点时输出 `No Saddle Point`。
>
> 示例：`5 6 7 / 4 5 6 / 3 4 5` → `(2, 2) = 5`。

**思路**　对每个位置做两次一维检查：同行没有更大的数、同列没有更小的数。两个函数都用严格比较寻找反例，因此并列的最大值或最小值也算鞍点。

**补充解析**　逐格检查要扫一整行加一整列，单格 $O(n)$，总计 $O(n^3)$。若先记录每行最大值、每列最小值，再逐格判断「当前值是否同时等于两者」，两次预处理各 $O(n^2)$、判定 $O(n^2)$，总计 $O(n^2)$。两种做法对并列的处理完全一致：行最大值可能出现在多个位置，只要该位置同时是所在列的最小值，就都算鞍点。

**待确认**：`n` 的上限与矩阵元素的取值范围。

**补充解法**　先求每行最大值与每列最小值，再按行优先输出全部鞍点。

```cpp
#include <algorithm>
#include <iostream>
#include <limits>
#include <vector>

int main() {
    int n;
    while (std::cin >> n) {
        std::vector<std::vector<int>> a(n, std::vector<int>(n));
        std::vector<int> rowMax(n, std::numeric_limits<int>::lowest());
        std::vector<int> colMin(n, std::numeric_limits<int>::max());
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                std::cin >> a[i][j];
                rowMax[i] = std::max(rowMax[i], a[i][j]);
                colMin[j] = std::min(colMin[j], a[i][j]);
            }
        }

        bool found = false;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                if (a[i][j] == rowMax[i] && a[i][j] == colMin[j]) {
                    std::cout << '(' << i << ", " << j << ") = " << a[i][j] << '\n';
                    found = true;
                }
            }
        }
        if (!found) std::cout << "No Saddle Point\n";
    }
}
```

优势是把三次重复扫描压成两次线性预处理，`n` 稍大时差距明显；适用条件是只比较数值、不需要保留「第一个」的额外逻辑（本题要求全部，所以正好）。核对：全 1 的 `3` 阶矩阵输出 9 行，每行都是鞍点；`2 1 3 / 1 3 2 / 3 2 1` 输出 `No Saddle Point`。

**原始代码**

```cpp
#include<iostream>
using namespace std;

bool isColMin(int** a,int n,int i,int j) {
    for(int k=0;k<n;k++) {
        if(a[i][j]>a[k][j]) {
            return 0;
        }
    }
    return 1;
}

bool isRowMax(int** a,int n,int i,int j) {
    for(int k=0;k<n;k++) {
        if(a[i][j]<a[i][k]) {
            return 0;
        }
    }
    return 1;
}

int main() {
    int n;
    while(cin>>n) {
        int** a=new int* [n];
        for(int i=0;i<n;i++) {
            a[i]=new int [n];
        }

        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                cin>>a[i][j];
            }
        }

        bool judge=0;
        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                if(isColMin(a,n,i,j)==1&&isRowMax(a,n,i,j)==1) {
                    cout<<"("<<i<<", "<<j<<") = "<<a[i][j]<<endl;
                    judge=1;
                }
            }
        }

        if(judge==0) {
            cout<<"No Saddle Point"<<endl;
        }

        for(int i=0;i<n;i++) {
            delete[] a[i];
        }
        delete[] a;

    }

}
```

[查看原始 D.cpp](https://drive.google.com/file/d/1J9mpyDd-qwO_6REXrN7PRxF4aJDINLwx/view?usp=drivesdk)

## E

<!-- homework-topic: 亲密字符串 -->

> **题目**　**亲密字符串**
>
> 判断两个字符串 `A` 和 `B` 是否可以通过仅交换 `A` 中的两个字符使得 `A` 等于 `B`。如果 `A` 和 `B` 本就相等，需要有重复字符才算「可以」。
>
> 输入（据代码归纳）：多组 `A B`，以空白分隔，读到文件结束。输出：每组一行 `True` 或 `False`。
>
> 示例：`ab ba` → `True`；`ab ab` → `False`；`aa aa` → `True`；`abc abd` → `False`。

**思路**　先分两种情况：两串相等时检查 `A` 内是否有重复字符；不相等时枚举所有一对交换 `(i,j)`，换完比较一次，若不相等就换回来。

**补充解析**　暴力枚举有 $\binom{n}{2}$ 种交换，每次比较 $O(n)$，最坏 $O(n^3)$。其实只有两种可能成立：一是两串相等且某个字符出现两次（交换这两个相同字符，串不变）；二是两串恰有两个位置不同，且这两处的字符交叉相等。位置数不为 2、或交叉不相等，都不可能靠一次交换变成 `B`。按这个判定，时间降到 $O(n)$。

**待确认**：字符集是否只含小写字母（决定频数表大小）、单个串的长度上限。

**补充解法**　统计不等位置，再按上述两条判定。

```cpp
#include <iostream>
#include <string>

bool buddy(const std::string& a, const std::string& b) {
    if (a.size() != b.size()) return false;

    if (a == b) {
        int freq[26] = {0};
        for (char c : a) {
            if (++freq[c - 'a'] > 1) return true;
        }
        return false;
    }

    int first = -1, second = -1;
    for (std::size_t i = 0; i < a.size(); ++i) {
        if (a[i] != b[i]) {
            if (first == -1) first = static_cast<int>(i);
            else if (second == -1) second = static_cast<int>(i);
            else return false;                 // 第三个不同位置，直接否决
        }
    }

    return second != -1 && a[first] == b[second] && a[second] == b[first];
}

int main() {
    std::string a, b;
    while (std::cin >> a >> b) {
        std::cout << (buddy(a, b) ? "True" : "False") << '\n';
    }
}
```

优势是把「枚举交换」换成「数不同位置」，不用构造中间串；适用条件是字符限定在小写字母（`freq[26]`）。若输入可能含大写或数字，把频数表改成 256 项并按 `unsigned char` 下标即可。核对：`ab ba` → `True`；`ab ab` → `False`；`aa aa` → `True`；`abc abd` → `False`；`abcd badc` → `False`（四个位置不同）。

**原始代码**

```cpp
#include<iostream>
using namespace std;
#include<string>

void swap(char& ch1,char&ch2) {
    char temp;
    temp=ch1;
    ch1=ch2;
    ch2=temp;;
}

bool is(string s1,string s2) {
    int n=s1.size();
    for(int i=0;i<n;i++) {
        for(int j=i+1;j<n;j++) {
            swap(s1[i],s1[j]);
            if(s1==s2) {
                return 1;
            }
            swap(s1[i],s1[j]);   //只允许交换1次，故若上一步s1!=s1，需要恢复原状
        }
    }
    return 0;
}

bool repeat(string s) {
    for(int i=0;i<s.size();i++) {
        for(int j=i+1;j<s.size();j++) {
            if(s[i]==s[j]) {
                return 1;
            }
            }
        }
    return 0;
}

int main() {
    string s1,s2;
    while(cin>>s1>>s2) {
        if(s1==s2) {
            if(repeat(s1)==1) {
                cout<<"True"<<endl;
            } else {
                cout<<"False"<<endl;
            }
        } else {
            if(is(s1,s2)==1) {
                cout<<"True"<<endl;
            } else {
                cout<<"False"<<endl;
            }
        }
    }
}
```

[查看原始 E.cpp](https://drive.google.com/file/d/1YHXCs4UIIdScwV9ldp0cKehVfboIu2oI/view?usp=drivesdk)

## F

<!-- homework-topic: 中心索引 -->

> **题目**　**中心索引**
>
> 寻找数组的一个中心索引，使得该索引左侧所有元素之和等于右侧所有元素之和。如果不存在，输出 `-1`；如果存在多个，输出最左边的一个。
>
> 输入（据代码归纳）：多组，每组先 `n` 再 `n` 个整数，读到文件结束。输出：每组一行索引或 `-1`。
>
> 示例：`1 7 3 6 5 6` → `3`（左侧 `1+7+3=11`，右侧 `5+6=11`）；`1 2 3` → `-1`。

**思路**　对每个可能的位置分别求左右两段的和再比较，命中即输出并跳出。下标从 0 开始，`k` 左侧是 `[0,k-1]`、右侧是 `[k+1,n-1]`，两段都不包含 `k` 本身。

**补充解析**　主版本的循环是 `for (k=1; k<n-1; k++)`，把下标 0 和 `n-1` 排除在外；但中心索引完全可能是首元素（左侧为空、和为 0）或末元素。例如 `[0,1,-1]` 的中心索引就是 0。另一方面，每次 `sum(a,0,k-1)` 与 `sum(a,k+1,n-1)` 都从头累加，单组最坏 $O(n^2)$。用「总和减去左侧和与当前元素」可在一次遍历内判定，时间 $O(n)$；累加用 `long long`，避免大数组求和溢出——原代码注释也写了「int 都改为 long long 才 AC」。

**待确认**：`n` 的范围与元素绝对值上限，以及 `n=0` 时的输出约定。

**补充解法**　先求总和，再维护左侧和，逐个下标判定。

```cpp
#include <iostream>
#include <vector>

int main() {
    int n;
    while (std::cin >> n) {
        std::vector<long long> a(n);
        long long total = 0;
        for (long long& value : a) {
            std::cin >> value;
            total += value;
        }

        long long left = 0;
        int answer = -1;
        for (int i = 0; i < n; ++i) {
            if (left == total - left - a[i]) {
                answer = i;
                break;
            }
            left += a[i];
        }
        std::cout << answer << '\n';
    }
}
```

优势是把两次区间求和换成一次前缀递推：右侧和 = 总和 − 左侧和 − 当前元素，判定是 $O(1)$，整体 $O(n)$。适用条件是元素可正可负（前缀和不必单调），以及 `n >= 1`；`n = 0` 时没有索引，题面未定义。核对：`1 7 3 6 5 6` → `3`；`[0,1,-1]` → `0`；`[5]` → `0`；`[1,2,3]` → `-1`。

**原始代码**

```cpp
#include<iostream>
using namespace std;

int sum(int* a,int i,int j) {      //int都改为long long才AC
    int s=0;
    for(int k=i;k<j+1;k++) {
        s+=a[k];
    }
    return s;
}

int main() {
    int n;
    while(cin>>n) {
        int*a =new int[n];
        for(int i=0;i<n;i++) {
            cin>>a[i];
        }

        bool is=0;
        for(int k=1;k<n-1;k++) {
            if(sum(a,0,k-1)==sum(a,k+1,n-1)) {
                cout<<k<<endl;
                is=1;
                break;
            }
        }
        if(is==0) {
            cout<<-1<<endl;
        }

        delete[] a;
    }
}


/*
#include<iostream>
#include<vector>
using namespace std;

int main() {
    int n;
    while(cin >> n) {
        vector<int> a(n);
        long long total_sum = 0;

        // 第一遍遍历：读取数据并计算总和
        for(int i = 0; i < n; i++) {
            cin >> a[i];
            total_sum += a[i];
        }

        long long left_sum = 0;
        int center_index = -1;
        bool found = false;

        // 第二遍遍历：寻找中心索引
        for(int i = 0; i < n; i++) {
            // 右侧和 = 总和 - 左侧和 - 当前元素
            long long right_sum = total_sum - left_sum - a[i];

            if(left_sum == right_sum) {
                center_index = i;
                found = true;
                break; // 找到最左边的一个就立刻退出
            }

            // 当前元素加入左侧和，为下一次循环做准备
            left_sum += a[i];
        }

        if(found) {
            cout << center_index << endl;
        } else {
            cout << -1 << endl;
        }
    }
    return 0;
}
*/
```

[查看原始 F.cpp](https://drive.google.com/file/d/1lJ5FEbF5kGmYRwyXggxoE1ckIv0Xc4oU/view?usp=drivesdk)

## 方法小结

- 字符模拟先把「符号 → 状态变化」列成表，再决定用 `switch` 还是查表；顺序无关的位移可以直接按计数算。
- 带格式的字符串解析要明确「谁是字段、谁是分隔」；固定步长只适用于严格成对的输入。
- 判定类问题先找必要条件（不同位置数、交叉相等），能把枚举交换降成一次线性扫描。
- 区间求和优先用「总和 − 左侧 − 当前」的前缀递推，既避免重复扫描，也要用足够宽的整型。
