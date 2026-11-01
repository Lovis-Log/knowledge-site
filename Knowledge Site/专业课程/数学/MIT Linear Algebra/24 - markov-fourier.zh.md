---
slug: "24-markov-fourier"
title: "Markov 矩阵与傅里叶级数：特征值的两个应用"
summary: "列和为 1 的非负矩阵必有特征值 1，其正特征向量给出稳态；把同样的「正交基展开」推广到函数空间，就得到傅里叶系数。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "markov-matrices"
  - "fourier-series"
  - "eigenvalues"
sources:
  - kind: "video"
    title: "24. Markov Matrices; Fourier Series"
    url: "https://www.youtube.com/watch?v=lGGDIGizcQ0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## Markov 矩阵的定义

一个矩阵称为 **Markov 矩阵**，如果它满足：

1. 所有元素非负；
2. **每一列**的元素之和为 1。

第二条在转置写法中会变成「每一行之和为 1」。本课程用列向量，因此约定列和为一。

课堂上随手写了一个例子：

$$
A=\begin{bmatrix}
0.1&0.01&0.3\\
0.2&0.99&0.3\\
0.7&0&0.4
\end{bmatrix}
$$

每列相加都是 1。由于非负性与列和为 1 在矩阵乘法下保持，$A$ 的所有幂仍是 Markov 矩阵。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 马尔可夫矩阵与傅里叶级数 |
| 3:05 | 回顾 $\lambda=0$ 的稳态例子 |
| 6:45 | $u_k$ 的 $\lambda^k$ 分解 |
| 9:56 | 特征值 1 与衰减项 |
| 12:57 | 马尔可夫矩阵：每列和为 1 |
| 16:01 | 列相关，因此存在左零向量 |
| 19:05 | 左特征向量与稳态 |
| 22:29 | 人口流动的转移矩阵 |
| 25:40 | 长期分布的计算 |
| 28:46 | 第二个特征值 0.7 |
| 31:48 | $u_k$ 的完整分解 |
| 35:10 | 转向投影与傅里叶 |
| 38:13 | 用正交基展开向量 |
| 41:25 | 把函数也当作向量 |
| 44:30 | 傅里叶级数的系数 |
| 47:36 | 系数计算的例子 |


## 关键结论

| 结论 | 内容 |
| --- | --- |
| 1 | $\lambda=1$ 一定是特征值 |
| 2 | 其余特征值满足 $|\lambda|<1$（例外情形下可等于 1，但不会大于 1） |
| 3 | $\lambda=1$ 对应的特征向量所有分量非负，给出稳态 |

### 为什么 1 一定是特征值

考虑 $A-I$。由于 $A$ 每列之和为 1，$A-I$ 的每列之和为 0。换句话说，把 $A-I$ 的三行相加，得到零行，因此行线性相关，矩阵奇异。

$$
A-I \text{ 奇异} \iff \det(A-I)=0 \iff \lambda=1 \text{ 是特征值}
$$

还有另一种说法：全 1 向量 $\mathbf{1}$ 满足

$$
\mathbf{1}^T(A-I)=0
$$

所以 $\mathbf{1}$ 在 $A-I$ 的**左零空间**里。这个向量不是 $A$ 的特征向量，而是 $A^T$ 的特征向量。由于 $A$ 与 $A^T$ 的特征值相同（$\det(A^T-\lambda I)=\det(A-\lambda I)$），这同样证明了 1 是 $A$ 的特征值。

### 稳态从哪里来

差分方程 $u_{k+1}=Au_k$ 的解为

$$
u_k=c_1 1^k x_1+c_2\lambda_2^k x_2+\cdots
$$

当 $|\lambda_i|<1$ 时，除第一项外全部衰减到零，于是

$$
u_k\to c_1x_1
$$

稳态就是 $\lambda=1$ 的特征向量（乘一个由初始总量决定的系数）。

## 人口流动的例子

设只有两个州：加州（C）与马萨诸塞州（M）。每年：

- 加州 90% 留下，10% 迁往麻省；
- 麻省 80% 留下，20% 迁往加州。

$$
\begin{bmatrix}u_C\\u_M\end{bmatrix}_{k+1}
=
\begin{bmatrix}0.9&0.2\\0.1&0.8\end{bmatrix}
\begin{bmatrix}u_C\\u_M\end{bmatrix}_{k}
$$

矩阵每列和为 1，总人口守恒。

### 特征值

迹为 $1.7$，所以另一个特征值是 $0.7$：

$$
\lambda_1=1,\qquad \lambda_2=0.7
$$

### 特征向量

$\lambda=1$：解 $(A-I)x=0$，其中

$$
A-I=\begin{bmatrix}-0.1&0.2\\0.1&-0.2\end{bmatrix}
$$

