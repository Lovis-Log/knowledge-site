---
slug: "12-oj-homework-05"
title: "第五次作业（数组、动态存储与矩阵）"
summary: "数组排序与归并、动态存储、矩阵与鞍点。"
updatedAt: "2026-11-24"
content_type: "reference"
group: "homework"
displayNumber: "07"
sources:
  - kind: article
    title: "本组作业原件"
    url: "https://drive.google.com/drive/folders/1KkKRH6uBEC-yIzV04jIfNRK5ctMOstri"
---

**来源**　课后作业

A–J 共 10 题。题意取自各 `.cpp` 顶部的题面注释；注释只给了要求、没给输入输出格式的部分，按代码补全并标为 **待确认**。

## A

<!-- homework-topic: 数组降序排序并输出元素及其原下标 -->

> **题目**　**数组降序排序并输出元素及其原下标**
>
> 将一组数据从大到小排列后输出，并显示每个元素及其在原数组中的下标。
>
> 输入：多组；每组先读 `n`，再读 `n` 个整数。输出：降序的「值 原下标」对，每对后面跟两个空格，每组一行。
>
> 示例：`5` 个数 `3 1 4 2 5` → `5 4  4 2  3 0  2 3  1 1  `。

**如何想到**：值和下标必须同步移动，那就让下标跟着值一起换——单独开一个 `index[]`，每次交换 `arr` 的同时交换 `index`，下标的正确性由构造保证，不需要事后再去原数组里找。

实现要点：
- 初始化 `index[i]=i`，代表"这位置上的值原本在第 i 位"。
- 双层循环做选择式排序，`swap(arr[i],arr[j])` 与 `swap(index[i],index[j])` 成对出现，这是全题唯一容易漏的地方。
- 内层从 `i+1` 开始，外层到 `n-1` 就够（`i=n-1` 时内层为空）。

**正确性**：有重复值时，"排序后按值回原数组查找下标"会定位到第一个相同值而错位；同步交换则每个下标始终指向自己那一个元素，重复值也正确。交换只在严格逆序时发生，两个相等元素不会直接被交换；但选择排序不是稳定排序，相等的值仍可能因被其他元素越过而改变先后（例如 `3 1 4 1 5` 输出 `1 3` 在 `1 1` 之前）。本题只要求「值—原下标」配对正确，不要求相同值的顺序。

**边界**：`arr` 与 `index` 定长 20，`n>20` 越界。**待确认**：`n` 的上限；每对的「值」与「原下标」之间是一个空格，对与对之间由每对末尾追加的两个空格隔开，行尾也多出两个空格，是否与样例逐字符一致。

**原始代码**

```cpp
 #include <iostream>
 using namespace std;

 void swap(int& a,int& b) {
    int temp;
    temp=a;           //出错：写了a=temp
    a=b;
    b=temp;
 }

 int main() {
    int n;
    while(cin>>n) {
        int arr[20];
        int index[20];
        for(int i=0;i<n;i++) {
            cin>>arr[i];
            index[i]=i;
        }

        for(int i=0;i<n;i++) {       //优化：i<n-1  因为i=n-1时内层循环不会执行
            for(int j=i+1;j<n;j++) {
                if(arr[i]<arr[j]) {
                    swap(arr[i],arr[j]);
                    swap(index[i],index[j]);
                }
            }
        }
        for(int i=0;i<n;i++) {
            cout<<arr[i]<<" "<<index[i]<<"  ";
        }
        cout<<endl;
    }
 }
```

