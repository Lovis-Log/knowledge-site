---
slug: "5-2-similar-matrices-and-diagonalization"
title: "5.2 相似矩阵及矩阵可对角化的条件"
summary: "相似矩阵与矩阵可对角化的条件。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "5.2"
tags:
  - "线性代数"
---

上一节求出了特征值与特征向量。本节引入相似矩阵，把"同一个线性变换在不同基下的矩阵"联系起来；核心结论是：$n$ 阶方阵可对角化，当且仅当它有 $n$ 个线性无关的特征向量。对角化的实际价值在于把矩阵的高次幂、矩阵多项式等难算的问题化为对角矩阵的简单运算。

## 相似矩阵的定义

**定义 2.1** 设 $A,B$ 为 $n$ 阶方阵。若存在 $n$ 阶可逆矩阵 $P$，使

$$
P^{-1}AP=B,
$$

则称 $A$ 与 $B$ **相似**，记作 $A\sim B$。可逆矩阵 $P$ 称为将 $A$ 变为 $B$ 的**相似变换矩阵**。

矩阵之间的相似是一种**等价关系**，即满足：

1. **反身性**：$A\sim A$（取 $P=E$）；
2. **对称性**：$A\sim B\implies B\sim A$（由 $B=P^{-1}AP$ 得 $A=PBP^{-1}=(P^{-1})^{-1}BP^{-1}$）；
3. **传递性**：$A\sim B$，$B\sim C\implies A\sim C$（若 $B=P^{-1}AP$，$C=Q^{-1}BQ$，则 $C=(PQ)^{-1}A(PQ)$）。

### 相似与等价的区别

相似与矩阵的等价容易混淆，区别如下：

| $A$ 与 $B$ 相似 | $A$ 与 $B$ 等价 |
|---|---|
| $A,B$ 为同阶方阵 | $A,B$ 为同型矩阵（$m\times n$） |
| 记作 $A\sim B$ | 记作 $A\to B$（经初等变换） |
| 存在可逆矩阵 $P$，使 $P^{-1}AP=B$ | 存在可逆矩阵 $P_{m\times m},Q_{n\times n}$，使 $PAQ=B$ |
| 左乘 $P^{-1}$、右乘 $P$，两侧互为逆矩阵 | 左右可分别乘不同的可逆矩阵 |

等价只要求秩相同；相似的要求更强，还保持特征值、行列式、迹等不变量。相似矩阵一定是等价矩阵，反之不成立。

## 为什么引入相似矩阵

先看一个例子：已知

$$
A=\begin{pmatrix}1&2\\-1&4\end{pmatrix},
$$

求 $A^{100}$。

直接计算：

$$
A^2=\begin{pmatrix}-1&10\\-5&14\end{pmatrix},\qquad
A^3=\begin{pmatrix}-11&38\\-19&46\end{pmatrix},\qquad
A^4=\begin{pmatrix}-49&130\\-65&146\end{pmatrix},\ \dots
$$

计算量随指数迅速增大，显然不可取。

换一个思路：若能找到可逆矩阵 $P$，使 $P^{-1}AP$ 为对角矩阵 $B$，即 $P^{-1}AP=B$，则 $A=PBP^{-1}$，于是

$$
A^k=(PBP^{-1})(PBP^{-1})\cdots(PBP^{-1})
=PB^kP^{-1}.
$$

对角矩阵的 $k$ 次幂只需把对角元各自 $k$ 次方，计算立刻变简单。

对本例，取

$$
P=\begin{pmatrix}2&-3\\1&-3\end{pmatrix},
$$

可以验证

$$
P^{-1}AP=\begin{pmatrix}2&0\\0&3\end{pmatrix}.
$$

因此

$$
A^{100}=P\begin{pmatrix}2^{100}&0\\0&3^{100}\end{pmatrix}P^{-1}.
$$

这里 $P$ 的两列正是 $A$ 的特征向量，对角元 $2,3$ 正是对应的特征值。这不是巧合，而是下一节定理的内容。

## 相似矩阵的性质

**性质 2.1** 如果 $A,B$ 相似，即存在可逆矩阵 $P$ 使 $P^{-1}AP=B$，则

