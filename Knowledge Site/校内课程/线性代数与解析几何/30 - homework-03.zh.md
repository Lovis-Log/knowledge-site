---
slug: "homework-03"
title: "第 3 次作业（矩阵运算与秩）"
summary: "第 3 次作业 8 道题的题面与补充解答。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "homework"
displayNumber: "03"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "3.jpg，本次作业第 1—8 题"
    url: "https://drive.google.com/file/d/1lsatNhZx8CkTK1NUNdKJXhUfvByZqzNi/view?usp=drivesdk"
---

本次作业为滚动截图，含第 1—8 道主观题。解答均为新增，标注「补充解答」。



## 1.(5)

<!-- homework-topic: 旋转矩阵的 n 次幂 -->

$$
A=\begin{pmatrix}\cos\alpha&-\sin\alpha\\ \sin\alpha&\cos\alpha\end{pmatrix},\qquad \text{求 }A^n .
$$

**补充解答**

$A$ 是旋转角为 $\alpha$ 的旋转矩阵。几何上「转 $\alpha$ 再转 $\alpha$」就是转 $2\alpha$，故猜想

$$
A^n=\begin{pmatrix}\cos n\alpha&-\sin n\alpha\\ \sin n\alpha&\cos n\alpha\end{pmatrix}.
$$

对 $n$ 归纳证明。$n=1$ 时就是 $A$ 本身。设 $n=k$ 成立，则

$$
A^{k+1}=A^kA=
\begin{pmatrix}\cos k\alpha&-\sin k\alpha\\ \sin k\alpha&\cos k\alpha\end{pmatrix}
\begin{pmatrix}\cos\alpha&-\sin\alpha\\ \sin\alpha&\cos\alpha\end{pmatrix}.
$$

逐元计算，用和角公式：

$$
(1,1):\cos k\alpha\cos\alpha-\sin k\alpha\sin\alpha=\cos(k+1)\alpha,
$$
$$
(1,2):-\cos k\alpha\sin\alpha-\sin k\alpha\cos\alpha=-\sin(k+1)\alpha,
$$
$$
(2,1):\sin k\alpha\cos\alpha+\cos k\alpha\sin\alpha=\sin(k+1)\alpha,
$$
$$
(2,2):-\sin k\alpha\sin\alpha+\cos k\alpha\cos\alpha=\cos(k+1)\alpha .
$$

故 $A^{k+1}$ 具有同样形式，结论对一切正整数 $n$ 成立：

$$
A^n=\begin{pmatrix}\cos n\alpha&-\sin n\alpha\\ \sin n\alpha&\cos n\alpha\end{pmatrix}.
$$

**验算**：取 $\alpha=\pi/6$、$n=3$，则 $A^3$ 应为 $\begin{pmatrix}\cos\frac{\pi}{2}&-\sin\frac{\pi}{2}\\ \sin\frac{\pi}{2}&\cos\frac{\pi}{2}\end{pmatrix}=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$；直接乘两次也得到该矩阵 ✓。

---

## 3.(1)

<!-- homework-topic: 三阶矩阵的多项式 f(A) -->

$$
A=\begin{pmatrix}0&1&0\\0&0&1\\-2&0&1\end{pmatrix},\qquad
f(x)=x^3-3x^2-2x+2 .
$$

求 $A^2,\ A^3,\ f(A)$。

**补充解答**

**乘幂。** $A$ 的前两行是「上移一行」，第三行是 $(-2,0,1)$，即 $A^2$ 的第 $i$ 行等于 $A$ 的第 $i+1$ 行（$i=1,2$），第 3 行等于 $-2$ 倍第 1 行加 1 倍第 3 行：

$$
A^2=\begin{pmatrix}0&0&1\\-2&0&1\\-2&-2&1\end{pmatrix}.
$$

同理 $A^3=A^2A$：第 1 行取 $A$ 的第 3 行 $(-2,0,1)$，第 2 行取 $-2$ 倍第 1 行加第 3 行 $(-2,-2,1)$，第 3 行取 $-2$ 倍第 1 行减 $2$ 倍第 2 行加第 3 行 $(-2,-2,-1)$：

$$
A^3=\begin{pmatrix}-2&0&1\\-2&-2&1\\-2&-2&-1\end{pmatrix}.
$$

