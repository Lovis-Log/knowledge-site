---
slug: "5-3-diagonalization-of-real-symmetric-matrices"
title: "5.3 实对称矩阵的对角化"
summary: "实对称矩阵的特征值与正交对角化。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "5.3"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "5.3 实对称矩阵的对角化 (1).pptx"
    url: "https://docs.google.com/presentation/d/1bbDgDMjNysdcFCQpD5C4cFc9mwldQZM_/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

并非所有方阵都可对角化，但**实对称矩阵一定可以对角化**，而且可以用正交矩阵来完成对角化。这条结论是二次型化简为标准形的理论基础，也是解析几何中化二次曲面方程为标准形的工具。

本节先建立 $n$ 维向量的内积、长度、夹角、正交等概念，再介绍施密特正交化与正交矩阵，最后证明实对称矩阵可正交对角化并给出具体步骤。

## 向量的内积

**定义 3.1** 设

$$
\alpha=(a_1,a_2,\dots,a_n),\qquad \beta=(b_1,b_2,\dots,b_n)
$$

为 $\mathbb R^n$ 中的行向量，称实数

$$
(\alpha,\beta)=\alpha\beta^T=\sum_{i=1}^n a_ib_i
$$

为 $\alpha$ 与 $\beta$ 的**内积**。若 $\alpha=(a_1,\dots,a_n)^T$，$\beta=(b_1,\dots,b_n)^T$ 为列向量，则

$$
(\alpha,\beta)=\alpha^T\beta=\sum_{i=1}^n a_ib_i.
$$

**定义 3.2** 定义了内积的向量空间称为**内积空间**。$\mathbb R^n$ 按上述内积构成内积空间。

内积满足以下运算规律：

1. $(\alpha,\beta)=(\beta,\alpha)$；
2. $(\lambda\alpha,\beta)=(\alpha,\lambda\beta)=\lambda(\alpha,\beta)$，$\lambda\in\mathbb R$；
3. $(\alpha+\beta,\gamma)=(\alpha,\gamma)+(\beta,\gamma)$；
4. $(\alpha,\alpha)\ge0$，且 $(\alpha,\alpha)=0\iff\alpha=0$。

第 4 条中的"$\iff$"是关键：只有零向量的"长度"为零。

### 长度（范数）

**定义 3.3** 设 $\alpha=(a_1,a_2,\dots,a_n)\in\mathbb R^n$，定义 $\alpha$ 的**长度**为

$$
|\alpha|=\sqrt{(\alpha,\alpha)}=\sqrt{\alpha\alpha^T}
=\sqrt{a_1^2+a_2^2+\cdots+a_n^2}.
$$

长度也称为**模**或**范数**；长度为 $1$ 的向量称为**单位向量**。若 $\alpha\ne0$，则

$$
\frac{\alpha}{|\alpha|}
$$

是单位向量，称为 $\alpha$ 的**单位化向量**（规范化向量）。

**例** 在 $\mathbb R^3$ 中，$\alpha=(-3,1,2)$，$\beta=(4,3,-1)$，则

$$
(\alpha,\beta)=(-3)\times4+1\times3+2\times(-1)=-11,
$$

$$
|\alpha|=\sqrt{(-3)^2+1^2+2^2}=\sqrt{14}.
$$

内积为负说明两向量夹角为钝角；长度只与各分量平方和有关。

### 长度的性质与柯西不等式

**性质 3.1** 向量长度满足：

1. $|\alpha|\ge0$，$|\alpha|=0\iff\alpha=0$；
2. $|k\alpha|=|k|\,|\alpha|$，$k\in\mathbb R$；
3. **柯西（Cauchy）不等式**：
   $$
   |(\alpha,\beta)|\le|\alpha|\,|\beta|;
   $$
4. **三角不等式**：
   $$
   |\alpha+\beta|\le|\alpha|+|\beta|.
   $$

**证明柯西不等式** 若 $\beta=0$，两边都为零，结论成立。设 $\beta\ne0$，$t$ 为实数。考虑

$$
(\alpha+t\beta,\alpha+t\beta)
=(\alpha,\alpha)+2t(\alpha,\beta)+t^2(\beta,\beta).
$$

由内积的正定性，它对任意 $t$ 都非负，因此这是关于 $t$ 的二次多项式且判别式不大于零：

$$
\Delta=4(\alpha,\beta)^2-4(\alpha,\alpha)(\beta,\beta)\le0.
$$

化简得

$$
(\alpha,\beta)^2\le(\alpha,\alpha)(\beta,\beta)=|\alpha|^2|\beta|^2,
$$

