---
slug: "2-5-elementary-matrices"
title: "2.5 初等矩阵"
summary: "初等矩阵与初等变换的关系，用行变换求逆矩阵。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "2.5"
tags:
  - "线性代数"
---

初等变换是对矩阵"做动作"，初等矩阵则是把这些动作本身写成矩阵。这样一来，"对 $A$ 作一次行变换"就变成"用某个矩阵左乘 $A$"，变换的复合也就变成矩阵的乘法。由此得到本节最实用的结论：$A$ 可逆时，用行变换把 $(A,E)$ 化成 $(E,A^{-1})$，即可同时求出逆矩阵。

## 一、初等矩阵的定义

**定义 5.1** 由单位矩阵 $E$ 经过**一次**初等变换得到的矩阵，称为**初等矩阵**。三种初等变换对应三类初等矩阵。

### （1）交换型 $P(i,j)$

把 $E$ 的第 $i,j$ 行（或列）对调，得到

$$
P(i,j)=\begin{pmatrix}
1 & & & & & & \\
& \ddots & & & & & \\
& & 0 & & 1 & & \\
& & & 1 & & & \\
& & \vdots & & \ddots & & \\
& & 1 & & 0 & & \\
& & & & & \ddots & \\
& & & & & & 1
\end{pmatrix},
$$

其中第 $i$ 行第 $j$ 列、第 $j$ 行第 $i$ 列的元素为 $1$，第 $i,j$ 个对角元为 $0$，其余与 $E$ 相同。

性质：$\lvert P(i,j)\rvert=-1$，可逆，且

$$
P(i,j)^{-1}=P(i,j).
$$

交换两次就回到原状，所以逆就是自己。

### （2）倍乘型 $P(i(k))$

以非零数 $k$ 乘 $E$ 的第 $i$ 行（或列），得到对角线上第 $i$ 个元素为 $k$、其余与 $E$ 相同的矩阵：

$$
P(i(k))=\operatorname{diag}(1,\dots,1,\underset{\substack{\uparrow\\ i}}{k},1,\dots,1).
$$

性质：$\lvert P(i(k))\rvert=k$，可逆，且

$$
P(i(k))^{-1}=P(i(k^{-1})).
$$

### （3）倍加型 $P(i,j(k))$

以 $k$ 乘 $E$ 的第 $j$ 行加到第 $i$ 行上（等价于以 $k$ 乘 $E$ 的第 $i$ 列加到第 $j$ 列上），得到在第 $(i,j)$ 位置为 $k$、其余与 $E$ 相同的矩阵：

$$
P(i,j(k))=\begin{pmatrix}
1 & & & & & \\
& \ddots & & & & \\
& & 1 & \cdots & k & \\
& & & \ddots & \vdots & \\
& & & & 1 & \\
& & & & & \ddots & \\
& & & & & & 1
\end{pmatrix}.
$$

当 $i<j$ 时它是上三角矩阵，当 $i>j$ 时它是下三角矩阵。

性质：$\lvert P(i,j(k))\rvert=1$，可逆，且

$$
P(i,j(k))^{-1}=P(i,j(-k)).
$$

**结论**：初等矩阵都可逆，且逆矩阵仍是**同类型**的初等矩阵。这一点是后面"用行变换求逆"的依据：每一步变换都能原路退回。

## 二、初等变换与初等矩阵的关系

先看三阶的具体例子。取

$$
P(1,2)=\begin{pmatrix}0 & 1 & 0\\1 & 0 & 0\\0 & 0 & 1\end{pmatrix},\quad
P(3(2))=\begin{pmatrix}1 & 0 & 0\\0 & 1 & 0\\0 & 0 & 2\end{pmatrix},\quad
P(3,1(4))=\begin{pmatrix}1 & 0 & 0\\0 & 1 & 0\\4 & 0 & 1\end{pmatrix},
$$

并令

$$
A=\begin{pmatrix}a & b & c\\d & e & f\\g & h & i\end{pmatrix}.
$$

**交换型**：

$$
P(1,2)A=\begin{pmatrix}d & e & f\\a & b & c\\g & h & i\end{pmatrix},
\qquad
AP(1,2)=\begin{pmatrix}b & a & c\\e & d & f\\h & g & i\end{pmatrix}.
$$

左乘交换了 $A$ 的第 1、2 **行**，右乘交换了第 1、2 **列**。

**倍乘型**：