**代入多项式。**

$$
A^3-3A^2=\begin{pmatrix}-2&0&-2\\4&-2&-2\\4&4&-4\end{pmatrix},\qquad
-2A=\begin{pmatrix}0&-2&0\\0&0&-2\\4&0&-2\end{pmatrix},
$$

相加后再加 $2E$：

$$
f(A)=A^3-3A^2-2A+2E=
\begin{pmatrix}0&-2&-2\\4&0&-4\\8&4&-4\end{pmatrix}.
$$

**捷径核验**：先算 $A$ 的特征多项式

$$
|\lambda E-A|=\lambda^3-\lambda^2+2=(\lambda+1)(\lambda^2-2\lambda+2),
$$

由 Cayley–Hamilton 定理 $A^3=A^2-2E$。代入 $f$：

$$
f(A)=(A^2-2E)-3A^2-2A+2E=-2A^2-2A=-2(A^2+A).
$$

而 $A^2+A=\begin{pmatrix}0&1&1\\-2&0&2\\-4&-2&2\end{pmatrix}$，乘以 $-2$ 恰为上式，两种算法一致 ✓。

---

## 4.

<!-- homework-topic: 与二阶矩阵可交换的全部矩阵 -->

求与 $A=\begin{pmatrix}3&1\\-2&2\end{pmatrix}$ 可交换的所有矩阵。

**补充解答**

设 $M=\begin{pmatrix}a&b\\c&d\end{pmatrix}$，写出 $AM$ 与 $MA$：

$$
AM=\begin{pmatrix}3a+c&3b+d\\-2a+2c&-2b+2d\end{pmatrix},\qquad
MA=\begin{pmatrix}3a-2b&a+2b\\3c-2d&c+2d\end{pmatrix}.
$$

逐元令其相等：

$$
(1,1):\ 3a+c=3a-2b\ \Rightarrow\ c=-2b,
$$
$$
(1,2):\ 3b+d=a+2b\ \Rightarrow\ d=a-b,
$$
$$
(2,1):\ -2a+2c=3c-2d\ \Rightarrow\ c=2d-2a,
$$
$$
(2,2):\ -2b+2d=c+2d\ \Rightarrow\ c=-2b .
$$

(1,1) 与 (2,2) 给出同一条件 $c=-2b$；(2,1) 在代入 $c=-2b,\ d=a-b$ 后也化为 $c=2(a-b)-2a=-2b$，自动满足。所以

$$
M=\begin{pmatrix}a&b\\-2b&a-b\end{pmatrix}
=aE+b\begin{pmatrix}0&1\\-2&-1\end{pmatrix},
$$

其中 $a,b\in\mathbb{R}$。

即全体可交换矩阵是 $E$ 与 $A-3E$ 的线性组合（注意 $\begin{pmatrix}0&1\\-2&-1\end{pmatrix}=A-3E$），这与「$A$ 的特征值互异，其交换化子是 $A$ 的多项式全体」这一结论相符（由 $A^2=5A-8E$ 知高次项都可降阶）。

**验算**：取 $a=1,b=1$，则 $M=E+(A-3E)=A-2E=\begin{pmatrix}1&1\\-2&0\end{pmatrix}$。计算
$AM=\begin{pmatrix}3&1\\-2&2\end{pmatrix}\begin{pmatrix}1&1\\-2&0\end{pmatrix}=\begin{pmatrix}1&3\\-6&-2\end{pmatrix}$，
$MA=\begin{pmatrix}1&1\\-2&0\end{pmatrix}\begin{pmatrix}3&1\\-2&2\end{pmatrix}=\begin{pmatrix}1&3\\-6&-2\end{pmatrix}$，相等 ✓。

---

## 6.

<!-- homework-topic: 与任意 n 阶矩阵可交换者为数量矩阵 -->

证明：与任意 $n$ 阶矩阵都可交换的矩阵只能是数量矩阵。

**补充解答**

设 $A=(a_{ij})$ 与一切 $n$ 阶矩阵可交换。取基本矩阵 $E_{ij}$（只有 $(i,j)$ 位置为 1，其余为 0），由题设 $AE_{ij}=E_{ij}A$。