[查看原始 A.cpp](https://drive.google.com/file/d/1_Q3-KMLGGktighhsDiC2USt9S9ZryW7C/view?usp=drivesdk)

**补充解析**　两层循环固定比较 $\frac{n(n-1)}{2}$ 次，与输入顺序无关，时间 $O(n^2)$、额外空间 $O(n)$。若 `n` 可能远大于 20，应改成 `std::vector` 并把下标和值绑成 `std::pair<int,int>`，再按值降序排序；若还希望相同值按原下标升序排列，用 `std::stable_sort` 并保持输入时的下标次序，这一点和原程序的并列顺序不同。

## B

<!-- homework-topic: 合并两个升序数组 -->

> **题目**　**合并两个升序数组**
>
> 把两个升序数组归并成一个升序数组，要求算法高效。
>
> 输入：首行测试组数 `N`；每组先 `m` 与 `m` 个数、再 `n` 与 `n` 个数。输出：合并后的总数，随后是合并结果。
>
> 示例：`3` 组，第一组 `3 / 1 4 7` 与 `2 / 2 5` → `5 1 2 4 5 7`。

**如何想到**：最省事的写法是先拼接再排序，正确但不是题面要的"高效算法"。既然两段都已升序，就只需各拿一个指针，每次取较小的那个放到结果尾部。

主版本把两段拼接进 `c`，再用双层交换循环排序，时间为 $O((m+n)^2)$。输出先写总数 `m+n`，再写各元素。

**正确性**：结果本身正确，只是复杂度不是最优。另有可读性隐患——`while` 体内重新声明了 `int n`，遮蔽了外层表示测试组数的 `n`：条件 `while(n--)` 在循环体外求值，所以行为仍然正确，但同名的两个变量极易看错，建议把内层改成 `len`。

更优解：双指针归并在 `O(m+n)` 内完成，前提正是"两段都已升序"——若输入未保证有序，这个方法直接失效，必须先校验题面。注释版即此实现，分支少、无嵌套循环。

> **补充证明** 设两个数组为 $A[0..m-1]$、$B[0..n-1]$，循环变量 `i`、`j` 分别表示两数组尚未输出的开头。每轮比较 `A[i]` 与 `B[j]`，把较小者接到输出末尾，并令对应的下标加一。不变式是：输出前缀恰好由 $A[0..i-1]$ 与 $B[0..j-1]$ 的全部元素组成并按非降序排列，而且它不大于 $A[i..]$ 与 $B[j..]$ 中的任何元素。因为 $A$、$B$ 各自有序，被取走的总是两个剩余开头中较小的一个，所以不变式在每轮后仍成立。每轮至少让 `i + j` 增加 1，循环最多执行 $m+n$ 次；某一数组耗尽后，把另一段剩余部分整段接上即可。

**待确认**：两版输出格式不同（一版每个元素后都带空格，一版是首个元素前带空格），需与样例逐字符比对。

**原始代码**

```cpp
#include <iostream>
using namespace std;

void swap(int& a,int& b) {
    int temp;
    temp=a;
    a=b;
    b=temp;
}

int main() {
    int n;
    cin>>n;
    while(n--) {
        int a[10],b[10],c[20];

        int m;
        cin>>m;
        for(int i=0;i<m;i++) {
            cin>>a[i];
        }

        int n;
        cin>>n;
        for(int i=0;i<n;i++) {
            cin>>b[i];
        }

        for(int i=0;i<m;i++) {
            c[i]=a[i];
        }
        for(int i=0;i<n;i++) {
            c[m+i]=b[i];
        }

        for(int i=0;i<m+n-1;i++) {
            for(int j=i+1;j<m+n;j++) {
                if(c[i]>c[j]) {
                    swap(c[i],c[j]);
                }
            }
        }

        cout<<m+n<<" ";
        for(int i=0;i<m+n;i++) {
            cout<<c[i]<<" ";
        }
        cout<<endl;
    }
}

/*
双指针法（思想）

#include <iostream>
using namespace std;

int main() {
    int N;
    cin >> N;

    while (N--) {
        int m, n;
        int A[10], B[10], C[20];

        cin >> m;
        for (int i = 0; i < m; i++) {
            cin >> A[i];
        }

        cin >> n;
        for (int i = 0; i < n; i++) {
            cin >> B[i];
        }

        int i = 0, j = 0, k = 0;

        while (i < m && j < n) {
            if (A[i] <= B[j]) {
                C[k] = A[i];
                i++;
            } else {
                C[k] = B[j];
                j++;
            }
            k++;
        }

        while (i < m) {
            C[k++] = A[i++];
        }

        while (j < n) {
            C[k++] = B[j++];
        }

        cout << m + n;
        for (int t = 0; t < m + n; t++) {
            cout << " " << C[t];
        }
        cout << endl;
    }

    return 0;
}

*/
```

[查看原始 B.cpp](https://drive.google.com/file/d/1PtA72X324V_0CiAn8XLzs_RL0hWjT7Qu/view?usp=drivesdk)

**补充解法**　两个数组已经升序。每次输出两个尚未处理元素中较小的一个，不再建第三个数组，也不需要重新排序。

```cpp
#include <iostream>
#include <vector>

int main() {
    int cases;
    if (!(std::cin >> cases)) return 0;
    for (int t = 0; t < cases; ++t) {
        int m, n;
        std::cin >> m;
        std::vector<int> a(m);
        for (int& value : a) std::cin >> value;
        std::cin >> n;
        std::vector<int> b(n);
        for (int& value : b) std::cin >> value;

        int i = 0, j = 0;
        std::cout << m + n;
        while (i < m && j < n) {
            if (a[i] <= b[j]) {
                std::cout << ' ' << a[i++];
            } else {
                std::cout << ' ' << b[j++];
            }
        }
        while (i < m) std::cout << ' ' << a[i++];
        while (j < n) std::cout << ' ' << b[j++];
        std::cout << '\n';
    }
}
```

优势是把归并的比较次数从 $O((m+n)^2)$ 降到 $O(m+n)$，并且不需要第三个数组，额外空间只有两个输入数组。适用条件是两个数组都已升序；若只保证「一段升序」或完全无序，应先用 `std::sort`，再归并或直接排序。

## C

<!-- homework-topic: 用指针数组输出星期英文 -->

> **题目**　**用指针数组输出星期英文**
>
> 输入一个表示星期几的数（1–7），输出对应英文单词；越界输出 `input error!`。
>
> 输入：多组，每行一个整数。输出：每组一行英文单词或 `input error!`。
>
> 示例：`1` → `monday`；`7` → `sunday`；`8` → `input error!`。

**要点**：`const char* week[7]` 是"指向常量的指针数组"——数组元素是指针，指向的字符串字面量不可修改，所以 `const` 必须写在 `char` 左侧；写成 `char* const` 含义就完全变了。下标 `n-1` 完成 1 基到 0 基的换算。

**边界**：1 与 7 都要能取到（`n<1 || n>7` 才报错），否则 sunday 永远取不到。

**待确认**：输出全小写，是否要求首字母大写；非整数输入未处理。

**原始代码**

```cpp
 #include <iostream>
 using namespace std;

 int main() {
    const char* week[7]={"monday","tuesday","wednesday","thursday","friday","saturday","sunday"};    //const 指针只能读取字符，不能修改字符
    int n;
    while(cin>>n) {
        if(n>7||n<1) {
            cout<<"input error!"<<endl;
        } else {
        cout<<week[n-1]<<endl;
        }
    }
 }
```

[查看原始 C.cpp](https://drive.google.com/file/d/1PeWhvIMGoVnTMW0PyF0PYJAP1FJV9Aru/view?usp=drivesdk)

**补充解析**　`const char*` 与 `char* const` 的区别在 `const` 修饰谁：前者是「指向常量的指针」，指针可以指向别的字符串，但不能通过它改字符；后者是「常量指针」，指针本身不能改，指向的内容仍可写。字符串字面量存放在只读区，必须用前者。指针数组的每个元素只占一个指针大小，七个单词共享静态存储，不需要二维 `char` 数组逐字符拷贝。

## D

<!-- homework-topic: n 阶矩阵的生成、副对角线和与去外层 -->

> **题目**　**n 阶矩阵的生成、副对角线和与去外层**
>
> 生成 n 阶矩阵，主对角线及其上方元素为 1，主对角线下方元素依次递增；求副对角线元素之和；删除最外层元素后输出 n-2 阶矩阵。
>
> 输入：多组，每组一个整数 `n`。输出：先输出原矩阵（每行 `n` 个数，空格分隔），再输出副对角线和，最后输出去掉最外层后的子矩阵。
>
> 示例：`n = 4` 时，第一列为 `1,2,3,4`，第二列为 `1,1,2,3`；副对角线和为 `1+1+2+4 = 8`。

**如何想到**：三个小任务共用一个矩阵，先生成再复用。生成规则里 `j>=i` 与 `j<i` 是分界，下方第 i 行第 j 列离主对角线有 `i-j` 步，取值 `i-j+1`；副对角线满足 `j=n-1-i`，一个循环即可。

实现要点：
- `j>=i ? 1 : i-j+1`，注意 `+1`，否则紧邻主对角线的那一格会变成 0。
- 副对角线和累加 `a[i][n-1-i]`，i 从小到大走一遍正好覆盖全部 n 个元素，交叉点不会重复计。
- 去外层即取 `1..n-2` 的子矩阵。
- 动态二维数组：`new int*[n]` 后逐行 `new int[n]`，末尾先逐行 `delete[]` 再 `delete[]` 指针数组，两步都不能省。

例（n=4）：第一列自上而下是 `1,2,3,4`，第二列是 `1,1,2,3`。

`n = 1` 时副对角线和为 1。`n < 3` 时程序仍输出原矩阵及副对角线和，去掉外层后没有元素可打印。**待确认**　题目对 `n < 3` 是否另有输出规定。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    while(cin>>n) {

        int** arr=new int*[n];       //动态储存
        for(int i=0;i<n;i++) {
            arr[i]=new int[n];
        }

        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                if(j>=i) {
                    arr[i][j]=1;
                } else {
                    arr[i][j]=i-j+1;  //加1
                }
            }
        }

        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                cout<<arr[i][j]<<" ";
            }
            cout<<endl;
        }

        int sum=0;
        for(int i=0;i<n;i++) {
            sum+=arr[i][n-1-i];
        }
        cout<<sum<<endl;

        for(int i=1;i<n-1;i++) {
            for(int j=1;j<n-1;j++) {
                cout<<arr[i][j]<<" ";
            }
            cout<<endl;
        }

        for(int i=0;i<n;i++) {
            delete[] arr[i];
        }
        delete[] arr;

    }
}
```

[查看原始 D.cpp](https://drive.google.com/file/d/11uPx464mnkzNqcgVf629FnmtcrecjJ97/view?usp=drivesdk)

**补充解析**　矩阵第 `i` 行、第 `j` 列（`j<i`）的取值是 `i-j+1`：沿列向下每走一步加 1。副对角线 `a[i][n-1-i]` 的上半段（`i <= (n-1)/2`）全为 1，下半段从 2 开始逐格加 1，所以和随 `n` 变化，没有简单的线性公式：`n=3` 为 `1+1+3=5`，`n=4` 为 `1+1+2+4=8`，`n=5` 为 `1+1+1+3+5=11`。逐项累加即可，每个元素只填一次、只读常数次，时间与空间均为 $O(n^2)$。

## E

<!-- homework-topic: 求数组最小元素及其下标 -->

> **题目**　**求数组最小元素及其下标**
>
> 设计函数求整型数组的最小元素及其下标，在主函数中输入数组、调用函数并输出结果；若最小值重复出现，返回第一次出现的位置。
>
> 输入：多组；每组先 `n`，再 `n` 个整数。输出：每组一行「最小值 下标」。
>
> 示例：`5` 个数 `3 1 4 1 5` → `1 1`（第一次出现在下标 1）。

**如何想到**：一次遍历，只有严格小于才更新，等于时不动，天然保留第一次出现的位置。写成 `<=` 就会跑到最后一次出现的地方。

**要点**：`search(a,n,min,index)` 用引用把两个结果带出，避免返回多个值；`min`、`index` 先由 `a[0]` 初始化，循环从 1 开始。

**代码疑点（实现 bug，不是题意）**：

- `int* a = new int[n];` 写在 `cin >> n` 之前，使用未初始化的 `n` 导致未定义行为。
- `delete[] a` 放在 `while` 内部，第二组开始时继续往已释放的内存写入，属未定义行为；即使不崩，第二组的 n 若比第一组大就会越界。
- 先读入正的 `n`，再在这一组内分配与释放。`n == 0` 时 `search` 不能读取 `a[0]`。若课程允许，可用 `std::vector<int>` 管理数组生命周期。

**待确认**：多组输入的判定方式（`while(cin>>n)`）；n 的上限。

**原始代码**

```cpp
#include <iostream>
using namespace std;