$$
P(3(2))A=\begin{pmatrix}a & b & c\\d & e & f\\2g & 2h & 2i\end{pmatrix},
\qquad
AP(3(2))=\begin{pmatrix}a & b & 2c\\d & e & 2f\\g & h & 2i\end{pmatrix}.
$$

左乘把第 3 行乘 $2$，右乘把第 3 列乘 $2$。

**倍加型**：

$$
P(3,1(4))A=\begin{pmatrix}a & b & c\\d & e & f\\g+4a & h+4b & i+4c\end{pmatrix},
$$

即把第 1 行的 $4$ 倍加到第 3 行；而

$$
AP(3,1(4))=\begin{pmatrix}a+4c & b & c\\d+4f & e & f\\g+4i & h & i\end{pmatrix},
$$

即把第 3 列的 $4$ 倍加到第 1 列。

规律可以概括为一句话：

> **左乘改行，右乘改列；用哪个初等矩阵，就作对应的那次初等变换。**

**定理 5.1** 用 $m$ 阶初等矩阵左乘 $m\times n$ 矩阵 $A$，相当于对 $A$ 作一次相应的初等**行**变换；用 $n$ 阶初等矩阵右乘 $A$，相当于对 $A$ 作一次相应的初等**列**变换。

**例** 用 $P(4,2(k))$ 左乘 $4\times 4$ 矩阵 $A$：