分别写出两边的元素。$AE_{ij}$ 的第 $k$ 行只有第 $j$ 列非零，等于 $a_{ki}$；$E_{ij}A$ 的第 $i$ 行等于 $A$ 的第 $j$ 行，其余行为零。于是对任意 $k,l$：

$$
(AE_{ij})_{kl}=
\begin{cases}a_{ki},& l=j,\\ 0,& l\ne j,\end{cases}
\qquad
(E_{ij}A)_{kl}=
\begin{cases}a_{jl},& k=i,\\ 0,& k\ne i.\end{cases}
$$

比较 $(k,l)=(i,j)$ 得 $a_{ii}=a_{jj}$，说明对角元全相等，记为 $\lambda$；比较 $k\ne i,\ l=j$ 得 $a_{ki}=0$，说明所有非对角元为零。故

$$
A=\lambda E .
$$

反过来 $\lambda E$ 显然与任意矩阵可交换。所以与任意 $n$ 阶矩阵可交换的矩阵恰为数量矩阵。

（这里只用到了 $n\ge2$ 时 $E_{ij}$ 的存在性；$n=1$ 时一切矩阵本来就是数量矩阵。）

---

## 9.

<!-- homework-topic: 实对称矩阵 A²=0 推出 A=0 -->

证明：若 $A$ 是实对称矩阵且 $A^2=0$，则 $A=0$。

**补充解答**

用迹作「非负求和」是这类题的关键。设 $A=(a_{ij})$，$a_{ij}=a_{ji}\in\mathbb{R}$。则

$$
\operatorname{tr}(A^2)=\sum_{i=1}^{n}(A^2)_{ii}=\sum_{i=1}^{n}\sum_{k=1}^{n}a_{ik}a_{ki}
=\sum_{i=1}^{n}\sum_{k=1}^{n}a_{ik}^2\ \ge 0,
$$

最后一步用了对称性 $a_{ki}=a_{ik}$。每个 $a_{ik}^2\ge0$，故上式为零当且仅当所有 $a_{ik}=0$。

由 $A^2=0$ 知 $\operatorname{tr}(A^2)=0$，于是全部元素为零，即 $A=0$。

**为什么必须用「实对称」**：一般矩阵 $A^2=0$ 不能推出 $A=0$，例如 $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ 满足 $A^2=0$ 但 $A\ne0$。对称性把 $\operatorname{tr}(A^2)$ 变成平方和，这一步才是证明的实质。

---

## 11.

<!-- homework-topic: 方阵分解为对称与反对称矩阵之和 -->

证明：任一方阵都可以表示成一个对称矩阵与一个反对称矩阵之和。

**补充解答**

设 $A$ 为任意 $n$ 阶方阵，取

$$
S=\frac{A+A^{\mathrm T}}{2},\qquad K=\frac{A-A^{\mathrm T}}{2}.
$$

则

$$
S^{\mathrm T}=\frac{A^{\mathrm T}+A}{2}=S,\qquad K^{\mathrm T}=\frac{A^{\mathrm T}-A}{2}=-K,
$$

即 $S$ 对称、$K$ 反对称，且

$$
S+K=\frac{A+A^{\mathrm T}+A-A^{\mathrm T}}{2}=A .
$$

**唯一性**（顺带说明，题目不要求）：若 $A=S_1+K_1=S_2+K_2$，则 $S_1-S_2=K_2-K_1$，左边对称、右边反对称，既对称又反对称的矩阵只能为零，故分解唯一。

---

## 14.(1)

<!-- homework-topic: 行变换化阶梯形并求秩 -->

将下列矩阵化为阶梯形矩阵：

$$
\begin{pmatrix}
1&3&5&-1\\
2&-1&-3&4\\
5&1&-1&7\\
7&7&9&1
\end{pmatrix}.
$$

**补充解答**

用初等行变换，自上而下消元。

$r_2-2r_1=(0,-7,-13,6)$，$r_3-5r_1=(0,-14,-26,12)$，$r_4-7r_1=(0,-14,-26,8)$，得

$$
\begin{pmatrix}
1&3&5&-1\\
0&-7&-13&6\\
0&-14&-26&12\\
0&-14&-26&8
\end{pmatrix}.
$$