void search(int a[],int n,int& min,int& index) {
    min=a[0];
    index=0;
    for(int i=1;i<n;i++) {
        if(a[i]<min) {
            min=a[i];
            index=i;
        }
    }
}

int main() {
    int n;
     int* a=new int[n];

    while(cin>>n) {
        for(int i=0;i<n;i++) {
            cin>>a[i];
        }
        int min,index;
        search(a,n,min,index);
        cout<<min<<" "<<index<<endl;

        delete[] a;
    }
}
```

[查看原始 E.cpp](https://drive.google.com/file/d/1Vwfx8XPVuvAKDrrt8Ifa7E7O9FQSPbgt/view?usp=drivesdk)

**补充解法**　先读长度再分配数组，每组结束自动释放。扫描时只在遇到严格更小的值时更新下标，从而保留第一次出现的位置。

```cpp
#include <iostream>
#include <vector>

int firstMinimumIndex(const std::vector<int>& values) {
    int best = 0;
    for (int i = 1; i < static_cast<int>(values.size()); ++i) {
        if (values[i] < values[best]) best = i;
    }
    return best;
}

int main() {
    int n;
    while (std::cin >> n) {
        std::vector<int> values(n);
        for (int& value : values) std::cin >> value;

        const int index = firstMinimumIndex(values);
        std::cout << values[index] << ' ' << index << '\n';
    }
}
```

优势是把「分配—使用—释放」压缩进每组的作用域，异常或提前 `continue` 也不会漏掉释放；`<` 与 `<=` 的选择就是「第一次」与「最后一次」的分界。适用条件是 `n >= 1`；`n == 0` 时没有最小元素，题面未定义，这段代码同样会读取 `values[0]`，需要自行加保护。

## F

<!-- homework-topic: 有序数组插入并挤出最大数 -->

> **题目**　**有序数组插入并挤出最大数**
>
> 数组已从小到大排列，读入一个介于最小值与最大值之间的数，插入后仍保持有序，长度不变（最大数被挤出）。
>
> 输入：单组 `n`、`n` 个升序整数、一个待插入的数 `k`。输出：插入后的数组，空格分隔。
>
> 示例：`5` 个数 `1 3 5 7 9`，插入 `4` → `1 3 4 5 7`。

**如何想到**：插入位置就是第一个"不小于 k"的位置；长度固定为 n，所以整体右移一位时最后那个元素自然被覆盖掉，不必显式删除。

实现要点：
- `for(i=0;i<n;i++) if(a[i]>=k) break;` 找到插入点。
- `for(j=n-1;j>i;j--) a[j]=a[j-1];` 从尾部往前挪，倒序是关键——正序会把后面的值全部覆盖成同一个。
- 用 `>=` 而非 `>`：k 与已有值相等时插在它前面，结果仍非降序。

**边界**：题面保证 k 在最小与最大之间，所以 `i<n` 恒成立；若 k 大于所有元素，`i` 到 n，移位循环不执行且 `if(i<n)` 跳过，k 被静默丢弃——这是题面假设之外的行为。**待确认**：只处理一组输入。

**原始代码**

```cpp
#include <iostream>
using namespace std;