零空间由 $(2,1)$ 张成。

$\lambda=0.7$：解 $(A-0.7I)x=0$，得 $(1,-1)$。

### 具体演化

设初始 $u_0=(0,1000)$，即所有人都在麻省。写成特征向量的组合：

$$
\begin{bmatrix}0\\1000\end{bmatrix}
=
c_1\begin{bmatrix}2\\1\end{bmatrix}
+c_2\begin{bmatrix}1\\-1\end{bmatrix}
$$

解得

$$
c_1=\frac{1000}{3},\qquad c_2=-\frac{2000}{3}
$$

于是

$$
u_k=\frac{1000}{3}\begin{bmatrix}2\\1\end{bmatrix}
-\frac{2000}{3}(0.7)^k\begin{bmatrix}1\\-1\end{bmatrix}
$$

当 $k\to\infty$，第二项消失：

$$
u_\infty=\begin{bmatrix}2000/3\\1000/3\end{bmatrix}
$$

总人数仍是 1000。第一步验算：$u_1=A u_0=(200,800)$，与公式一致。

> **补充：** 这个例子假设转移概率每年不变，且人口只在两个州之间流动。真实人口模型还会有出生、死亡与跨州迁移，那时矩阵不再守恒。

## 投影到正交基：傅里叶级数的伏笔

设 $q_1,\dots,q_n$ 是 $n$ 维空间的一组标准正交基。任意向量 $v$ 可以展开为

$$
v=x_1q_1+x_2q_2+\cdots+x_nq_n
$$

两边与 $q_i$ 做内积。由于正交性，只有第 $i$ 项存活：

$$
q_i^Tv=x_i(q_i^Tq_i)=x_i
$$

所以

$$
x_i=q_i^Tv
$$

矩阵形式是 $Qx=v$，而 $Q^{-1}=Q^T$，于是 $x=Q^Tv$。这正是「正交基让求系数变成一次内积」的意思。

## 从向量到函数：傅里叶级数

傅里叶的洞见是把上面的结构搬到函数空间：

- 向量 $v$ 换成函数 $f(x)$；
- 基向量 $q_i$ 换成函数 $1,\cos x,\sin x,\cos 2x,\sin 2x,\dots$；
- 有限维换成无限维。

### 函数的内积

向量内积是「逐分量相乘再相加」。函数有无穷多个点，求和变成积分：

$$
\langle f,g\rangle=\int_0^{2\pi} f(x)g(x)\,dx
$$

积分区间取 $[0,2\pi]$，因为所有基函数都以 $2\pi$ 为周期。

### 正交性

以 $\sin x$ 与 $\cos x$ 为例：

$$
\int_0^{2\pi}\sin x\cos x\,dx
=
\frac12\int_0^{2\pi}\sin 2x\,dx
=
0
$$

其他组合同样正交（同频率的正弦与余弦、不同频率的三角函数之间内积为零）。

### 系数公式

把 $f$ 写成

$$
f(x)=a_0+\sum_{k=1}^{\infty}\left(a_k\cos kx+b_k\sin kx\right)
$$

两边与 $\cos x$ 做内积（即乘以 $\cos x$ 再积分）。所有正交项消失，只剩

$$
\int_0^{2\pi} f(x)\cos x\,dx
=
a_1\int_0^{2\pi}\cos^2x\,dx
=
a_1\pi
$$

所以

$$
a_1=\frac{1}{\pi}\int_0^{2\pi} f(x)\cos x\,dx
$$

一般地：

$$
a_k=\frac{1}{\pi}\int_0^{2\pi} f(x)\cos kx\,dx,
\qquad
b_k=\frac{1}{\pi}\int_0^{2\pi} f(x)\sin kx\,dx
$$

常数项的系数是函数的平均值：

$$
a_0=\frac{1}{2\pi}\int_0^{2\pi} f(x)\,dx
$$

> **一句话总结：** 傅里叶系数就是函数在正交基上的投影坐标，公式与有限维的 $x_i=q_i^Tv$ 完全同构。

## 核心回顾

- Markov 矩阵：非负、列和为 1；幂仍然是 Markov 矩阵。
- 列和为 1 保证 $A-I$ 奇异，因此 1 必是特征值。
- 其余特征值模小于 1，故 $A^k$ 收敛到 $\lambda=1$ 的特征向量方向。
- 稳态向量非负，由初始总量确定倍数。
- 正交基下，展开系数是一次内积：$x_i=q_i^Tv$。
- 函数空间的内积是积分；傅里叶系数就是投影坐标。

## 常见误区

