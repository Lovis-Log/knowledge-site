---
slug: "23-differential-equations"
title: "微分方程与矩阵指数 e^{At}"
summary: "du/dt = Au 的解是特征向量乘指数；用 SΛS⁻¹ 把系统解耦，得到矩阵指数，并由特征值实部的符号判断稳定、稳态与发散。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "differential-equations"
  - "matrix-exponential"
  - "eigenvalues"
sources:
  - kind: "video"
    title: "23. Differential Equations and exp(At)"
    url: "https://www.youtube.com/watch?v=IZqwi0wJovM"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 从离散到连续

上一讲解 $u_{k+1}=Au_k$，解里出现 $\lambda^k$。这一讲解

$$
\frac{du}{dt} = Au
$$

常数系数线性微分方程的解是**指数函数**，所以答案里出现 $e^{\lambda t}$。两套理论完全平行：幂换成指数，特征值仍然决定一切。

## 一个完整的二维例子

设

$$
A=\begin{bmatrix}-1&2\\1&-2\end{bmatrix},
\qquad
u(0)=\begin{bmatrix}1\\0\end{bmatrix}
$$

### 先求特征值

矩阵奇异——第二列是第一列的 $-2$ 倍——所以 $\lambda_1=0$。迹为 $-3$，因此 $\lambda_2=-3$。

也可以用特征多项式验证：

$$
\det(A-\lambda I)
=
\begin{vmatrix}-1-\lambda&2\\1&-2-\lambda\end{vmatrix}
=
\lambda^2+3\lambda
=
\lambda(\lambda+3)
$$

### 再求特征向量

$\lambda=0$：零空间满足 $-u_1+2u_2=0$，取

$$
x_1=\begin{bmatrix}2\\1\end{bmatrix}
$$

$\lambda=-3$：解 $(A+3I)x=0$，其中

$$
A+3I=\begin{bmatrix}2&2\\1&1\end{bmatrix}
$$

零空间由

$$
x_2=\begin{bmatrix}1\\-1\end{bmatrix}
$$

张成（取 $[-1,1]$ 也可以）。

### 写出通解

两个纯指数解是 $e^{0t}x_1$ 与 $e^{-3t}x_2$，通解为它们的线性组合：

$$
u(t)=c_1 e^{0t}\begin{bmatrix}2\\1\end{bmatrix}
+
c_2 e^{-3t}\begin{bmatrix}1\\-1\end{bmatrix}
$$

为什么它满足方程？对第一项求导得 $\lambda_1 e^{\lambda_1 t}x_1$，而 $Au$ 中对应项是 $e^{\lambda_1 t}Ax_1=\lambda_1 e^{\lambda_1 t}x_1$，两边相等。第二项同理。

### 用初值定系数

在 $t=0$：

$$
c_1\begin{bmatrix}2\\1\end{bmatrix}
+
c_2\begin{bmatrix}1\\-1\end{bmatrix}
=
\begin{bmatrix}1\\0\end{bmatrix}
$$

即

$$
2c_1+c_2=1, \qquad c_1-c_2=0
$$

所以 $c_1=c_2=\frac13$，解为

$$
u(t)=\frac13\begin{bmatrix}2\\1\end{bmatrix}
+
\frac13 e^{-3t}\begin{bmatrix}1\\-1\end{bmatrix}
$$

### 读懂这个解

- 第一项不随时间变化，是**稳态**。
- 第二项以 $e^{-3t}$ 衰减，最终消失。
- 当 $t\to\infty$，$u\to\left[\frac23,\frac13\right]^T$。初始的 $[1,0]$ 有一部分「流」到了第二个分量。

这正是特征值在开头就预告的行为：一个零特征值给出稳态，一个负特征值给出衰减。

## 稳定、稳态与发散

| 情形 | 特征值条件 | 长期行为 |
| --- | --- | --- |
| 稳定 | 所有 $\operatorname{Re}\lambda<0$ | $u(t)\to0$ |
| 稳态 | 一个 $\lambda=0$，其余 $\operatorname{Re}\lambda<0$ | 收敛到非零常数向量 |
| 发散 | 任一 $\operatorname{Re}\lambda>0$ | 至少一个分量指数增长 |

### 为什么看实部而不是模

若 $\lambda=-3+6i$，则

$$
e^{\lambda t}=e^{-3t}e^{6i t}
$$

$e^{6it}=\cos 6t+i\sin 6t$ 的模恒为 1，只在单位圆上转。决定增长或衰减的只有实部 $-3$。虚部只带来振荡。

所以：

- 差分方程的稳定区域是复平面上的**单位圆内**（$|\lambda|<1$）。
- 微分方程的稳定区域是**左半平面**（$\operatorname{Re}\lambda<0$）。

### 二阶矩阵的快速判据

对 $2\times2$ 矩阵，两个特征值实部都为负，等价于

$$
\operatorname{tr}A<0 \quad \text{且} \quad \det A>0
$$