void insert(int a[],int n,int k) {
    int i;
    for(i=0;i<n;i++) {
        if(a[i]>=k) {
            break;
        }
    }
    for(int j=n-1;j>i;j--) {  //去掉最后一位,j-1包括i
        a[j]=a[j-1];
    }
    if(i<n) {
        a[i]=k;
    }
}

int main() {
    int n,k;
    cin>>n;
    int* a=new int[n];
    for(int i=0;i<n;i++) {
        cin>>a[i];
    }
    cin>>k;
    insert(a,n,k);
    for(int i=0;i<n;i++) {
        cout<<a[i]<<" ";
    }
    cout<<endl;
}
```

[查看原始 F.cpp](https://drive.google.com/file/d/1KLH_8WUQvlOFWYBfEGn7bwOV7k2ylbVB/view?usp=drivesdk)

**补充解析**　移位必须从右往左：若先写 `a[i+1]=a[i]`，`a[i]` 刚被写入就会在下一步覆盖 `a[i+1]` 的原值，整段变成同一个数。正确顺序下，每个元素只移动一次，时间 $O(n)$、额外空间 $O(1)$。当 `k` 大于所有元素时，正确语义应是「丢弃 k、数组不变」，而代码因为 `i==n` 也恰好不改数组，只是没有提示；若题面允许这种输入，应显式说明。

## G

<!-- homework-topic: 动态数组随机数赋值与逆置 -->

> **题目**　**动态数组随机数赋值与逆置**
>
> 每组输入数组长度 `N`（其中 `1 <= N <= 7`）。用线性同余公式为动态数组赋值，第一行输出原数组，第二行输出逆置后的数组。多组输入接续同一个随机状态。
>
> 输入：多组 `N`。输出：每组两行，原数组与逆置数组，空格分隔。
>
> 示例：`N = 5` 时，按样例记录第一行为 `19 24 16 45 74`，第二行为 `74 45 16 24 19`。

把 `r` 放在读入循环外，初始值为 0。每次先用 `r = (25173 * r + 13849) % 65536` 更新状态。按样例可还原筛选规则：只有 `r` 本身在 `10–99` 时才存入数组，其余值也要参与下一步递推。遇到第 `N` 个有效值就结束本组，下一组继续用该状态向后生成。

题面要求按 `N` 分配动态数组（主版本改用定长 `a[7]`、`b[7]`，在 `N ≤ 7` 内够用）。生成后先按原顺序输出；逆置时用两个下标从首尾向中间移动，每次交换一对，直到相遇或交错，原地完成，额外空间为常数。

**补充解析**　主版本直接把 `r` 存进数组，第一项会是 `13849`，与上面的样例不符；按「筛两位数」的规则，状态要递推 4539 次才第一次落入 `10–99`，得到 19，随后是 24、16、45、74。注释版用 `r % 100` 取两位数，第一项是 49，也不符。两种差异都说明「只存 `r`」和「只取 `r % 100`」不是题面要求，真正被筛的是 `r` 本身。**待确认**：样例是否确为 `19 24 16 45 74`；若是，则代码的赋值规则需要改。

注释版直接按下标倒序输出，不需要第二块数组；主版本的逆置写法额外开了 `b[7]`，而原地首尾交换只需一个临时变量。对 `N ≤ 7`，三种写法都能过，但原地交换是更一般的做法。

**原始代码**

```cpp
 #include <iostream>
 using namespace std;

 int main() {
    int n;
    int r=0;           //题目要求下一组测试数据的随机数接着上一组继续生成，不能每次重新从 0 开始
    while(cin>>n) {
        int a[7];
        for(int i=0;i<n;i++) {
            r=(25173*r+13849)%65536;
            a[i]=r;
            cout<<a[i]<<" ";
        }
        cout<<endl;

        int b[7];
        for(int i=0;i<n;i++) {
            b[i]=a[n-i-1];
            cout<<b[i]<<" ";
        }
        cout<<endl;
    }
 }


 /*
#include <iostream>
using namespace std;

int main() {
    int n;
    long long r = 0;

    while (cin >> n) {
        int a[7];

        for (int i = 0; i < n; i++) {
            int num;
            while (true) {
                r = (25173 * r + 13849) % 65536;
                num = r % 100;
                if (num >= 10 && num <= 99) {
                    break;
                }
            }
            a[i] = num;

            cout << a[i];
            if (i != n - 1) cout << " ";
        }
        cout << endl;

        for (int i = n - 1; i >= 0; i--) {
            cout << a[i];
            if (i != 0) cout << " ";
        }
        cout << endl;
    }
    return 0;
}
 */
