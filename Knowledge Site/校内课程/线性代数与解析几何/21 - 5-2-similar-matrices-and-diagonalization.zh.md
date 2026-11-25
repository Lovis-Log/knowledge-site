---
slug: "5-2-similar-matrices-and-diagonalization"
title: "5.2 相似矩阵及矩阵可对角化的条件"
summary: "相似矩阵的性质、相似与合同的区别，以及用重数判定矩阵可对角化。"
updatedAt: "2026-11-25"
content_type: "reference"
group: "course"
displayNumber: "5.2"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "5.2 相似矩阵及矩阵可对角化的条件 (1).pptx"
    url: "https://docs.google.com/presentation/d/1j4RYaY13jyQGgYXf2HIYvnQH5xPK1OWi/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

相似矩阵表示同一个线性变换在不同基下的矩阵。$n$ 阶方阵能否对角化，取决于在所选数域上能否找到 $n$ 个线性无关的特征向量。当特征多项式在该数域上完全分解时，只需比较每个特征值的几何重数和代数重数。对角化可把矩阵的高次幂、矩阵多项式化为对角元的运算。

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

### 相似与等价、合同的区别

这三种关系最容易混淆，区别如下：

| $A$ 与 $B$ 相似 | $A$ 与 $B$ 等价 | $A$ 与 $B$ 合同 |
|---|---|---|
| $A,B$ 为同阶方阵 | $A,B$ 为同型矩阵（$m\times n$） | $A,B$ 为同阶方阵 |
| 记作 $A\sim B$ | 记作 $A\to B$（经初等变换） | 记作 $A\simeq B$ |
| 存在可逆矩阵 $P$，使 $P^{-1}AP=B$ | 存在可逆矩阵 $P_{m\times m},Q_{n\times n}$，使 $PAQ=B$ | 存在可逆矩阵 $C$，使 $C^TAC=B$ |
| 左右乘互为逆矩阵 | 左右可分别乘不同的可逆矩阵 | 左右乘互为转置 |
| 保持特征值、迹、行列式 | 由秩判定 | 保持秩与对称性，实对称矩阵的正负惯性指数也保持 |

等价只要求秩相同；相似的要求更强，还保持特征值、行列式、迹等不变量；合同保持的是“二次型的类型”，一般不保持特征值。相似矩阵一定是等价矩阵，合同矩阵也一定是等价矩阵，但反过来都不成立。

> **理解关键**：区分相似与合同，只要看变换的形式。相似是 $P^{-1}AP$（$P$ 与 $P^{-1}$ 夹住 $A$），合同是 $C^TAC$（$C^T$ 与 $C$ 夹住 $A$）。只有当 $C$ 是正交矩阵时 $C^{-1}=C^T$，同一个变换才既相似又合同，这种情形称为**正交相似**。所以“实对称矩阵可用正交矩阵对角化”这句话同时给出了相似与合同两个结论，而一般矩阵的合同变换与相似变换是两回事。

两个具体的反例：

- $E$ 与 $2E$ 合同（取 $C=\sqrt2E$，$C^TEC=2E$），但不相似——相似保持迹，$\operatorname{tr}E=n\ne2n$。
- $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 与 $E$ 有相同的特征多项式 $(\lambda-1)^2$，但 $A$ 不能对角化，故与 $E$ 不相似。

> **易错点**：由“特征多项式相同”推不出“相似”。特征多项式、秩、行列式、迹相同都只是相似的必要条件。

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

**检验**：$A(2,1)^T=(4,2)^T=2(2,1)^T$，$A(-3,-3)^T=(-9,-9)^T=3(-3,-3)^T$，两列确为特征向量；又 $\operatorname{tr}A=5=2+3$，$\det A=6=2\cdot3$，与对角元相符。

## 相似矩阵的性质

**性质 2.1** 如果 $A,B$ 相似，即存在可逆矩阵 $P$ 使 $P^{-1}AP=B$，则

1. $r(A)=r(B)$；
2. $A$ 和 $B$ 有相同的特征多项式，从而特征值也相同；
3. $\det(A)=\det(B)$，$\operatorname{tr}(A)=\operatorname{tr}(B)$，即行列式和迹相等；
4. 如果 $f(x)$ 是一个多项式，那么 $f(B)=P^{-1}f(A)P$；
5. $A^T\sim B^T$，且 $A^*\sim B^*$。

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

所以 $A^T\sim B^T$。写成 $B^T=Q^{-1}A^TQ$ 时，$Q=(P^T)^{-1}$。

若 $A$ 可逆，则 $B$ 也可逆，且 $B^{-1}=P^{-1}A^{-1}P$。伴随矩阵满足 $A^*=|A|A^{-1}$，于是

$$
B^*=|B|B^{-1}=|A|P^{-1}A^{-1}P=P^{-1}(|A|A^{-1})P=P^{-1}A^*P,
$$

因此 $B^*=P^{-1}A^*P$。若 $A$ 奇异，对 $A+tE$、$B+tE$ 应用上述证明。除去使 $\det(A+tE)=0$ 的有限个 $t$，都有 $(B+tE)^*=P^{-1}(A+tE)^*P$。两边的每个元素都是 $t$ 的多项式，故等式对所有 $t$ 成立。令 $t=0$ 即得 $B^*=P^{-1}A^*P$。

若 $A\alpha=\lambda\alpha$，$B=P^{-1}AP$，则

$$
B(P^{-1}\alpha)=P^{-1}A\alpha=\lambda P^{-1}\alpha,
$$

即 $P^{-1}$ 把 $A$ 的 $\lambda$ 特征子空间映到 $B$ 的 $\lambda$ 特征子空间。逆向的映射是 $P$。