1. $r(A)=r(B)$；
2. $A$ 和 $B$ 有相同的特征多项式，从而特征值也相同；
3. $\det(A)=\det(B)$，$\operatorname{tr}(A)=\operatorname{tr}(B)$，即行列式和迹相等；
4. 如果 $f(x)$ 是一个多项式，那么 $f(B)=P^{-1}f(A)P$；
5. $A^T\sim B^T$；且若 $A$ 可逆，则 $A^*\sim B^*$。

**证明**

(1) 可逆矩阵乘矩阵不改变秩，所以

$$
r(B)=r(P^{-1}AP)=r(A).
$$

(2) 特征多项式：

$$
\begin{aligned}
|\lambda E-B|
&=|\lambda E-P^{-1}AP|\\
&=|P^{-1}(\lambda E)P-P^{-1}AP|\\
&=|P^{-1}(\lambda E-A)P|\\
&=|P^{-1}|\,|\lambda E-A|\,|P|
=|\lambda E-A|.
\end{aligned}
$$

其中用到 $\lambda E=P^{-1}(\lambda E)P$，以及 $|P^{-1}||P|=1$。特征多项式相同，特征值自然相同。

(3) 在特征多项式中令 $\lambda=0$，得 $\det(-B)=\det(-A)$，即 $\det(A)=\det(B)$；比较 $\lambda^{n-1}$ 的系数，得 $\operatorname{tr}(A)=\operatorname{tr}(B)$。也可由 (2) 直接得到。

(4) 设 $f(x)=a_0+a_1x+\cdots+a_mx^m$。由 $B=P^{-1}AP$ 得 $B^k=P^{-1}A^kP$（$k$ 为正整数），且 $E=P^{-1}EP$，于是

$$
\begin{aligned}
f(B)
&=a_0E+a_1B+\cdots+a_mB^m\\
&=a_0P^{-1}EP+a_1P^{-1}AP+\cdots+a_mP^{-1}A^mP\\
&=P^{-1}(a_0E+a_1A+\cdots+a_mA^m)P\\
&=P^{-1}f(A)P.
\end{aligned}
$$

(5) 转置：

$$
B^T=(P^{-1}AP)^T=P^TA^T(P^{-1})^T=P^TA^T(P^T)^{-1},
$$

所以 $A^T\sim B^T$（相似变换矩阵为 $P^T$）。

若 $A$ 可逆，则 $B$ 也可逆，且 $B^{-1}=P^{-1}A^{-1}P$。伴随矩阵满足 $A^*=|A|A^{-1}$，于是

$$
B^*=|B|B^{-1}=|A|P^{-1}A^{-1}P=P^{-1}(|A|A^{-1})P=P^{-1}A^*P,
$$

所以 $A^*\sim B^*$。

**注意**：相似矩阵有相同的特征值，但特征向量不同。若 $A\alpha=\lambda\alpha$，$B=P^{-1}AP$，则

$$
B(P^{-1}\alpha)=P^{-1}A\alpha=\lambda P^{-1}\alpha,
$$

即 $B$ 的属于 $\lambda$ 的特征向量是 $P^{-1}\alpha$，不是 $\alpha$ 本身。

## 矩阵可对角化的条件

**定义 2** 如果方阵 $A$ 与对角矩阵相似，则称 $A$ **可对角化**。

并不是所有方阵都可对角化。例如

$$
A=\begin{pmatrix}1&1\\0&1\end{pmatrix}
$$

只有一个特征值 $1$，解 $(E-A)X=0$ 只能得到一维特征子空间，找不到两个线性无关的特征向量，因此不能对角化。

### 定理 2.1

**定理 2.1** $n$ 阶方阵 $A$ 与对角矩阵 $\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ 相似（即 $A$ 可对角化），当且仅当 $A$ 有 $n$ 个线性无关的特征向量。

**证明**

($\Rightarrow$) 设 $A\sim\operatorname{diag}(\lambda_1,\dots,\lambda_n)$，即存在可逆矩阵 $P$ 使

$$
P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n),
$$

等价于

$$
AP=P\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

设 $P=(\beta_1,\dots,\beta_n)$，其中 $\beta_1,\dots,\beta_n$ 为 $P$ 的 $n$ 个列向量。则

$$
A(\beta_1,\dots,\beta_n)=(\beta_1,\dots,\beta_n)\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

比较两边的列，得