开方即得 $|(\alpha,\beta)|\le|\alpha||\beta|$。

**证明思路**：把"对任意 $t$ 非负"翻译成"二次函数判别式非正"，是证明这类不等式最常用的手法。构造 $\alpha+t\beta$ 而不是别的向量，是因为展开后恰好出现 $(\alpha,\beta)$ 与 $(\beta,\beta)$，能把要证的内积不等式转化为二次方程无实根的条件。

三角不等式可由柯西不等式推出：

$$
|\alpha+\beta|^2=|\alpha|^2+2(\alpha,\beta)+|\beta|^2
\le|\alpha|^2+2|\alpha||\beta|+|\beta|^2
=(|\alpha|+|\beta|)^2.
$$

## 夹角与正交

**定义 3.4** 设 $\alpha,\beta\in\mathbb R^n$ 为非零向量，规定它们的**夹角**为

$$
\varphi=\arccos\frac{(\alpha,\beta)}{|\alpha|\,|\beta|}
\qquad(0\le\varphi\le\pi),
$$

记作 $\langle\alpha,\beta\rangle$。等价地，

$$
(\alpha,\beta)=|\alpha|\,|\beta|\cos\langle\alpha,\beta\rangle.
$$

若 $(\alpha,\beta)=0$，即 $\langle\alpha,\beta\rangle=\frac\pi2$，则称 $\alpha$ 与 $\beta$ **垂直**或**正交**。

例如：

1. 零向量与任意向量正交（内积为零）；
2. $\mathbb R^2$ 中 $\alpha=(1,1)$，$\beta=(1,-1)$ 正交，因为 $1\cdot1+1\cdot(-1)=0$。

**性质 3.2** $\alpha,\beta\in\mathbb R^n$，$\alpha$ 与 $\beta$ 正交 $\iff(\alpha,\beta)=0$。

### 正交向量组与正交基

**定义 3.5** $\mathbb R^n$ 中一组非零向量，若它们两两正交，则称为 $\mathbb R^n$ 的一组**正交向量组**。

例如基本单位向量

$$
\varepsilon_1=(1,0,\dots,0),\quad
\varepsilon_2=(0,1,\dots,0),\quad\dots,\quad
\varepsilon_n=(0,0,\dots,1)
$$

是 $\mathbb R^n$ 中的正交向量组。

**定理 3.1** 正交向量组线性无关。

**证明** 设 $\alpha_1,\alpha_2,\dots,\alpha_m$ 为正交向量组，且

$$
k_1\alpha_1+k_2\alpha_2+\cdots+k_m\alpha_m=0.
$$

上式两边与 $\alpha_i$ 作内积：

$$
(\alpha_i,k_1\alpha_1+\cdots+k_m\alpha_m)=(\alpha_i,0)=0.
$$

展开得

$$
(\alpha_i,k_1\alpha_1)+\cdots+(\alpha_i,k_i\alpha_i)+\cdots+(\alpha_i,k_m\alpha_m)=0.
$$

由于 $j\ne i$ 时 $(\alpha_i,\alpha_j)=0$，而

$$
(\alpha_i,k_i\alpha_i)=k_i(\alpha_i,\alpha_i),
$$

所以只剩

$$
k_i(\alpha_i,\alpha_i)=0.
$$

正交向量组中 $\alpha_i\ne0$，故 $(\alpha_i,\alpha_i)>0$，从而 $k_i=0$（$i=1,\dots,m$），即 $\alpha_1,\dots,\alpha_m$ 线性无关。

**推论** $n$ 维内积空间中，正交向量组所含向量个数不能超过 $n$ 个，因为 $n$ 维空间中任意 $n+1$ 个向量必线性相关。

**定义 3.6** 

1. $n$ 维向量空间中，任意含有 $n$ 个向量的正交向量组都可以作为该空间的一组基，称为**正交基**。
2. 若正交基中每个向量都是单位向量，则称为**标准正交基**（规范正交基、单位正交基）。

$\alpha_1,\dots,\alpha_n$ 为 $\mathbb R^n$ 的标准正交基，等价于

$$
(\alpha_i,\alpha_j)=
\begin{cases}
1, & i=j,\\
0, & i\ne j.
\end{cases}
$$

### 标准正交基下的坐标

**例 3.1** 设 $\alpha_1,\dots,\alpha_n$ 为 $\mathbb R^n$ 的任一组标准正交基，$\alpha\in\mathbb R^n$，且

