---
slug: "22-diagonalization"
title: "对角化与矩阵的幂：把演化拆成互不干扰的方向"
summary: "A = SΛS⁻¹ 让矩阵的幂变成特征值的幂；由此判断稳定性，并用差分方程与 Fibonacci 数列演示增长率的来源。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "diagonalization"
  - "eigenvalues"
  - "difference-equations"
sources:
  - kind: "video"
    title: "22. Diagonalization and Powers of A"
    url: "https://www.youtube.com/watch?v=13r9QY6cmjc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 对角化在做什么

上一讲得到 $Ax=\lambda x$。这一讲把它组织成矩阵形式。把 $n$ 个线性无关的特征向量放进矩阵 $S$ 的列：

$$
S = \begin{bmatrix} x_1 & x_2 & \cdots & x_n \end{bmatrix}
$$

逐列计算 $AS$：

$$
AS = \begin{bmatrix} \lambda_1 x_1 & \lambda_2 x_2 & \cdots & \lambda_n x_n \end{bmatrix}
= S\Lambda
$$

其中 $\Lambda$ 是以 $\lambda_1,\dots,\lambda_n$ 为对角元的对角矩阵。左乘 $S^{-1}$：

$$
A = S\Lambda S^{-1}, \qquad \Lambda = S^{-1}AS
$$

这就是**对角化**。它是与 $A=LU$、$A=QR$ 并列的第三种分解，也是整个特征值章节的核心。

前提很清楚：$S$ 必须可逆，也就是**需要 $n$ 个线性无关的特征向量**。

## 为什么对角化有用：幂

### 从定义直接看

若 $Ax=\lambda x$，两边再乘 $A$：

$$
A^2x = A(\lambda x) = \lambda Ax = \lambda^2 x
$$

所以 $A^2$ 的特征值平方，特征向量不变。一般地：

$$
A^k x = \lambda^k x
$$

### 从分解看

$$
A^2 = (S\Lambda S^{-1})(S\Lambda S^{-1}) = S\Lambda^2 S^{-1}
$$

中间的 $S^{-1}S$ 消掉。对 $k$ 次幂：

$$
A^k = S\Lambda^k S^{-1}
$$

而 $\Lambda^k$ 只是对角元各自取 $k$ 次方。

这正是对角化的价值。若用 $LU$ 计算 $A^{100}$，会得到一百个 $LU$ 相乘，无从下手；用特征分解，只是一个对角矩阵取幂。

### 稳定性定理

$A^k \to 0$ 当且仅当所有特征值的绝对值小于 1：

$$
|\lambda_i| < 1 \quad \text{对所有 } i
$$

原因在于 $S$ 与 $S^{-1}$ 固定不动，只有 $\Lambda^k$ 在变化。绝对值小于 1 的数越乘越小；等于 1 不衰减；大于 1 会发散。特征值可以是负数或复数，所以必须取绝对值。

## 哪些矩阵可以对角化

| 情形 | 是否可对角化 | 说明 |
| --- | --- | --- |
| 特征值互不相同 | 一定可以 | 随机矩阵几乎总属于这一类 |
| 特征值重复，但特征空间足够大 | 可以 | 例如单位矩阵，每个向量都是特征向量 |
| 特征值重复且特征向量不足 | 不可以 | 例如 $\begin{bmatrix}2&1\\0&2\end{bmatrix}$ |

### 重复特征值的两种命运

**单位矩阵**：特征值全是 1，重复 $n$ 次，但每个向量都是特征向量，可以选出 $n$ 个线性无关的。它本来就是对角的。

**反例**：

$$
A=\begin{bmatrix}2&1\\0&2\end{bmatrix}
$$

特征多项式是 $(2-\lambda)^2$，所以 $\lambda=2$ 重复两次。但

$$
A-2I=\begin{bmatrix}0&1\\0&0\end{bmatrix}
$$

零空间只有一维，基是 $(1,0)$。找不到第二个线性无关的特征向量，因此不可对角化。

这里引入两个概念：

- **代数重数**：特征值作为特征多项式根的重数，这里是 2。
- **几何重数**：对应特征空间的维数，这里是 1。

可对角化要求**每个特征值的几何重数等于代数重数**。

## 差分方程：每一步乘以 A

考虑一阶系统

$$
u_{k+1} = A u_k
$$

给定初值 $u_0$，解是

$$
u_k = A^k u_0
$$

这是最紧凑的写法，但并不能直接算出数值。真正的解法是**把 $u_0$ 展开成特征向量的组合**：

$$
u_0 = c_1 x_1 + c_2 x_2 + \cdots + c_n x_n = Sc
$$

每乘一次 $A$，每个分量独立地乘上自己的特征值：

$$
u_k = c_1\lambda_1^k x_1 + c_2\lambda_2^k x_2 + \cdots + c_n\lambda_n^k x_n
$$