$$
A\beta_i=\lambda_i\beta_i\qquad(i=1,\dots,n).
$$

因为 $P$ 可逆，其列向量 $\beta_1,\dots,\beta_n$ 线性无关且都非零，所以它们恰好是 $A$ 的 $n$ 个线性无关的特征向量，对应特征值 $\lambda_1,\dots,\lambda_n$。

($\Leftarrow$) 设 $A$ 有线性无关的特征向量 $\beta_1,\dots,\beta_n$，相应特征值为 $\lambda_1,\dots,\lambda_n$，即

$$
A\beta_i=\lambda_i\beta_i\qquad(i=1,\dots,n).
$$

构造

$$
P=(\beta_1,\dots,\beta_n).
$$

由于 $\beta_1,\dots,\beta_n$ 线性无关，$P$ 可逆。计算

$$
\begin{aligned}
P\operatorname{diag}(\lambda_1,\dots,\lambda_n)
&=(\beta_1,\dots,\beta_n)\operatorname{diag}(\lambda_1,\dots,\lambda_n)\\
&=(\lambda_1\beta_1,\dots,\lambda_n\beta_n)\\
&=(A\beta_1,\dots,A\beta_n)\\
&=AP.
\end{aligned}
$$

两边左乘 $P^{-1}$，得

$$
P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

证明过程同时给出了对角化的算法：把 $n$ 个线性无关的特征向量按列排成 $P$，则 $P^{-1}AP$ 就是以对应特征值为对角元的对角矩阵。

**关键点**：$P$ 的列向量必须是特征向量，且列的次序要与对角矩阵中特征值的次序一一对应；交换 $P$ 的两列，对角矩阵的对角元也要相应交换。

### 推论

**推论 1** 如果 $n$ 阶矩阵 $A$ 有 $n$ 个不同的特征值，则 $A$ 可对角化。

**证明** 由性质 1.3，不同特征值对应的特征向量线性无关。$n$ 个不同特征值各取一个特征向量，得到 $n$ 个线性无关的特征向量，由定理 2.1，$A$ 可对角化。

**推论 2** 如果 $n$ 阶复矩阵 $A$ 的特征多项式无重根，则 $A$ 可对角化。

**证明** 复数范围内每个 $n$ 次多项式都有 $n$ 个根；无重根意味着有 $n$ 个互异特征值，由推论 1 即得。

**推论 3** 若 $n$ 阶方阵 $A$ 有 $m$ 个互不相等的特征值，与它们对应的线性无关特征向量的最大个数依次为 $k_1,k_2,\dots,k_m$，且

$$
k_1+k_2+\cdots+k_m=n,
$$

则 $A$ 可以对角化。

推论 3 是定理 2.1 的直接翻译：把每个特征值对应的极大线性无关特征向量组合并，由性质 1.4 知整体线性无关；总数为 $n$ 时，就得到 $n$ 个线性无关的特征向量。

### 判定 $n$ 阶方阵 $A$ 是否可对角化的步骤

1. 求出 $A$ 的全部特征值，设所有互异特征值为 $\lambda_1,\lambda_2,\dots,\lambda_s$。
2. 根据 $s$ 与 $n$ 的关系分两种情况：
   - 若 $s=n$（$A$ 有 $n$ 个互异特征值），则 $A$ 可对角化；
   - 若 $s<n$，对每个特征值 $\lambda_i$，求 $(\lambda_iE-A)X=0$ 的基础解系。设基础解系有 $r_i$ 个向量，则这 $r_i$ 个向量是 $A$ 的属于 $\lambda_i$ 的线性无关特征向量。若
     $$
     r_1+r_2+\cdots+r_s=n,
     $$
     则 $A$ 可对角化；否则不可对角化。
3. 当 $A$ 可对角化时，$A$ 有 $n$ 个线性无关的特征向量，记为列向量 $\beta_1,\dots,\beta_n$。令
   $$
   P=(\beta_1,\dots,\beta_n),
   $$
   则 $P^{-1}AP=\Lambda$，其中 $\Lambda$ 是对角矩阵，对角线上的第 $i$ 个元素是与 $\beta_i$ 对应的特征值。

注意第 2 步中 $r_i$ 是特征值 $\lambda_i$ 的**几何重数**（特征子空间的维数）。重特征值必须提供足够多的线性无关特征向量，缺少一个就不能对角化。