$$
\alpha=k_1\alpha_1+k_2\alpha_2+\cdots+k_n\alpha_n.
$$

证明

$$
k_i=(\alpha_i,\alpha),\qquad i=1,2,\dots,n.
$$

**证明** 用 $\alpha_i$ 与 $\alpha$ 作内积。由于 $i\ne j$ 时 $(\alpha_i,\alpha_j)=0$，且 $(\alpha_i,\alpha_i)=1$，得

$$
\begin{aligned}
(\alpha_i,\alpha)
&=(\alpha_i,k_1\alpha_1+k_2\alpha_2+\cdots+k_n\alpha_n)\\
&=(\alpha_i,k_i\alpha_i)=k_i(\alpha_i,\alpha_i)=k_i.
\end{aligned}
$$

因此，在标准正交基下，向量的坐标可以直接用内积算出：

$$
\alpha=(\alpha_1,\alpha)\alpha_1+(\alpha_2,\alpha)\alpha_2+\cdots+(\alpha_n,\alpha)\alpha_n.
$$

这就是傅里叶展开的有限维版本：每个坐标就是向量在该基向量方向上的投影。

**性质 3.3** 设 $\alpha_1,\dots,\alpha_n$ 为 $\mathbb R^n$ 的一组标准正交基，$\alpha,\beta$ 在这组基下的坐标分别为 $(x_1,\dots,x_n)$ 和 $(y_1,\dots,y_n)$，则

1. $(\alpha,\beta)=x_1y_1+x_2y_2+\cdots+x_ny_n$；
2. $|\alpha|^2=(\alpha,\alpha)=x_1^2+x_2^2+\cdots+x_n^2$。

这说明在标准正交基下，内积与长度的表达式和普通坐标形式完全一样，这正是选用标准正交基的方便之处。

## 施密特正交化方法

给定内积空间 $\mathbb R^n$ 的一组基 $\alpha_1,\dots,\alpha_n$，有两个问题：

1. 如何由 $\alpha_1,\dots,\alpha_n$ 生成一组正交基 $\beta_1,\dots,\beta_n$？这称为基的**正交化**。
2. 如何由正交基 $\beta_1,\dots,\beta_n$ 生成标准正交基 $\eta_1,\dots,\eta_n$？这称为基的**单位化**（标准化）。

**定理 3.2（施密特正交化方法）** 设 $\alpha_1,\alpha_2,\dots,\alpha_n$ 是内积空间 $\mathbb R^n$ 的一组基，令

$$
\beta_1=\alpha_1,
$$