再 $r_3-2r_2=(0,0,0,0)$，$r_4-2r_2=(0,0,0,-4)$：

$$
\begin{pmatrix}
1&3&5&-1\\
0&-7&-13&6\\
0&0&0&0\\
0&0&0&-4
\end{pmatrix}.
$$

交换第 3、4 行并把第 4 行乘 $-\tfrac14$，得阶梯形

$$
\begin{pmatrix}
1&3&5&-1\\
0&-7&-13&6\\
0&0&0&1\\
0&0&0&0
\end{pmatrix},
$$

非零行数为 3，故 $r\begin{pmatrix}A\end{pmatrix}=3$。

（若继续化为行最简形：第 2 行乘 $-\tfrac17$ 后用第 4 行消去其第 4 列元素，再用第 1 行消去第 3 列，得
$\begin{pmatrix}1&0&-\frac47&0\\0&1&\frac{13}{7}&0\\0&0&0&1\\0&0&0&0\end{pmatrix}$，与行最简形定义一致。）

**验算**：消元中出现的全零行 $r_3-2r_2=0$ 等价于

$$
r_3=r_1+2r_2=(1,3,5,-1)+2(2,-1,-3,4)=(5,1,-1,7),
$$

与原矩阵第 3 行完全吻合，说明化阶梯形的过程没有算错；又第 4 行经消元后出现非零元 $-4$，故四个行向量中恰有 3 个线性无关，$r(A)=3$。

---

## 20.

<!-- homework-topic: 分块对角矩阵的平方 -->

设 $A=\begin{pmatrix}B&0\\0&C\end{pmatrix}$，其中

$$
B=\begin{pmatrix}1&2&-1\\3&4&-2\\5&-3&1\end{pmatrix},\qquad
C=\begin{pmatrix}3&2&0\\1&4&0\\0&0&3\end{pmatrix},
$$

求 $A^2$。

**补充解答**

分块对角矩阵相乘，只需把对角块各自平方（非对角块的 $0$ 与任何块的乘积仍为 $0$，交叉项 $0\cdot C+B\cdot0=0$）：

$$
A^2=\begin{pmatrix}B^2&0\\0&C^2\end{pmatrix}.
$$

分别计算。

$$
B^2=\begin{pmatrix}
1&2&-1\\3&4&-2\\5&-3&1\end{pmatrix}
\begin{pmatrix}1&2&-1\\3&4&-2\\5&-3&1\end{pmatrix}
=\begin{pmatrix}2&13&-6\\5&28&-13\\1&-5&2\end{pmatrix},
$$

$$
C^2=\begin{pmatrix}3&2&0\\1&4&0\\0&0&3\end{pmatrix}^2
=\begin{pmatrix}11&14&0\\7&18&0\\0&0&9\end{pmatrix}.
$$

故

$$
A^2=\begin{pmatrix}
2&13&-6&0&0&0\\
5&28&-13&0&0&0\\
1&-5&2&0&0&0\\
0&0&0&11&14&0\\
0&0&0&7&18&0\\
0&0&0&0&0&9
\end{pmatrix}.
$$

**验算**：以 $B^2$ 的第一行为例，$(1,2,-1)$ 分别与 $B$ 的三列作内积：
$1+6-5=2$，$2+8+3=13$，$-1-4-1=-6$ ✓，与所填一致。

---

## 易错点

1. $A^n$ 的归纳证明里，必须把四个元素都用和角公式化开再合并，只写「显然等于旋转 $n\alpha$」不算证明。
2. 矩阵多项式 $f(A)$ 中的常数项要写成 $2E$ 而不是 $2$，矩阵与数不能相加。
3. $A^2=0\Rightarrow A=0$ 只在实对称（或更一般的「可对角化于实特征值」）情形成立，一般矩阵有反例，答题时要写出迹为正平方和这一步。
4. 求阶梯形时用到的行变换必须是「某行加上另一行的倍数」，不要把某行乘以 $0$ 或直接把两行相加后覆盖（乘非零数会改变行列式，但得到「阶梯形」通常允许；写「等价」时要清楚自己用的是哪一类变换）。
5. 分块矩阵乘法要求内维匹配，本题是分块对角，交叉块直接为零矩阵，不能把 $B\cdot0$ 与 $0\cdot C$ 混成非零。