```

[查看原始 G.cpp](https://drive.google.com/file/d/1fEYI62vj8HOWr-cVT58r86S-5qP_W_OE/view?usp=drivesdk)

**补充解法**　按原题样例筛选随机状态本身的两位数。用动态数组保存本组结果，只在程序开始时把随机状态设为零。

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

void printArray(const std::vector<int>& values) {
    for (std::size_t i = 0; i < values.size(); ++i) {
        if (i > 0) std::cout << ' ';
        std::cout << values[i];
    }
    std::cout << '\n';
}

int main() {
    long long state = 0;
    int n;
    while (std::cin >> n) {
        std::vector<int> values(n);
        for (int& value : values) {
            do {
                state = (25173 * state + 13849) % 65536;
            } while (state < 10 || state > 99);
            value = static_cast<int>(state);
        }

        printArray(values);
        std::reverse(values.begin(), values.end());
        printArray(values);
    }
}
```

优势是筛选条件直接写在 `do-while` 里，读起来就是「一直取，直到取到两位数」；`std::reverse` 原地逆置，省掉第二块数组。适用条件是题面确实要求所有元素为两位数；若题面只要求 `1–2` 位（即允许 0–9），把条件改成 `state > 99` 即可。

## H

<!-- homework-topic: Fibonacci 数列前 n 项中的素数 -->