$$
\beta_2=\alpha_2-\frac{(\alpha_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1,
$$

$$
\beta_3=\alpha_3-\sum_{k=1}^{2}\frac{(\alpha_3,\beta_k)}{(\beta_k,\beta_k)}\beta_k,
$$

$$
\vdots
$$

$$
\beta_n=\alpha_n-\sum_{k=1}^{n-1}\frac{(\alpha_n,\beta_k)}{(\beta_k,\beta_k)}\beta_k.
$$

则 $\beta_1,\dots,\beta_n$ 是 $\mathbb R^n$ 的一组正交基，且与 $\alpha_1,\dots,\alpha_n$ 等价。

**为什么这样构造**：每一步都从 $\alpha_k$ 中减去它在前面所有 $\beta_j$ 方向上的投影。减去投影后，剩下的部分与每个 $\beta_j$ 都正交：

$$
(\beta_k,\beta_j)=(\alpha_k,\beta_j)-\frac{(\alpha_k,\beta_j)}{(\beta_j,\beta_j)}(\beta_j,\beta_j)=0
\qquad(j<k).
$$

同时 $\beta_k$ 是 $\alpha_1,\dots,\alpha_k$ 的线性组合，且 $\alpha_k$ 的系数为 $1$，所以 $\{\beta_1,\dots,\beta_k\}$ 与 $\{\alpha_1,\dots,\alpha_k\}$ 等价，最终两组基等价，$\beta_1,\dots,\beta_n$ 仍是一组基且两两正交。

### 例 3.2：$\mathbb R^4$ 中的标准正交化

给出 $\mathbb R^4$ 中的四个向量

$$
\alpha_1=(1,1,1,1),\quad
\alpha_2=(3,3,1,1),\quad
\alpha_3=(1,9,1,9),\quad
\alpha_4=(4,0,0,0),
$$

把它们标准正交化。

**解**

(1) 正交化。

取

$$
\beta_1=\alpha_1=(1,1,1,1).
$$

$$
\beta_2=\alpha_2-\frac{(\alpha_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1
=\alpha_2-\frac84\beta_1
=(1,1,-1,-1).
$$

$$
\begin{aligned}
\beta_3
&=\alpha_3-\frac{(\alpha_3,\beta_1)}{(\beta_1,\beta_1)}\beta_1
-\frac{(\alpha_3,\beta_2)}{(\beta_2,\beta_2)}\beta_2\\
&=\alpha_3-5\beta_1-0\cdot\beta_2\\
&=(-4,4,-4,4).
\end{aligned}
$$

$$
\begin{aligned}
\beta_4
&=\alpha_4-\frac{(\alpha_4,\beta_1)}{(\beta_1,\beta_1)}\beta_1
-\frac{(\alpha_4,\beta_2)}{(\beta_2,\beta_2)}\beta_2
-\frac{(\alpha_4,\beta_3)}{(\beta_3,\beta_3)}\beta_3\\
&=\alpha_4-\beta_1-\beta_2-\left(-\frac14\right)\beta_3\\
&=(1,-1,-1,1).
\end{aligned}
$$

(2) 单位化。

$$
\eta_1=\frac{\beta_1}{|\beta_1|}=\frac12(1,1,1,1),
\qquad
\eta_2=\frac{\beta_2}{|\beta_2|}=\frac12(1,1,-1,-1),
$$

$$
\eta_3=\frac{\beta_3}{|\beta_3|}=\frac12(-1,1,-1,1),
\qquad
\eta_4=\frac{\beta_4}{|\beta_4|}=\frac12(1,-1,-1,1).
$$

检验：$\beta_1,\beta_2,\beta_3,\beta_4$ 两两内积为零，长度分别为 $2,2,8,2$；单位化后得到 $\mathbb R^4$ 的标准正交基。

## 正交矩阵

**定义 3.7** 若 $n$ 阶实矩阵 $A$ 满足

$$
A^TA=E,
$$

则称 $A$ 为**正交矩阵**。

由定义易知，$A$ 为正交矩阵的充要条件是

$$
A^{-1}=A^T.
$$

正交矩阵的性质：

1. 若 $A$ 为正交矩阵，则 $A^{-1}=A^T$ 也为正交矩阵；
2. 若 $A,B$ 为同阶正交矩阵，则 $AB$ 也为正交矩阵；
3. 若 $A$ 为正交矩阵，则 $\det A=\pm1$。

**证明要点**

1. 由 $A^TA=E$ 得 $AA^T=E$，于是
   $$
   (A^{-1})^TA^{-1}=AA^T=E,
   $$
   所以 $A^{-1}$ 正交。
2. $$
   (AB)^T(AB)=B^TA^TAB=B^TB=E.
   $$
3. 取行列式：
   $$
   \det(A^TA)=\det(A)^2=\det(E)=1,
   $$
   故 $\det A=\pm1$。

### 正交矩阵的构造

**定理 3.3** $n$ 阶实矩阵 $A=(\alpha_1,\alpha_2,\dots,\alpha_n)$ 为正交矩阵，当且仅当其列向量组 $\alpha_1,\dots,\alpha_n$ 是 $\mathbb R^n$ 的标准正交基。

**证明** 计算

$$
A^TA=
\begin{pmatrix}
\alpha_1^T\\ \alpha_2^T\\ \vdots\\ \alpha_n^T
\end{pmatrix}
(\alpha_1,\alpha_2,\dots,\alpha_n)
=
\begin{pmatrix}
(\alpha_1,\alpha_1)&(\alpha_1,\alpha_2)&\cdots&(\alpha_1,\alpha_n)\\
(\alpha_2,\alpha_1)&(\alpha_2,\alpha_2)&\cdots&(\alpha_2,\alpha_n)\\
\vdots&\vdots&&\vdots\\
(\alpha_n,\alpha_1)&(\alpha_n,\alpha_2)&\cdots&(\alpha_n,\alpha_n)
\end{pmatrix}.
$$

于是

$$
A^TA=E
\iff
(\alpha_i,\alpha_j)=
\begin{cases}
1, & i=j,\\
0, & i\ne j,
\end{cases}
$$

即 $A$ 为正交矩阵 $\iff$ $\alpha_1,\dots,\alpha_n$ 为 $\mathbb R^n$ 的标准正交基。

定理对行向量组也成立：正交矩阵的行向量组也是标准正交基。

## 实对称矩阵的对角化

**定理 3.4** 实对称矩阵的特征值都是实数。

**证明** 设 $A\alpha=\lambda\alpha$，$A$ 为实对称矩阵，$\alpha=(x_1,x_2,\dots,x_n)^T$。记

$$
\bar\alpha=(\bar x_1,\bar x_2,\dots,\bar x_n)^T,
$$

其中 $\bar x_i$ 表示 $x_i$ 的共轭复数。由 $A$ 实对称知 $\bar A=A$。要证 $\bar\lambda=\lambda$。

在 $A\alpha=\lambda\alpha$ 两边左乘 $\bar\alpha^T$：

$$
\bar\alpha^T(A\alpha)=\bar\alpha^T A^T\alpha
=(A\bar\alpha)^T\alpha
=(\overline{A\alpha})^T\alpha
=(\overline{\lambda\alpha})^T\alpha
=\bar\lambda\,\bar\alpha^T\alpha.
$$

右边为

$$
\bar\alpha^T\lambda\alpha=\lambda\bar\alpha^T\alpha.
$$

因此

$$
\bar\lambda\,\bar\alpha^T\alpha=\lambda\bar\alpha^T\alpha.
$$

由于 $\alpha\ne0$，

$$
\bar\alpha^T\alpha=\bar x_1x_1+\bar x_2x_2+\cdots+\bar x_nx_n
=|x_1|^2+|x_2|^2+\cdots+|x_n|^2\ne0,
$$

两边约去这个非零实数，得 $\bar\lambda=\lambda$，即 $\lambda$ 为实数。

**推论** 实对称矩阵的特征值都是实数，所以齐次方程组 $(\lambda E-A)X=0$ 为实系数方程组；又 $\det(\lambda E-A)=0$，故它有实的基础解系，对应的特征向量可以取实向量。

注意定理 3.4 的逆命题不成立：特征值全为实数的矩阵不一定是对称矩阵。例如 $\begin{pmatrix}1&1\\0&2\end{pmatrix}$ 的特征值为 $1,2$，但它不是对称矩阵。

**定理 3.5** 实对称矩阵不同特征值所对应的特征向量必正交。

**证明** 设 $A$ 为实对称矩阵，

$$
A\alpha_1=\lambda_1\alpha_1,\qquad A\alpha_2=\lambda_2\alpha_2,\qquad \lambda_1\ne\lambda_2.
$$

计算 $\lambda_2(\alpha_1,\alpha_2)$：

$$
\begin{aligned}
\lambda_2(\alpha_1,\alpha_2)
&=\lambda_2\alpha_1^T\alpha_2
=\alpha_1^T\lambda_2\alpha_2
=\alpha_1^TA\alpha_2\\
&=\alpha_1^TA^T\alpha_2
=(A\alpha_1)^T\alpha_2
=\lambda_1\alpha_1^T\alpha_2
=\lambda_1(\alpha_1,\alpha_2).
\end{aligned}
$$

于是

$$
(\lambda_2-\lambda_1)(\alpha_1,\alpha_2)=0.
$$

由 $\lambda_1\ne\lambda_2$，得 $(\alpha_1,\alpha_2)=0$，即两特征向量正交。

证明的关键是利用实对称条件 $A^T=A$，把 $\alpha_1^TA\alpha_2$ 改写成 $(A\alpha_1)^T\alpha_2$，从而让 $\lambda_1$ 作用到 $\alpha_1$ 上。

**定理 3.6** 设 $A$ 为 $n$ 阶实对称矩阵，则存在正交矩阵 $T$，使得 $T^{-1}AT$ 为对角矩阵，即

$$
T^{-1}AT=T^TAT=
\begin{pmatrix}
\lambda_1&&&\\
&\lambda_2&&\\
&&\ddots&\\
&&&\lambda_n
\end{pmatrix},
$$

其中 $\lambda_1,\dots,\lambda_n$ 为 $A$ 的全部特征值（允许有重根）。

> **补充证明**：对阶数 $n$ 归纳。$n=1$ 显然。设 $n\ge2$，取 $A$ 的一个单位特征向量 $q_1$，对应特征值 $\lambda_1$，令 $W=q_1^{\perp}$。若 $w\in W$，则 $(Aw,q_1)=(w,Aq_1)=\lambda_1(w,q_1)=0$，故 $Aw\in W$，即 $W$ 是 $A$ 的不变子空间。取 $W$ 的标准正交基 $q_2,\dots,q_n$，则 $T_1=(q_1,q_2,\dots,q_n)$ 为正交矩阵，且 $T_1^{T}AT_1=\begin{pmatrix}\lambda_1&0\\0&B\end{pmatrix}$，其中 $B$ 是 $W$ 上的实对称矩阵。由归纳假设，存在 $n-1$ 阶正交矩阵 $Q$ 使 $Q^{T}BQ$ 为对角矩阵。取 $T=T_1\begin{pmatrix}1&0\\0&Q\end{pmatrix}$，则 $T$ 正交，且 $T^{T}AT$ 为对角矩阵。

这个定理说明：**实对称矩阵一定可以对角化，而且相似变换矩阵可以取为正交矩阵**。正交矩阵的逆等于转置，因此 $T^{-1}AT=T^TAT$，这在计算和理论推导中都很方便。

### 实对称矩阵对角化的步骤

**第一步** 求特征多项式

$$
\det(\lambda E-A)=\prod_{i=1}^m(\lambda-\lambda_i)^{r_i},
\qquad \sum_{i=1}^m r_i=n,
$$

得到全部互异特征值 $\lambda_i$（$i=1,2,\dots,m$）。

**第二步** 因为 $A$ 可对角化，设 $r_i$ 重特征值对应 $r_i$ 个线性无关的特征向量

$$
X_{i1},\dots,X_{ir_i},
$$

它们可以通过解 $(\lambda_iE-A)X=0$ 的基础解系获得。

**第三步** 对每个重特征值对应的向量组，先用施密特正交化，再单位化，把 $X_{i1},\dots,X_{ir_i}$ 化为 $r_i$ 个单位向量

$$
Y_{i1},\dots,Y_{ir_i}.
$$

不同特征值对应的特征向量已经正交（定理 3.5），所以只需在**同一特征值内部**做正交化；这样共得到 $n$ 个两两正交的单位特征向量

$$
Y_{11},\dots,Y_{1r_1};\ Y_{21},\dots,Y_{2r_2};\ \dots;\ Y_{m1},\dots,Y_{mr_m}.
$$

**第四步** 取

$$
T=(Y_{11},\dots,Y_{1r_1};\ Y_{21},\dots,Y_{2r_2};\ \dots;\ Y_{m1},\dots,Y_{mr_m}),
$$

则 $T$ 为正交矩阵，且

$$
T^{-1}AT=\operatorname{diag}(\lambda_1,\dots,\lambda_1,\lambda_2,\dots,\lambda_2,\dots,\lambda_m,\dots,\lambda_m),
$$

每个 $\lambda_i$ 重复 $r_i$ 次。

**为什么要正交化**：实对称矩阵的不同特征值对应的特征向量自动正交，但同一个重特征值对应的基础解系未必正交。为了得到正交矩阵 $T$，必须把每个特征子空间内的基化为标准正交基，否则 $T$ 只是可逆矩阵，不能保证 $T^{-1}=T^T$。

### 例：四阶实对称矩阵的正交对角化

设

$$
A=\begin{pmatrix}
0&1&1&-1\\
1&0&-1&1\\
1&-1&0&1\\
-1&1&1&0
\end{pmatrix},
$$

求正交矩阵 $T$，使得 $T^{-1}AT$ 为对角矩阵，并写出相应的对角矩阵。

**解**

1. 求 $A$ 的全部特征值。计算特征多项式：

$$
\det(\lambda E-A)=
\begin{vmatrix}
\lambda&-1&-1&1\\
-1&\lambda&1&-1\\
-1&1&\lambda&-1\\
1&-1&-1&\lambda
\end{vmatrix}
=(\lambda+3)(\lambda-1)^3.
$$

故特征值为

$$
\lambda_1=\lambda_2=\lambda_3=1,\qquad \lambda_4=-3.
$$

2. 求特征值对应的线性无关特征向量（基础解系）。

对于 $\lambda=1$，由 $(E-A)X=0$，即

$$
\begin{pmatrix}
-1&1&1&-1\\
1&-1&-1&1\\
1&-1&-1&1\\
-1&1&1&-1
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\\x_4\end{pmatrix}=0,
$$

四行都等价于

$$
-x_1+x_2+x_3-x_4=0
\iff x_1=x_2+x_3-x_4.
$$

取自由未知量 $(x_2,x_3,x_4)$ 分别为 $(1,0,0)$，$(0,1,0)$，$(0,0,1)$，得基础解系

$$
\alpha_1=(1,1,0,0)^T,\quad
\alpha_2=(1,0,1,0)^T,\quad
\alpha_3=(1,0,0,-1)^T.
$$

对于 $\lambda=-3$，由 $(A+3E)X=0$，即

$$
\begin{pmatrix}
3&1&1&-1\\
1&3&-1&1\\
1&-1&3&1\\
-1&1&1&3
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\\x_4\end{pmatrix}=0,
$$

解得基础解系

$$
\alpha_4=(1,-1,-1,1)^T.
$$

3. 用施密特正交化再单位化，得单位正交向量组。

(1) 将重根对应的线性无关向量正交化。

取

$$
\beta_1=\alpha_1=(1,1,0,0)^T,
$$

$$
\beta_2=\alpha_2-\frac{(\alpha_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1
=\left(\frac12,-\frac12,1,0\right)^T,
$$

$$
\begin{aligned}
\beta_3
&=\alpha_3-\frac{(\alpha_3,\beta_1)}{(\beta_1,\beta_1)}\beta_1
-\frac{(\alpha_3,\beta_2)}{(\beta_2,\beta_2)}\beta_2\\
&=\left(\frac13,-\frac13,-\frac13,-1\right)^T.
\end{aligned}
$$

(2) 将 $\beta_1,\beta_2,\beta_3,\alpha_4$ 单位化：

$$
\eta_1=\frac{\beta_1}{|\beta_1|}=\frac{1}{\sqrt2}(1,1,0,0)^T,
\qquad
\eta_2=\frac{\beta_2}{|\beta_2|}=\frac{1}{\sqrt6}(1,-1,2,0)^T,
$$

$$
\eta_3=\frac{\beta_3}{|\beta_3|}=\frac{1}{2\sqrt3}(1,-1,-1,-3)^T,
\qquad
\eta_4=\frac{\alpha_4}{|\alpha_4|}=\frac12(1,-1,-1,1)^T.
$$

4. 取正交矩阵

$$
T=(\eta_1,\eta_2,\eta_3,\eta_4)=
\begin{pmatrix}
\dfrac{1}{\sqrt2}&\dfrac{1}{\sqrt6}&\dfrac{1}{2\sqrt3}&\dfrac12\\[2mm]
\dfrac{1}{\sqrt2}&-\dfrac{1}{\sqrt6}&-\dfrac{1}{2\sqrt3}&-\dfrac12\\[2mm]
0&\dfrac{2}{\sqrt6}&-\dfrac{1}{2\sqrt3}&-\dfrac12\\[2mm]
0&0&-\dfrac{3}{2\sqrt3}&\dfrac12
\end{pmatrix},
$$

则

$$
T^TAT=T^{-1}AT=
\begin{pmatrix}
1&&&\\
&1&&\\
&&1&\\
&&&-3
\end{pmatrix}.
$$

**检验**：$A\alpha_1=\alpha_1$，$A\alpha_2=\alpha_2$，$A\alpha_3=\alpha_3$，$A\alpha_4=-3\alpha_4$。例如

$$
A(1,0,0,-1)^T=(1,0,0,-1)^T=\alpha_3,
$$

第一行为 $0\cdot1+1\cdot0+1\cdot0+(-1)(-1)=1$，第二、三行均为 $1-1=0$，第四行为 $-1+0+0+0=-1$，正确。再验证 $\alpha_4$：$A(1,-1,-1,1)^T=(-3,3,3,-3)^T=-3\alpha_4$。

## 期末试题：三阶实对称矩阵

设 $3$ 阶实对称矩阵

$$
A=\begin{pmatrix}
3&-2&-4\\
-2&6&-2\\
-4&-2&3
\end{pmatrix}.
$$

(1) 求矩阵 $A$ 的特征值、特征向量；
(2) 求正交矩阵 $T$，使得 $T^{-1}AT$ 为对角形。

**解**

(1) 计算特征多项式：

$$
|\lambda E-A|=
\begin{vmatrix}
\lambda-3&2&4\\
2&\lambda-6&2\\
4&2&\lambda-3
\end{vmatrix}
=(\lambda-7)^2(\lambda+2).
$$

所以特征值为

$$
\lambda_1=\lambda_2=7,\qquad \lambda_3=-2.
$$

对 $\lambda=-2$，解 $(-2E-A)X=0$：

$$
-2E-A=
\begin{pmatrix}
-5&2&4\\
2&-8&2\\
4&2&-5
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1&-2&0\\
0&2&-1\\
0&0&0
\end{pmatrix}.
$$

由 $x_1-2x_2=0$，$2x_2-x_3=0$，取 $x_2=1$，得

$$
\alpha_1=(2,1,2)^T.
$$

对 $\lambda=7$，解 $(7E-A)X=0$：

$$
7E-A=
\begin{pmatrix}
4&2&4\\
2&1&2\\
4&2&4
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
2&1&2\\
0&0&0\\
0&0&0
\end{pmatrix}.
$$

方程为 $2x_1+x_2+2x_3=0$。它的基础解系可取 $(1,-2,0)^T$ 与 $(0,-2,1)^T$；为方便后面的正交化，直接取两个满足方程且线性无关的向量

$$
\alpha_2=(1,2,-2)^T,\qquad \alpha_3=(0,6,-3)^T.
$$

（两者都满足 $2x_1+x_2+2x_3=0$：$2+2-4=0$，$0+6-6=0$。）所以属于 $\lambda=7$ 的全部特征向量为 $k_2\alpha_2+k_3\alpha_3$（$k_2,k_3$ 不全为零）。

(2) 对 $\alpha_2,\alpha_3$ 作施密特正交化。$\alpha_2$ 与 $\alpha_1$ 已正交：

$$
(\alpha_1,\alpha_2)=2\cdot1+1\cdot2+2\cdot(-2)=0.
$$

取

$$
\eta_2=\frac{\alpha_2}{|\alpha_2|}
=\frac13(1,2,-2)^T.
$$

再令

$$
\beta_3=\alpha_3-\frac{(\alpha_3,\alpha_2)}{(\alpha_2,\alpha_2)}\alpha_2
=(0,6,-3)^T-\frac{18}{9}(1,2,-2)^T
=(-2,2,1)^T.
$$

于是

$$
\eta_3=\frac{\beta_3}{|\beta_3|}
=\frac13(-2,2,1)^T.
$$

最后单位化 $\alpha_1$：

$$
\eta_1=\frac{\alpha_1}{|\alpha_1|}
=\frac13(2,1,2)^T.
$$

取

$$
T=(\eta_1,\eta_2,\eta_3)=
\begin{pmatrix}
\dfrac23&\dfrac13&-\dfrac23\\[2mm]
\dfrac13&\dfrac23&\dfrac23\\[2mm]
\dfrac23&-\dfrac23&\dfrac13
\end{pmatrix},
$$

则

$$
T^{-1}AT=
\begin{pmatrix}
-2&0&0\\
0&7&0\\
0&0&7
\end{pmatrix}.
$$

**说明**：正交矩阵 $T$ 的答案不唯一。对 $\lambda=7$ 的特征子空间，可以选不同的正交基；只要列向量是两两正交的单位特征向量，并且与对角元次序对应，就都是正确答案。

## 期末复习题

**题 1** 设 $5$ 阶实对称矩阵 $A$ 的特征值为 $0,1,2,3,4$，则 $A$ 的秩 $r(A)=?$

**答** $r(A)=4$。实对称矩阵可对角化，相似于 $\operatorname{diag}(0,1,2,3,4)$，秩等于非零特征值的个数，即 $4$。

**题 2** 设 $A$ 为 $n$ 阶可逆方阵，$\lambda$ 为 $A$ 的一个特征值，求 $A^*$ 的一个特征值。

**答** $|A|\lambda^{-1}$。由 $A^*=|A|A^{-1}$，而 $A^{-1}$ 的特征值为 $\lambda^{-1}$（对应特征向量不变），所以 $A^*$ 的特征值为 $|A|\lambda^{-1}$。

## 课堂小结

本节从内积出发建立长度、夹角、正交等概念：内积 $(\alpha,\beta)=\sum a_ib_i$，长度 $|\alpha|=\sqrt{(\alpha,\alpha)}$，正交即内积为零。正交向量组线性无关，$n$ 维空间中 $n$ 个正交向量构成正交基；标准正交基下坐标由内积直接给出，内积和长度就是坐标的平方和。施密特正交化通过"减去在前面各方向上的投影"把任意基化为正交基，再单位化得到标准正交基。正交矩阵满足 $A^TA=E$，其列（行）向量组是标准正交基，行列式为 $\pm1$。实对称矩阵的特征值全为实，不同特征值的特征向量自动正交，且一定存在正交矩阵 $T$ 使 $T^{-1}AT$ 为对角矩阵。对角化步骤是：求特征值；对每个重特征值求基础解系；在同一特征值内部施密特正交化并单位化；把单位特征向量按列排成 $T$。易错点：只需在同一特征值内部正交化，不同特征值的特征向量已正交；$T$ 的列必须与对角元次序一致；正交矩阵的行列式可能为 $-1$，不能由 $\det T=1$ 判断正交。