### 例：三阶实矩阵的对角化

设

$$
A=\begin{pmatrix}
2&-2&2\\
-2&-1&4\\
2&4&-1
\end{pmatrix},
$$

判断 $A$ 是否可对角化；若可对角化，求出相似变换矩阵和相似的对角矩阵。

**解**

(1) 求特征值。计算得

$$
\lambda_1=\lambda_2=3,\qquad \lambda_3=-6.
$$

(2) 求每个特征值的线性无关特征向量。

解 $(3E-A)X=0$，得 $\lambda=3$ 的一个基础解系

$$
\beta_1=\begin{pmatrix}-2\\1\\0\end{pmatrix},\qquad
\beta_2=\begin{pmatrix}2\\0\\1\end{pmatrix}.
$$

解 $(-6E-A)X=0$，得 $\lambda=-6$ 的一个基础解系

$$
\beta_3=\begin{pmatrix}1\\2\\-2\end{pmatrix}.
$$

$\beta_1,\beta_2,\beta_3$ 线性无关，$A$ 有 $3$ 个线性无关的特征向量，所以 $A$ 可对角化。

(3) 写出相似变换矩阵和对角矩阵。取

$$
P=(\beta_1,\beta_2,\beta_3)=
\begin{pmatrix}
-2&2&1\\
1&0&2\\
0&1&-2
\end{pmatrix},
$$

则

$$
P^{-1}AP=
\begin{pmatrix}
3&0&0\\
0&3&0\\
0&0&-6
\end{pmatrix}.
$$

**检验**：$A\beta_1=(-6,3,0)^T=3\beta_1$，$A\beta_2=(6,0,3)^T=3\beta_2$，$A\beta_3=(-6,-12,12)^T=-6\beta_3$，三列均满足 $A\beta_i=\lambda_i\beta_i$。

### 例：复矩阵的对角化

已知矩阵

$$
A=\begin{pmatrix}
0&2&1\\
-4&0&3\\
-2&-3&0
\end{pmatrix},
$$

在复数范围内求可逆矩阵 $P$，使 $P^{-1}AP$ 为对角矩阵。

**解**

(1) 求特征值。特征方程为

$$
\det(\lambda E-A)=\lambda(\lambda^2+19)=0,
$$

所以

$$
\lambda_1=0,\qquad \lambda_2=i\sqrt{19},\qquad \lambda_3=-i\sqrt{19}.
$$

三个特征值互异，因此 $A$ 可对角化。

(2) 求每个特征值的线性无关特征向量。

解 $AX=0$，得 $\lambda=0$ 的一个基础解系

$$
\beta_1=(3,-2,4)^T.
$$

解 $(\sqrt{19}iE-A)X=0$，得

$$
\beta_2=(-6-\sqrt{19}i,\ 4-3\sqrt{19}i,\ 11)^T.
$$

解 $(-\sqrt{19}iE-A)X=0$，得

$$
\beta_3=(-6+\sqrt{19}i,\ 4+3\sqrt{19}i,\ 11)^T.
$$

基础解系不唯一，自由变量的取值原则是使计算尽量简单；这里得到的向量与教材上的可能相差一个常数倍，但只要是对应特征值的特征向量就正确。

(3) 写出相似变换矩阵和对角矩阵：

$$
P=(\beta_1,\beta_2,\beta_3)=
\begin{pmatrix}
3&-6-\sqrt{19}i&-6+\sqrt{19}i\\
-2&4-3\sqrt{19}i&4+3\sqrt{19}i\\
4&11&11
\end{pmatrix},
$$

$$
\Lambda=
\begin{pmatrix}
0&0&0\\
0&\sqrt{19}i&0\\
0&0&-\sqrt{19}i
\end{pmatrix}.
$$

**验证** $\beta_2$：用 $A$ 的第一行作用，

$$
0\cdot(-6-\sqrt{19}i)+2(4-3\sqrt{19}i)+(11)
=8-6\sqrt{19}i+11=19-6\sqrt{19}i.
$$

而 $\lambda_2$ 乘第一分量：

$$
\sqrt{19}i(-6-\sqrt{19}i)=-6\sqrt{19}i+19,
$$

两者相等。其余分量同理，说明 $\beta_2$ 确实是属于 $i\sqrt{19}$ 的特征向量。