1. **把列和为 1 记成行和为 1**。取决于向量写成列还是行；本课程用列。
2. **认为所有 Markov 矩阵都收敛到唯一稳态**。若存在模为 1 的其他特征值，可能周期振荡；若矩阵可约，稳态可能不唯一。
3. **把 $\lambda=1$ 的特征向量直接当成任意倍数**。倍数由总人口（初始条件）决定。
4. **把函数内积写成普通乘积**。必须积分。
5. **忘记傅里叶系数的归一化因子**。$\cos$、$\sin$ 的平方在 $[0,2\pi]$ 上积分是 $\pi$，不是 1。

## 理解检验

**1. 证明 Markov 矩阵的列和为 1 蕴含 $A-I$ 奇异。**

参考答案：记 $\mathbf{1}=(1,1,\dots,1)^T$。列和为 1 等价于 $\mathbf{1}^TA=\mathbf{1}^T$（$A$ 的每一列与 $\mathbf{1}$ 的内积都是 1）。于是
$$
\mathbf{1}^T(A-I)=\mathbf{1}^TA-\mathbf{1}^T=\mathbf{1}^T-\mathbf{1}^T=0 .
$$
$\mathbf{1}\ne0$ 属于 $A-I$ 的左零空间，所以 $A-I$ 奇异，即 $\det(A-I)=0$，$\lambda=1$ 是特征值。也可以直接看：$A-I$ 的每列之和为 0，把它的各行相加得到零行，故矩阵奇异。

**2. 为什么全 1 向量在 $A^T$ 的零空间而不是 $A$ 的零空间？**

参考答案：上面的关系是 $\mathbf{1}^TA=\mathbf{1}^T$，转置得 $A^T\mathbf{1}=\mathbf{1}$。所以 $\mathbf{1}$ 是 $A^T$ 的特征向量（特征值 1），也就是 $(A^T-I)\mathbf{1}=0$，位于 $A^T$ 的零空间。对 $A$ 本身，$\lambda=1$ 的特征向量是稳态分布 $x_1$（分量非负、按总人口缩放），一般**不是**全 1 向量；只有行和也全为 1 的特殊矩阵（如双随机矩阵）才有 $A\mathbf{1}=\mathbf{1}$。行列和条件是两个不同的条件。

**3. 在上面的两州模型中，若初始为 $(1000,0)$，稳态是什么？**

参考答案：特征向量仍为 $x_1=(2,1)$、$x_2=(1,-1)$。设
$$
\begin{bmatrix}1000\\0\end{bmatrix}=c_1\begin{bmatrix}2\\1\end{bmatrix}+c_2\begin{bmatrix}1\\-1\end{bmatrix},
$$
得 $2c_1+c_2=1000$、$c_1-c_2=0$，所以 $c_1=c_2=\frac{1000}{3}$。当 $k\to\infty$，$(0.7)^k\to0$，稳态为
$$
u_\infty=c_1x_1=\begin{bmatrix}2000/3\\1000/3\end{bmatrix}.
$$
与初始在麻省的情形相同：稳态只由总人口 1000 决定，与初始分布无关。

**4. 用内积推导 $b_1$ 的公式。**

参考答案：把 $f(x)=a_0+\sum_{k\ge1}(a_k\cos kx+b_k\sin kx)$ 两边乘以 $\sin x$，在 $[0,2\pi]$ 上积分。由正交性，除 $b_1\sin x$ 外所有项积分为零（$\int\sin x\cos kx=0$，$\int\sin x\sin kx=0$ 当 $k\ne1$）。剩下
$$
\int_0^{2\pi}f(x)\sin x\,dx=b_1\int_0^{2\pi}\sin^2x\,dx=b_1\pi,
$$
所以 $b_1=\frac{1}{\pi}\int_0^{2\pi}f(x)\sin x\,dx$。关键归一化：$\int_0^{2\pi}\sin^2x\,dx=\pi$，不是 1。

**5. 为什么说傅里叶级数是「无限维的正交基展开」？**

参考答案：把函数看成向量空间中的元素，内积定义为 $\langle f,g\rangle=\int_0^{2\pi}fg\,dx$。基函数 $1,\cos x,\sin x,\cos2x,\sin2x,\dots$ 两两正交，且每个的模长平方为 $\pi$（常数 1 为 $2\pi$）。因此系数就是投影：
$$
a_k=\frac{\langle f,\cos kx\rangle}{\langle\cos kx,\cos kx\rangle},\qquad
b_k=\frac{\langle f,\sin kx\rangle}{\langle\sin kx,\sin kx\rangle},
$$
与有限维的 $x_i=q_i^Tv$ 完全同构；区别只是基无穷多、求和变成级数，收敛性需要额外讨论（平方可积意义下成立）。

## 与前后课程的关系

这一讲把特征值用于概率模型，把投影用于函数空间。下一讲（复习课）串联正交、行列式与特征值三条主线；再之后进入对称矩阵与正定性，那里正交性、特征值与二次型会汇合。