> **题目**　**Fibonacci 数列前 n 项中的素数**
>
> 根据 `n` 计算 Fibonacci 数列前 `n` 项存入动态数组，找出其中的素数并输出。要求用函数 `fibonacci` 生成前 `n` 项、用函数 `isPrime` 判断素数。
>
> 输入：多组 `n`。输出：每组一行，命中的素数依次输出，每个数后跟一个空格。
>
> 示例：`n = 6` 时数列为 `1 1 2 3 5 8`，输出 `2 3 5 `。

**如何想到**：拆成两个独立函数——`fibonacci` 负责生成，`isPrime` 负责判定，主函数只做筛选。递推 `a[i]=a[i-1]+a[i-2]`，前两项都是 1。

**要点**：`isPrime` 试除到 `i*i<=n` 即可，比到 `n-1` 快一个量级；`n<2` 直接返回假，因为 1 不是素数——这一条对本题影响很大，数列开头有两个 1。

**边界与疑点**：

- `n = 0` 时 `a[0]`、`a[1]` 都越界写；`n = 1` 时 `a[1]` 越界写（只分配了 `n` 个 `int`），需在 `n < 2` 时跳过赋值。
- 在常见的 32 位 `int` 下，第 47 项已超出范围。64 位 `long long` 能表示到第 92 项。试除条件宜写为 `i <= value / i`，避免扩大数值范围后 `i * i` 溢出。
- 每组都无条件 `endl`，无素数时会输出一个空行。
- 数组未 `delete[]`，多组输入下逐组泄漏。

**待确认**：n 的范围与上限、无素数时的输出要求。

**原始代码**

```cpp
#include <iostream>
using namespace std;

bool isprime(int n) {
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

int main() {
    int n;
    while(cin>>n) {
        int* a=new int[n];
        a[0]=1;
        a[1]=1;
        for(int i=2;i<n;i++) {
            a[i]=a[i-1]+a[i-2];
        }
        for(int i=0;i<n;i++) {
            if(isprime(a[i])==1) {
                cout<<a[i]<<" ";
            }
        }
        cout<<endl;
    }
}
```