迹是特征值之和，行列式是乘积。两个实部为负的数，和必为负、积必为正；复共轭情形同理。

单独一个条件不够。反例：

$$
\begin{bmatrix}-2&0\\0&1\end{bmatrix}
$$

迹为 $-1<0$，但特征值是 $-2$ 与 $1$，仍然发散。所以行列式条件不能省。

## 用 S 和 Λ 解耦

把 $u=Sv$ 代入 $\frac{du}{dt}=Au$：

$$
S\frac{dv}{dt}=ASv
$$

左乘 $S^{-1}$：

$$
\frac{dv}{dt}=S^{-1}AS\,v=\Lambda v
$$

系统变成 $n$ 个独立方程：

$$
\frac{dv_i}{dt}=\lambda_i v_i
$$

每个解是 $v_i(t)=e^{\lambda_i t}v_i(0)$，即

$$
v(t)=e^{\Lambda t}v(0)
$$

回到原变量：

$$
u(t)=S e^{\Lambda t}S^{-1}u(0)
$$

这解释了为什么 $S$ 的列必须是特征向量：**换到特征向量基下，系统没有耦合**。

## 矩阵指数

### 定义

把标量指数函数的幂级数搬到矩阵上：

$$
e^{At}=I+At+\frac{(At)^2}{2!}+\frac{(At)^3}{3!}+\cdots
$$

这个级数对任何矩阵、任何 $t$ 都收敛，因为分母的阶乘增长得足够快。

### 与对角化的关系

把 $A=S\Lambda S^{-1}$ 代入每一项：

$$
(At)^k=S(\Lambda t)^k S^{-1}
$$

级数逐项提出 $S$ 与 $S^{-1}$，中间剩下

$$
I+\Lambda t+\frac{(\Lambda t)^2}{2!}+\cdots=e^{\Lambda t}
$$

所以

$$
e^{At}=S e^{\Lambda t}S^{-1}
$$

对角矩阵的指数只需对每个对角元取指数：

$$
e^{\Lambda t}=
\begin{bmatrix}
e^{\lambda_1 t} & & \\
& \ddots & \\
& & e^{\lambda_n t}
\end{bmatrix}
$$

### 前提

这个推导要求 $A$ 可对角化。特征向量不足的矩阵没有 $S^{-1}$，需要改用 Jordan 形式或其他方法。课堂上明确把这一类留到后面处理。

## 把高阶方程化成一阶系统

考虑二阶方程

$$
y''+by'+ky=0
$$

令

$$
u=\begin{bmatrix}y'\\y\end{bmatrix}
$$

则

$$
u'=\begin{bmatrix}y''\\y'\end{bmatrix}
=
\begin{bmatrix}-b&-k\\1&0\end{bmatrix}
\begin{bmatrix}y'\\y\end{bmatrix}
$$

第一行来自原方程，第二行是恒等式 $y'=y'$。特征值满足

$$
\lambda^2+b\lambda+k=0
$$

与原方程的特征方程一致。这个方法可以推广到任意阶：把最高阶导数放第一行，其余行放移位单位矩阵。

## 核心回顾

- $\frac{du}{dt}=Au$ 的解是特征向量乘 $e^{\lambda t}$ 的线性组合。
- 通解的系数由初值 $Sc=u(0)$ 决定。
- 稳定看实部：全负趋于零，有零且其余为负趋于稳态，有正则发散。
- $2\times2$ 稳定判据：迹为负且行列式为正。
- 换基到特征向量后系统解耦，得到 $u=Se^{\Lambda t}S^{-1}u(0)$。
- 矩阵指数由幂级数定义，$e^{At}=Se^{\Lambda t}S^{-1}$，要求可对角化。

## 常见误区

1. **用特征值的模判断连续系统的稳定性**。要看实部；模对应的是离散系统。
2. **忽略虚部**。虚部不改变增长趋势，但会产生振荡，解不是单调的。
3. **只检查迹为负**。还必须检查行列式为正。
4. **把矩阵指数当成逐元素取指数**。$e^{At}$ 不是对每个元素求 $e^{a_{ij}t}$。
5. **忘记初始条件的作用**。特征值决定行为类型，初值决定各分量占多少。

## 理解检验

1. 为什么 $\lambda=0$ 对应稳态而不是衰减？
2. 若特征值是 $-1\pm 4i$，解会发散吗？会振荡吗？
3. 用迹与行列式判断 $\begin{bmatrix}-1&2\\1&-2\end{bmatrix}$ 是否稳定。
4. 写出 $y''+3y'+2y=0$ 对应的一阶系统与特征方程。
5. 推导 $e^{At}=Se^{\Lambda t}S^{-1}$ 时，哪一步用到了 $S$ 可逆？

## 与前后课程的关系

上一讲是离散时间，这一讲是连续时间。接下来课程转向对称矩阵：它们的特征值必为实数、特征向量必正交，因此一定可以对角化，而且分解是正交的——这解决了本章遗留的「坏情况」中的一大类。