$$
\begin{pmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\
0 & k & 0 & 1
\end{pmatrix}
\begin{pmatrix}
a_{11} & a_{12} & a_{13} & a_{14}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{31} & a_{32} & a_{33} & a_{34}\\
a_{41} & a_{42} & a_{43} & a_{44}
\end{pmatrix}
=\begin{pmatrix}
a_{11} & a_{12} & a_{13} & a_{14}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{31} & a_{32} & a_{33} & a_{34}\\
a_{41}+ka_{21} & a_{42}+ka_{22} & a_{43}+ka_{23} & a_{44}+ka_{24}
\end{pmatrix},
$$

即把第 2 行的 $k$ 倍加到第 4 行。若改为右乘，

$$
A\,P(4,2(k))=\begin{pmatrix}
a_{11} & a_{12}+ka_{14} & a_{13} & a_{14}\\
a_{21} & a_{22}+ka_{24} & a_{23} & a_{24}\\
a_{31} & a_{32}+ka_{34} & a_{33} & a_{34}\\
a_{41} & a_{42}+ka_{44} & a_{43} & a_{44}
\end{pmatrix},
$$

即把第 4 列的 $k$ 倍加到第 2 列。

**定理 5.2** 设 $A$ 为 $m\times n$ 矩阵，$r(A)=r$，则存在 $m$ 阶初等矩阵 $P_1,P_2,\dots,P_s$ 和 $n$ 阶初等矩阵 $Q_1,Q_2,\dots,Q_t$，使

$$
P_s\cdots P_2P_1\,A\,Q_1Q_2\cdots Q_t=\begin{pmatrix}E_r & 0\\ 0 & 0\end{pmatrix}.
$$

这是定理 3.2（任何矩阵可化为标准形）与定理 5.1（初等变换即乘初等矩阵）的直接合并：把化标准形的每一步都翻译成一个初等矩阵，左乘的收集成 $P_i$，右乘的收集成 $Q_j$。

**推论 5.1** 若 $A$ 为 $n$ 阶可逆矩阵，则存在 $n$ 阶初等矩阵 $P_1,P_2,\dots,P_s$，使

$$
P_s\cdots P_2P_1A=E,
$$

从而

$$
A^{-1}=P_s\cdots P_2P_1.
$$

**证明**：$A$ 可逆故 $r(A)=n$，其标准形为 $E$。由定理 5.2，存在初等矩阵使

$$
P_s\cdots P_1\,A\,Q_1\cdots Q_t=E.
$$

两边右乘 $Q_t^{-1}\cdots Q_1^{-1}$，得

$$
P_s\cdots P_1A=Q_t^{-1}\cdots Q_1^{-1}.
$$

再两边左乘 $Q_1\cdots Q_t$，得

$$
Q_1\cdots Q_tP_s\cdots P_1A=E.
$$

于是 $A^{-1}=Q_1\cdots Q_tP_s\cdots P_1$，它是初等矩阵的乘积。

这个推论说明：**可逆矩阵可以分解为若干初等矩阵的乘积**。而 $P_s\cdots P_1A=E$ 同时说明 $A^{-1}=P_s\cdots P_1E$，即"对 $A$ 作的那些行变换，作用在 $E$ 上就得到 $A^{-1}$"，这正是下面求逆方法的原理。

**推论 5.2** 若 $A$ 为 $n$ 阶可逆矩阵，则存在 $n$ 阶初等矩阵 $Q_1,Q_2,\dots,Q_m$，使 $AQ_1Q_2\cdots Q_m=E$，从而 $A^{-1}=Q_1Q_2\cdots Q_m$。

**推论 5.3** 对任意矩阵 $A$，有 $r(A^{T})=r(A)$。

理由是：$A$ 的标准形为 $\begin{pmatrix}E_r&0\\0&0\end{pmatrix}$，它的转置就是自己；转置把"左乘初等矩阵"换成"右乘相应的转置"，而初等矩阵的转置仍是初等矩阵，故 $A^{T}$ 也等价于同一标准形，秩相同。由此，矩阵"行秩等于列秩"。

## 三、用初等变换求逆矩阵（重点掌握）

由推论 5.1，若 $A$ 可逆，存在初等矩阵使 $P_s\cdots P_1A=E$，则 $A^{-1}=P_s\cdots P_1$。把这两个等式并排写：

$$
P_s\cdots P_1(A,E)=(E,A^{-1}).
$$

于是得到**行变换法**：

$$
(A,E)\xrightarrow{\text{初等行变换}}(E,A^{-1}).
$$

若把 $A$ 放在上方、$E$ 放在下方，则用**列变换**：

$$
\begin{pmatrix}A\\E\end{pmatrix}\xrightarrow{\text{初等列变换}}\begin{pmatrix}E\\A^{-1}\end{pmatrix}.
$$

两种做法原理相同，实际计算几乎都用行变换。若在化 $A$ 为 $E$ 的过程中出现零行，说明 $\lvert A\rvert=0$，$A$ 不可逆，应停止。

**例** 设

$$
A=\begin{pmatrix}0 & 1 & 2\\1 & 0 & 3\\4 & -3 & 8\end{pmatrix},
$$

求 $A^{-1}$。

解：构造 $(A,E)$ 并作行变换：

$$
(A,E)=\left(\begin{array}{ccc|ccc}
0 & 1 & 2 & 1 & 0 & 0\\
1 & 0 & 3 & 0 & 1 & 0\\
4 & -3 & 8 & 0 & 0 & 1
\end{array}\right)
\xrightarrow{r_1\leftrightarrow r_2}
\left(\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0\\
0 & 1 & 2 & 1 & 0 & 0\\
4 & -3 & 8 & 0 & 0 & 1
\end{array}\right).
$$

用第 1 行消去第 3 行的首元（$r_3-4r_1$），再用第 2 行消去第 3 行的第 2 列元素（$r_3+3r_2$）：

$$
\xrightarrow[r_3+3r_2]{r_3-4r_1}
\left(\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0\\
0 & 1 & 2 & 1 & 0 & 0\\
0 & 0 & 2 & 3 & -4 & 1
\end{array}\right)
\xrightarrow{\frac12 r_3}
\left(\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0\\
0 & 1 & 2 & 1 & 0 & 0\\
0 & 0 & 1 & \frac32 & -2 & \frac12
\end{array}\right).
$$

最后用第 3 行向上消元（$r_1-3r_3$，$r_2-2r_3$）：

$$
\xrightarrow[r_2-2r_3]{r_1-3r_3}
\left(\begin{array}{ccc|ccc}
1 & 0 & 0 & -\frac92 & 7 & -\frac32\\
0 & 1 & 0 & -2 & 4 & -1\\
0 & 0 & 1 & \frac32 & -2 & \frac12
\end{array}\right).
$$

故

$$
A^{-1}=\begin{pmatrix}
-\frac92 & 7 & -\frac32\\
-2 & 4 & -1\\
\frac32 & -2 & \frac12
\end{pmatrix}.
$$

**验证**：

$$
AA^{-1}=\begin{pmatrix}0 & 1 & 2\\1 & 0 & 3\\4 & -3 & 8\end{pmatrix}
\begin{pmatrix}-\frac92 & 7 & -\frac32\\-2 & 4 & -1\\\frac32 & -2 & \frac12\end{pmatrix}
=\begin{pmatrix}1 & 0 & 0\\0 & 1 & 0\\0 & 0 & 1\end{pmatrix}.
$$

**为什么中间步骤要这样安排**：先换行使首元为 $1$，可以避免分数提前出现；化到上三角后从下往上回代，每一步只改一列，计算量最小。这与解线性方程组的高斯消元完全一致，只是右半边多带了一块单位矩阵。

**练习** 设

$$
A=\begin{pmatrix}
1 & 2 & 3 & 4\\
2 & 3 & 1 & 2\\
1 & 1 & 1 & -1\\
1 & 0 & -2 & -6
\end{pmatrix},
$$

求 $A^{-1}$。

答案：

$$
A^{-1}=\begin{pmatrix}
22 & -6 & -26 & 17\\
-17 & 5 & 20 & -13\\
-1 & 0 & 2 & -1\\
4 & -1 & -5 & 3
\end{pmatrix}.
$$

四阶矩阵用伴随矩阵法要算 $16$ 个三阶行列式，用行变换则只需约 $20$ 次初等运算，阶数越高差距越大，这也是实际计算一律采用行变换的原因。

## 四、应用：解矩阵方程 $AX=B$

若 $A$ 可逆，则 $AX=B$ 的解为

$$
X=A^{-1}B.
$$

由 $A^{-1}=P_s\cdots P_1$ 得

$$
P_s\cdots P_1(A,B)=(E,A^{-1}B),
$$

所以不必先求 $A^{-1}$ 再相乘，直接对增广分块矩阵 $(A,B)$ 作行变换即可：

$$
(A,B)\xrightarrow{\text{初等行变换}}(E,A^{-1}B).
$$

**例** 设

$$
A=\begin{pmatrix}1 & 2 & -1\\3 & 4 & -2\\5 & -3 & 1\end{pmatrix},
\qquad
B=\begin{pmatrix}3 & 4 & -2\\5 & -3 & 1\\1 & 2 & -1\end{pmatrix},
$$

若 $AX=B$，求 $X$。

解：注意 $B$ 的三行恰好是 $A$ 的三行循环移位（第 1 行移到最后），故 $B$ 由 $A$ 左乘一个置换矩阵得到。按上面的方法对 $(A,B)$ 作行变换，把左块化为 $E$，右块即 $X$：

$$
(A,B)=\left(\begin{array}{ccc|ccc}
1 & 2 & -1 & 3 & 4 & -2\\
3 & 4 & -2 & 5 & -3 & 1\\
5 & -3 & 1 & 1 & 2 & -1
\end{array}\right)
\longrightarrow
\left(\begin{array}{ccc|ccc}
1 & 0 & 0 & -1 & -11 & 5\\
0 & 1 & 0 & -10 & -72 & 33\\
0 & 0 & 1 & -24 & -159 & 73
\end{array}\right),
$$

故

$$
X=\begin{pmatrix}
-1 & -11 & 5\\
-10 & -72 & 33\\
-24 & -159 & 73
\end{pmatrix}.
$$

这与直接算 $A^{-1}B$ 的结果一致，但少算了一次矩阵乘法。

## 课堂小结

- **三类初等矩阵**：$P(i,j)$、$P(i(k))$、$P(i,j(k))$，都由 $E$ 作一次初等变换得到；行列式分别为 $-1,k,1$，都可逆，逆仍为同类型。
- **核心对应**：左乘初等矩阵 $=$ 作相应行变换，右乘 $=$ 作相应列变换；阶数要匹配（左乘用 $m$ 阶，右乘用 $n$ 阶）。
- **定理 5.2**：任意矩阵可用"左乘一串 $P$、右乘一串 $Q$"化为标准形 $\begin{pmatrix}E_r&0\\0&0\end{pmatrix}$。
- **推论**：可逆矩阵是初等矩阵的乘积；$r(A^{T})=r(A)$。
- **求逆**：$(A,E)\to(E,A^{-1})$（行变换）；解 $AX=B$ 用 $(A,B)\to(E,X)$，比先求逆再乘更省。
- **易错点**：左、右乘混淆；倍加型 $P(i,j(k))$ 中 $k$ 的位置（第 $i$ 行第 $j$ 列）；求逆过程中若左块出现零行，应立即判定不可逆，不要继续硬算。

## 资料

- 课件原件：[2.5 初等矩阵 (1).pptx](<https://docs.google.com/presentation/d/1KRd3NA2RBoey_ZC2nCKqScPtql8hJ58X/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true>)