[查看原始 H.cpp](https://drive.google.com/file/d/1HT_HC5lF5MEL_zq6v3KumjtS7dPnawW9/view?usp=drivesdk)

**补充解法**　用 `vector<long long>` 控制生命周期，把生成过程单独做成题面要求的 `fibonacci` 函数，先处理 `n < 2` 的边界，再把试除条件写成除法形式。

```cpp
#include <iostream>
#include <vector>

bool isPrime(long long value) {
    if (value < 2) return false;
    for (long long d = 2; d <= value / d; ++d) {
        if (value % d == 0) return false;
    }
    return true;
}

std::vector<long long> fibonacci(int n) {
    std::vector<long long> fib(n, 1);
    for (int i = 2; i < n; ++i) fib[i] = fib[i - 1] + fib[i - 2];
    return fib;
}

int main() {
    int n;
    while (std::cin >> n) {
        if (n <= 0) {
            std::cout << '\n';
            continue;
        }
        const std::vector<long long> fib = fibonacci(n);

        for (long long value : fib) {
            if (isPrime(value)) std::cout << value << ' ';
        }
        std::cout << '\n';
    }
}
```

优势有三点：`vector(n, 1)` 直接把前两项填成 1，`n = 1` 时也不会越界；`long long` 把可表示范围推到第 92 项；`d <= value / d` 在数值扩大后仍不会因 `d * d` 溢出而误判。它还补出了题面要求的 `fibonacci` 函数——本地代码把生成过程直接写在 `main` 里，提交时按原型单独实现更稳妥。适用条件是 `n <= 92`；超过后 Fibonacci 项本身溢出，需要改用大整数或只判前 92 项。核对：`n=1`、`n=2` 都只输出一个换行（前两项都是 1，不是素数），`n=6` 输出 `2 3 5 `。

## I

<!-- homework-topic: 统计两个 3×4 矩阵对应位置相等的元素个数 -->

> **题目**　**统计两个 3×4 矩阵对应位置相等的元素个数**
>
> 输入两个 3 行 4 列的整型数组，统计对应位置上数值相等的元素个数。
>
> 输入：单组，先 12 个数填满第一个矩阵，再 12 个数填满第二个。输出：一个整数。
>
> 示例：两个相同矩阵 → `12`；完全不同的矩阵 → `0`。

单组输入，原程序先按行读满矩阵 `a`，再读满 `b`，最后按相同的 `(i, j)` 比较。也可以在读取 `b` 的对应元素时立即与 `a[i][j]` 比较，只保存第一张矩阵。计数从 0 开始，每遇到一对相等元素加 1。

**原始代码**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3][4];
    int b[3][4];
    for(int i=0;i<3;i++) {
        for(int j=0;j<4;j++) {
            cin>>a[i][j];
        }
    }
    for(int i=0;i<3;i++) {
        for(int j=0;j<4;j++) {
            cin>>b[i][j];
        }
    }

    int count=0;
    for(int i=0;i<3;i++) {
        for(int j=0;j<4;j++) {
            if(a[i][j]==b[i][j]) {
                count++;
            }
        }
    }
    cout<<count<<endl;
}
```

[查看原始 I.cpp](https://drive.google.com/file/d/1UWtN_DcvCGU2e5oyiwuVr-0mBbIZXtN1/view?usp=drivesdk)

**补充解析**　「对应位置」意味着两个矩阵必须使用同一套行列编号，读入顺序也必须一致：都是先行后列、从 `(0,0)` 到 `(2,3)`。若把第二张矩阵按列优先读入，比较的就不是同一位置了。12 个元素只比较一次，时间 $O(1)$。

## J

<!-- homework-topic: n 阶矩阵的鞍点 -->

> **题目**　**n 阶矩阵的鞍点**
>
> 鞍点是在所在行中最大、在所在列中最小的元素。按文件中保留的题面，输入 `n` 阶矩阵，输出第一个鞍点的位置，行列下标从 0 开始。没有鞍点时输出 `没有鞍点`。
>
> 输入：多组，每组一个 `n` 与 `n²` 个整数。输出：每组一行，`行 列` 或 `没有鞍点`。
>
> 示例：`3` 阶矩阵 `5 6 7 / 4 5 6 / 3 4 5` 的第一个鞍点是 `2 2`（值 5）。

把判定拆成两次一维检查。只要同行有更大的数，或同列有更小的数，当前位置就不是鞍点。逐格检查的最坏时间为 $O(n^3)$。先扫一遍矩阵记录每行最大值和每列最小值，再按行优先检查当前值是否同时等于两者，时间可降到 $O(n^2)$，额外空间为 $O(n)$。

判定函数用 `<` 和 `>` 寻找反例，遇到相同的最大值或最小值仍然允许并列。按行优先扫描时，取行号最小的鞍点，同一行再取列号最小的鞍点。

主版本找到后继续扫描，会输出全部鞍点。注释版找到后退出内外两层循环，落实题面明确写出的「第一个」。例如矩阵元素全是 1 时，按行优先只应输出 `0 0`。**题面与代码行为不一致**，按各自来源描述：题面要求第一个，主版本输出全部，注释版符合题面。

**原始代码**

```cpp
#include <iostream>
using namespace std;