写成矩阵形式就是 $u_k = S\Lambda^k c$，与 $A^k u_0 = S\Lambda^k S^{-1}u_0$ 完全一致。

> **一句话总结：** 特征向量把耦合的系统拆成 $n$ 个互不干扰的一维问题。

## Fibonacci 数列：增长率的来源

### 把二阶递推变成一阶系统

$$
F_{k+2} = F_{k+1} + F_k
$$

这是二阶标量递推。引入向量

$$
u_k = \begin{bmatrix}F_{k+1}\\F_k\end{bmatrix}
$$

并补一个恒等式 $F_{k+1}=F_{k+1}$，得到

$$
u_{k+1} =
\begin{bmatrix}1&1\\1&0\end{bmatrix} u_k
$$

记这个矩阵为 $A$。

### 特征值

特征多项式：

$$
\det(A-\lambda I)
=
\begin{vmatrix}1-\lambda&1\\1&-\lambda\end{vmatrix}
=
\lambda^2-\lambda-1
$$

用求根公式：

$$
\lambda = \frac{1\pm\sqrt5}{2}
$$

所以

$$
\lambda_1 = \frac{1+\sqrt5}{2}\approx 1.618,
\qquad
\lambda_2 = \frac{1-\sqrt5}{2}\approx -0.618
$$

验证：和为 1（迹），积为 $-1$（行列式）。

注意 $\lambda^2-\lambda-1=0$ 正是原递推的特征方程，这说明两种做法本质相同。

### 增长由谁决定

初始向量

$$
u_0=\begin{bmatrix}F_1\\F_0\end{bmatrix}=\begin{bmatrix}1\\0\end{bmatrix}
$$

把它写成两个特征向量的组合。此后

$$
u_k = c_1\lambda_1^k x_1 + c_2\lambda_2^k x_2
$$

由于 $|\lambda_1|>1$、$|\lambda_2|<1$，第二项随 $k$ 增大迅速消失，第一项主导：

$$
F_k \approx c_1\left(\frac{1+\sqrt5}{2}\right)^k
$$

这就是黄金比例出现在 Fibonacci 数列中的原因。**增长率不是猜出来的，而是最大特征值的模**。

### 特征向量

对 $2\times2$ 情形，可以直接看出 $\begin{bmatrix}\lambda\\1\end{bmatrix}$ 是特征向量：

$$
\begin{bmatrix}1&1\\1&0\end{bmatrix}
\begin{bmatrix}\lambda\\1\end{bmatrix}
=
\begin{bmatrix}\lambda+1\\\lambda\end{bmatrix}
=
\lambda\begin{bmatrix}\lambda\\1\end{bmatrix}
$$

最后一步用了 $\lambda^2=\lambda+1$。

## 核心回顾

- $A=S\Lambda S^{-1}$，前提是 $n$ 个线性无关的特征向量。
- $A^k=S\Lambda^k S^{-1}$，特征值取 $k$ 次方，特征向量不变。
- $A^k\to0$ 当且仅当所有 $|\lambda_i|<1$。
- 特征值互异一定可对角化；重复时看几何重数是否等于代数重数。
- 差分方程的解：把初值展开到特征向量上，让每个分量按自己的特征值演化。
- Fibonacci 的增长率等于最大特征值 $(1+\sqrt5)/2$。

## 常见误区

1. **以为特征值互异是可对角化的必要条件**。它只是充分条件。
2. **只比较代数重数，不看几何重数**。重复特征值未必短缺。
3. **在稳定性判据里忘记取绝对值**。负特征值的幂会交替变号，但同样需要 $|\lambda|<1$。
4. **把 $A=S\Lambda S^{-1}$ 写成 $S^{-1}\Lambda S$**。记住「$A$ 乘 $S$」，即 $AS=S\Lambda$。
5. **认为 Fibonacci 增长是线性的**。它是指数增长，底数为黄金比例。

## 理解检验

1. 由 $AS=S\Lambda$ 推导 $A=S\Lambda S^{-1}$，指出哪一步需要 $S$ 可逆。
2. 若 $A$ 的特征值是 $2,0.5$，$A^k$ 会趋于零吗？
3. 构造一个特征值重复但可对角化的矩阵，再构造一个不可对角化的。
4. Fibonacci 矩阵的第二个特征值为什么最终不重要？
5. 一个 $3\times3$ 矩阵的特征值是 $1,1,1$，能否断言它可对角化？

## 与前后课程的关系

这一讲处理离散时间（差分方程）。下一讲把同样的思路搬到连续时间：把 $\lambda^k$ 换成 $e^{\lambda t}$，把 $A^k$ 换成矩阵指数 $e^{At}$。稳定性判据也从单位圆内变成左半平面。