> **易错点**：$A^*=|A|A^{-1}$ 的写法要求 $A$ 可逆。证明任意相似矩阵的伴随矩阵也相似时，奇异情形可用上面的多项式恒等式处理。

## 矩阵可对角化的条件

**定义 2** 如果方阵 $A$ 与对角矩阵相似，则称 $A$ **可对角化**。

并不是所有方阵都可对角化。例如

$$
A=\begin{pmatrix}1&1\\0&1\end{pmatrix}
$$

只有一个特征值 $1$，$\operatorname{rank}(E-A)=1$，特征子空间是一维的，找不到两个线性无关的特征向量，因此不能对角化。

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

### 用重数写出的等价条件

结合上一节的代数重数与几何重数，定理 2.1 可以写成便于计算的形式：

**定理 2.2** 设 $n$ 阶方阵 $A$ 的特征多项式在所选数域上完全分解，互异特征值为 $\lambda_1,\dots,\lambda_s$，代数重数为 $m_1,\dots,m_s$。则 $A$ 在该数域上可对角化，当且仅当对每个 $i$ 都有

$$
\dim V_{\lambda_i}=n-\operatorname{rank}(\lambda_iE-A)=m_i,
$$

也当且仅当

$$
\sum_{i=1}^{s}\dim V_{\lambda_i}=n.
$$

**证明** 上一节已证 $\dim V_{\lambda_i}\le m_i$，且 $m_1+\cdots+m_s=n$。若每个几何重数都等于代数重数，则各特征子空间的基础解系合并后共 $n$ 个向量；由性质 1.4 它们线性无关，由定理 2.1，$A$ 可对角化。

反之，若 $A$ 可对角化，即 $P^{-1}AP=\Lambda$ 为对角矩阵，则

$$
\lambda_iE-A=P(\lambda_iE-\Lambda)P^{-1},
$$

两边秩相同。$\lambda_iE-\Lambda$ 是对角矩阵，恰有 $m_i$ 个对角元为零，故秩为 $n-m_i$，于是

$$
\dim V_{\lambda_i}=n-\operatorname{rank}(\lambda_iE-A)=n-(n-m_i)=m_i.
$$

又因 $\dim V_{\lambda_i}\le m_i$ 且总和不超过 $n$，“每个都等于”与“总和等于 $n$”等价。

> **理解关键**：先确认特征多项式在所选数域上完全分解。单根的几何重数必为 $1$，因此接下来只需对重根计算 $\lambda_iE-A$ 的秩。

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

**检验**：$A\beta_1=(-6,3,0)^T=3\beta_1$，$A\beta_2=(6,0,3)^T=3\beta_2$，$A\beta_3=(-6,-12,12)^T=-6\beta_3$，三列均满足 $A\beta_i=\lambda_i\beta_i$。又 $\operatorname{tr}A=0=3+3-6$，$\det A=-54=3\cdot3\cdot(-6)$，与谱一致。

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
=19-6\sqrt{19}i,
$$

而 $\lambda_2$ 乘第一分量：

$$
\sqrt{19}i(-6-\sqrt{19}i)=19-6\sqrt{19}i,
$$

两者相等。其余分量同理（第三行给出 $11\sqrt{19}i$，也恰为 $\lambda_2\cdot11$），说明 $\beta_2$ 确实是属于 $i\sqrt{19}$ 的特征向量。

> **易错点**：复特征向量可以相差任意非零复常数倍，取法不唯一；但同一特征值的特征向量必须真正解出方程，不能凭“实部虚部配对”直接猜。另注意 $\lambda_2,\lambda_3$ 互为共轭，$\beta_3=\overline{\beta_2}$ 正好对应。

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

1. 计算特征多项式（沿第二列展开最省）：

$$
\det(\lambda E-A)=
\begin{vmatrix}
\lambda+1&0&-2\\
-x&\lambda-1&-1\\
-1&0&\lambda
\end{vmatrix}
=(\lambda-1)\bigl[(\lambda+1)\lambda-2\bigr]
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

**检验**：$\det P=-3\ne0$；$A\eta_1=(0,1,0)^T=\eta_1$，$A\eta_2=(1,0,1)^T=\eta_2$，$A\eta_3=(4,2,-2)^T=-2\eta_3$。课件此题给出的答案同为 $\lambda_1=\lambda_2=1$、$\lambda_3=-2$、$x=-1$、$\eta_1=(0,1,0)^T$、$\eta_2=(1,0,1)^T$、$\eta_3=(-2,-1,1)^T$，与上面一致。

**思路**：题目说“有三个线性无关的特征向量”，等价于“可对角化”。二重特征值 $1$ 必须贡献两个线性无关的特征向量；由秩—零度定理，$\dim\ker(E-A)=2$ 等价于 $r(E-A)=1$，由此反求 $x$。这一步是本题的关键，比先求特征多项式再讨论更直接——注意 $x$ 出现在第二列，而 $(E-A)$ 只有三行成比例这一个可能，故 $x$ 被唯一确定。

## 课堂小结

- **相似**：$P^{-1}AP=B$ 表示同一个线性变换在不同基下的矩阵。相似保持秩、迹、行列式和特征多项式。$A$ 的特征向量通过 $P^{-1}$ 变成 $B$ 的特征向量。
- **对角化**：在所选数域上找到 $n$ 个线性无关的特征向量，将它们按列排成 $P$。每列与对角矩阵的同一位置对应。若特征多项式完全分解，只需比较重根的几何重数与代数重数。
- **易错点**：相同的特征多项式只是相似的必要条件。合同对应二次型的变量代换，正交相似时 $P^{-1}=P^T$，同一个变换也给出合同关系。