bool is_row_max(int** a,int k,int m,int n) {
    int j;
    for(j=0;j<k;j++) {
        if(a[m][n]<a[m][j]) {      //注意不要加=
            return 0;
        }
    }
    return 1;
}

bool is_col_min(int** a,int k,int m,int n) {
    int i;
    for(i=0;i<k;i++) {
        if(a[m][n]>a[i][n]) {
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

        int count=0;
        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                if(is_row_max(a,n,i,j)==1&&is_col_min(a,n,i,j)==1) {
                    cout<<i<<" "<<j<<endl;
                    count++;
                }
            }
        }

        if(count==0) {
            cout<<"没有鞍点"<<endl;
        }

        for(int i=0;i<n;i++) {
            delete[] a[i];
        }
        delete[] a;
    }
}




/*

#include <iostream>
using namespace std;

bool is_row_max(int a[][100],int k,int m,int n) {
    for(int j=0;j<k;j++) {
        if(a[m][n]<a[m][j]) {
            return 0;
        }
    }
    return 1;
}

bool is_col_min(int a[][100],int k,int m,int n) {
    for(int i=0;i<k;i++) {
        if(a[m][n]>a[i][n]) {
            return 0;
        }
    }
    return 1;
}

int main() {
    int n;
    while(cin>>n) {
        int a[100][100];

        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                cin>>a[i][j];
            }
        }

        int count=0;
        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                if(is_row_max(a,n,i,j)==1 &&
                   is_col_min(a,n,i,j)==1) {
                    cout<<i<<" "<<j<<endl;
                    count++;
                    break;
                }
            }
            if(count>0) {
                break;
            }
        }

        if(count==0) {
            cout<<"没有鞍点"<<endl;
        }
    }
    return 0;
}

*/
```

[查看原始 J.cpp](https://drive.google.com/file/d/1X3gm-U-fQMf_zeNQ53Fkbx62TS7DBQxC/view?usp=drivesdk)

**补充解法**　读矩阵时同步求出各行最大值、各列最小值，再按行优先寻找第一个同时等于两者的元素。

```cpp
#include <algorithm>
#include <iostream>
#include <limits>
#include <utility>
#include <vector>

std::pair<int, int> firstSaddle(
    const std::vector<std::vector<int>>& matrix,
    const std::vector<int>& rowMax,
    const std::vector<int>& colMin
) {
    const int n = static_cast<int>(matrix.size());
    for (int row = 0; row < n; ++row) {
        for (int col = 0; col < n; ++col) {
            const int value = matrix[row][col];
            if (value == rowMax[row] && value == colMin[col]) {
                return {row, col};
            }
        }
    }
    return {-1, -1};
}

int main() {
    int n;
    while (std::cin >> n) {
        std::vector<std::vector<int>> matrix(n, std::vector<int>(n));
        std::vector<int> rowMax(n, std::numeric_limits<int>::lowest());
        std::vector<int> colMin(n, std::numeric_limits<int>::max());
        for (int row = 0; row < n; ++row) {
            for (int col = 0; col < n; ++col) {
                int& value = matrix[row][col];
                std::cin >> value;
                rowMax[row] = std::max(rowMax[row], value);
                colMin[col] = std::min(colMin[col], value);
            }
        }

        const auto [row, col] = firstSaddle(matrix, rowMax, colMin);
        if (row == -1) {
            std::cout << "没有鞍点\n";
        } else {
            std::cout << row << ' ' << col << '\n';
        }
    }
}
```

优势是把「逐格重扫整行整列」变成两次线性扫描：求行最大值、列最小值各 $O(n^2)$，最后判定 $O(n^2)$，总计 $O(n^2)$，额外空间 $O(n^2)$（存矩阵）加 $O(n)$（两张表）。适用条件是只输出第一个鞍点；若要全部输出，把 `return` 换成「记录后继续扫描」即可。核对：`5 6 7 / 4 5 6 / 3 4 5` 输出 `2 2`；全 1 矩阵输出 `0 0`；`2 1 3 / 1 3 2 / 3 2 1` 输出 `没有鞍点`。

## 方法小结

- 值和下标要一起动，就用「同步交换」或 `pair`；不要事后再回原数组查找。
- 两段有序数据的合并用双指针；先拼接再排序虽然正确，但丢掉了「有序」这一前提。
- 动态分配的顺序永远是「先读长度、再分配、组内使用、组末释放」，释放要放在循环体内。
- 矩阵题先想清下标与几何位置的关系（主对角线 `i==j`、副对角线 `i+j==n-1`），再用一次扫描代替重复扫描。