### 例：由可对角化条件反求参数

设 $3$ 阶实矩阵

$$
A=\begin{pmatrix}
-1&0&2\\
x&1&1\\
1&0&0
\end{pmatrix}
$$

有三个线性无关的特征向量。

1. 求矩阵 $A$ 的特征值以及 $x$ 的值；
2. 求出矩阵 $A$ 的特征向量；
3. 求满秩矩阵 $P$，使得 $P^{-1}AP$ 为对角形。

**解**

1. 计算特征多项式：

$$
\det(\lambda E-A)=
\begin{vmatrix}
\lambda+1&0&-2\\
-x&\lambda-1&-1\\
-1&0&\lambda
\end{vmatrix}
=(\lambda-1)^2(\lambda+2).
$$

所以特征值为

$$
\lambda_1=\lambda_2=1,\qquad \lambda_3=-2.
$$

特征值 $1$ 是二重根。$A$ 有三个线性无关的特征向量，因此属于 $\lambda=1$ 的特征向量必须有两个线性无关的，即

$$
\dim\ker(E-A)=2\implies r(E-A)=3-2=1.
$$

而

$$
E-A=
\begin{pmatrix}
2&0&-2\\
-x&0&-1\\
-1&0&1
\end{pmatrix}.
$$

要使秩为 $1$，三行必须成比例。第一行 $(2,0,-2)$ 与第三行 $(-1,0,1)$ 已经成比例；第二行 $(-x,0,-1)$ 也必须是它们的倍数，故

$$
x=-1.
$$

2. 当 $\lambda=1$ 时，解 $(E-A)X=0$，即

$$
\begin{cases}
2x_1-2x_3=0,\\
x_1-x_3=0,\\
-x_1+x_3=0,
\end{cases}
$$

三个方程都等价于 $x_1=x_3$，$x_2$ 任意。取基础解系

$$
\eta_1=\begin{pmatrix}0\\1\\0\end{pmatrix},\qquad
\eta_2=\begin{pmatrix}1\\0\\1\end{pmatrix}.
$$

当 $\lambda=-2$ 时，解 $(-2E-A)X=0$：

$$
\begin{pmatrix}
-1&0&-2\\
1&-3&-1\\
-1&0&-2
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=0.
$$

由第一行 $x_1=-2x_3$，代入第二行得 $x_2=-x_3$。取 $x_3=1$，得

$$
\eta_3=\begin{pmatrix}-2\\-1\\1\end{pmatrix}.
$$

3. 取

$$
P=(\eta_1,\eta_2,\eta_3)=
\begin{pmatrix}
0&1&-2\\
1&0&-1\\
0&1&1
\end{pmatrix},
$$

则

$$
P^{-1}AP=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&-2
\end{pmatrix}.
$$

**思路**：题目说"有三个线性无关的特征向量"，等价于"可对角化"。二重特征值 $1$ 必须贡献两个线性无关的特征向量；由秩—零度定理，$\dim\ker(E-A)=2$ 等价于 $r(E-A)=1$，由此反求 $x$。这一步是本题的关键，比先求特征多项式再讨论更直接。

## 课堂小结

相似关系 $P^{-1}AP=B$ 是同一线性变换在不同基下的矩阵表示，满足反身、对称、传递。相似矩阵有相同的秩、特征多项式、特征值、行列式和迹，多项式与转置、伴随也保持相似；但特征向量要经过 $P^{-1}$ 变换。$n$ 阶方阵可对角化的充要条件是有 $n$ 个线性无关的特征向量；把特征向量按列排成 $P$，$P^{-1}AP$ 就是对角的，对角元次序与 $P$ 的列次序一致。有 $n$ 个互异特征值一定可对角化；有重根时，必须逐个检查各特征值能否提供足够多的线性无关特征向量（基础解系向量个数之和是否为 $n$）。易错点：$P$ 的列顺序不能与对角元顺序错配；相似不等于等价；复矩阵的特征值可能为复数，但只要互异仍可对角化。

## 资料

[课件原件：5.2 相似矩阵及矩阵可对角化的条件 (1).pptx](<https://docs.google.com/presentation/d/1j4RYaY13jyQGgYXf2HIYvnQH5xPK1OWi/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true>)
