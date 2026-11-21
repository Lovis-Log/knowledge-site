---
slug: "17-taylor-theorem-with-lagrange-remainder"
title: "带拉格朗日余项的泰勒定理"
summary: "第 17 讲：带拉格朗日余项的泰勒定理。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "17"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "17带拉格朗日余项的泰勒定理.pdf"
    url: "https://drive.google.com/file/d/1D6LGXF0v5rrjM2idTU3mKXlVowx17Z5M/view?usp=drivesdk"
---

带 Peano 余项的 Taylor 公式擅长处理 $x\to x_0$ 时的局部极限问题，但余项只是一个 $o(\cdot)$，不能用来估计误差的大小。如果函数在整个区间上有 $n+1$ 阶导数，就可以把余项写成某个中间点处 $f^{(n+1)}$ 的表达式，这就是带 Lagrange 余项的 Taylor 定理。它既能做近似计算，也能给出误差界，还能用来证明一些整体的不等式和导数估计。

## 1. 回顾：Peano 展开与常见 Maclaurin 展开

带 Peano 余项的 Taylor 公式为

$$
f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+o\bigl((x-x_0)^n\bigr),\qquad x\to x_0.
$$

当 $x_0=0$ 时就是 Maclaurin 公式。常用的展开式有：

$$
e^x=1+x+\frac{x^2}{2!}+\cdots+\frac{x^n}{n!}+o(x^n),
$$

$$
\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots+(-1)^n\frac{x^{2n+1}}{(2n+1)!}+o(x^{2n+2}),
$$

$$
\cos x=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots+(-1)^n\frac{x^{2n}}{(2n)!}+o(x^{2n+1}),
$$

$$
\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots+(-1)^{n-1}\frac{x^n}{n}+o(x^n),
$$

$$
\frac1{1+x}=1-x+x^2-\cdots+(-1)^n x^n+o(x^n),
$$

$$
(1+x)^\lambda=\sum_{k=0}^{n}C_\lambda^k x^k+o(x^n),
\qquad
C_\lambda^k=\frac{\lambda(\lambda-1)\cdots(\lambda-k+1)}{k!},
$$

$$
\arctan x=x-\frac{x^3}{3}+\frac{x^5}{5}-\cdots+(-1)^n\frac{x^{2n+1}}{2n+1}+o(x^{2n+2}).
$$

这些式子的余项都是 Peano 余项，只在展开点附近成立。下面把余项写成可以估计的形式。

## 2. 带 Lagrange 余项的 Taylor 定理

> **定理 1（带 Lagrange 余项的 Taylor 定理）** 设 $f$ 在开区间 $(a,b)$ 内有 $n+1$ 阶导数，$x_0,x\in(a,b)$。则存在介于 $x_0$ 与 $x$ 之间的 $\xi$，使得
>
> $$
> f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k
> +\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.
> $$

其中

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}
$$

称为 **Lagrange 余项**。

若记 $h=x-x_0$，并把 $\xi$ 写成

$$
\xi=x_0+\theta h,\qquad 0<\theta<1,
$$

则定理可以写成更便于计算的形式：

$$
f(x_0+h)
=
f(x_0)+f'(x_0)h+\frac{f''(x_0)}{2!}h^2+\cdots+\frac{f^{(n)}(x_0)}{n!}h^n
+\frac{f^{(n+1)}(x_0+\theta h)}{(n+1)!}h^{n+1}.
$$

这里 $h$ 可正可负；$\theta$ 依赖于 $x_0$ 和 $h$，但总在 $(0,1)$ 内。

> **关键结论**：与 Peano 余项相比，Lagrange 余项要求 $f^{(n+1)}$ 在整个区间 $(a,b)$ 上存在，条件更强；换来的好处是余项有明确表达式，可以估计大小。

### 2.1 证明

固定 $x\ne x_0$。作辅助函数

$$
F(t)=f(x)-\sum_{k=0}^{n}\frac{f^{(k)}(t)}{k!}(x-t)^k,
\qquad
G(t)=(x-t)^{n+1},\qquad t\in(a,b).
$$

则

$$
F(x)=f(x)-f(x)=0,\qquad G(x)=0.
$$

逐项求导，除最后一项外全部抵消，得

$$
F'(t)=-\frac{f^{(n+1)}(t)}{n!}(x-t)^n,
\qquad
G'(t)=-(n+1)(x-t)^n.
$$

在区间 $[x_0,x]$（若 $x<x_0$ 则为 $[x,x_0]$）上对 $F,G$ 用 Cauchy 中值定理。因为 $G'(t)\ne0$（$t\ne x$），存在 $\xi$ 介于 $x_0$ 与 $x$ 之间，使得

$$
\frac{F(x)-F(x_0)}{G(x)-G(x_0)}
=
\frac{F'(\xi)}{G'(\xi)}.
$$

左边等于

$$
\frac{-F(x_0)}{-G(x_0)}
=
\frac{R_n(x)}{(x-x_0)^{n+1}},
$$

右边等于

$$
\frac{-\dfrac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n}{-(n+1)(x-\xi)^n}
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

于是

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.
$$

这就是要证的结论。

### 2.2 与 Peano 余项的分工

- **Peano 余项**：条件弱，只要求展开点处有 $n$ 阶导数；适合求极限、判断无穷小的阶，是局部工具。
- **Lagrange 余项**：条件强，要求区间上有 $n+1$ 阶导数；适合近似计算、误差估计、证明整体不等式，是整体工具。

## 3. 常见函数的 Lagrange 余项展开

### 例 1：$e^x$

对任意 $x\in\mathbb R$，

$$
e^x=1+x+\frac{x^2}{2!}+\cdots+\frac{x^n}{n!}
+\frac{e^{\theta x}}{(n+1)!}x^{n+1},\qquad 0<\theta<1.
$$

### 例 2：$\sin x$

把 $\sin x$ 展开到 $x^{2n-1}$：

$$
\sin x
=
x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots+(-1)^{n-1}\frac{x^{2n-1}}{(2n-1)!}
+R_{2n}(x),
$$

其中

$$
R_{2n}(x)
=
\frac{\sin^{(2n+1)}(\xi)}{(2n+1)!}x^{2n+1}
=
\frac{(-1)^n\cos(\theta x)}{(2n+1)!}x^{2n+1},
\qquad 0<\theta<1.
$$

这里应把 $\sin x$ 看作已经展开到 $x^{2n}$ 这一项，只是 $x^{2n}$ 的系数为零，所以余项记作 $R_{2n}$，而不是 $R_{2n-1}$。

### 例 3：$\cos x$

把 $\cos x$ 展开到 $x^{2n}$：

$$
\cos x
=
1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots+(-1)^n\frac{x^{2n}}{(2n)!}
+R_{2n+1}(x),
$$

其中

$$
R_{2n+1}(x)
=
\frac{\cos^{(2n+2)}(\xi)}{(2n+2)!}x^{2n+2}
=
\frac{(-1)^{n+1}\cos(\theta x)}{(2n+2)!}x^{2n+2},
\qquad 0<\theta<1.
$$

### 例 4：$\ln(1+x)$

对 $x>-1$，

$$
\ln(1+x)
=
x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots+(-1)^{n-1}\frac{x^n}{n}
+R_n(x),
$$

其中

$$
R_n(x)=\frac{(-1)^n x^{n+1}}{(n+1)(1+\theta x)^{n+1}},
\qquad 0<\theta<1.
$$

### 例 5：$(1+x)^\lambda$

对 $x>-1$，

$$
(1+x)^\lambda
=
\sum_{k=0}^{n}C_\lambda^k x^k+R_n(x),
$$

其中

$$
R_n(x)
=
\frac{\lambda(\lambda-1)\cdots(\lambda-n)}{(n+1)!}
(1+\theta x)^{\lambda-n-1}x^{n+1},
\qquad 0<\theta<1.
$$

当 $\lambda$ 是非负整数且 $\lambda\le n$ 时，乘积 $\lambda(\lambda-1)\cdots(\lambda-n)$ 中含零因子，余项为零，展开式就是普通的二项式展开。

## 4. Taylor 定理的应用

### 例 6：求 $2^{1/5}$ 的近似值

**思路**：找一个容易算 $5$ 次方的数，把 $2$ 写成“这个数的 $5$ 次方乘以一个接近 $1$ 的因子”，再用 $(1-\delta)^{1/5}$ 的二项式展开。

解：取

$$
1.2=\frac65,\qquad \left(\frac65\right)^5=\frac{7776}{3125}=2.48832.
$$

于是

$$
2
=
\left(\frac65\right)^5-\left(\left(\frac65\right)^5-2\right)
=
\left(\frac65\right)^5\left(1-\frac{1526}{7776}\right).
$$

令

$$
\delta=\frac{1526}{7776}=0.1962449\cdots.
$$

利用

$$
(1-\delta)^{1/5}
=
1-\frac15\delta-\frac{2}{25}\delta^2-\frac{6}{125}\delta^3-\cdots,
$$

得

$$
2^{1/5}
=
\frac65(1-\delta)^{1/5}
=
\frac65\left(1-\frac15\delta-\frac{2}{25}\delta^2-\frac{6}{125}\delta^3-\cdots\right).
$$

如果取前四项，即

$$
2^{1/5}
\approx
\frac65\left(1-\frac15\delta-\frac{2}{25}\delta^2-\frac{6}{125}\delta^3\right),
$$

计算得

$$
2^{1/5}\approx1.1487686\cdots.
$$

> 这里用的是 $(1+x)^\lambda$ 在 $x=0$ 处的展开，只是把 $x$ 换成了 $-\delta$。下一项约为 $-6\times10^{-5}$，后续项更小，因此取四项的误差在 $10^{-4}$ 量级以下。

### 例 7：用 $9$ 次多项式逼近 $\sin x$，求误差界

在区间 $[0,\pi]$ 上，用

$$
P_9(x)=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\frac{x^7}{7!}+\frac{x^9}{9!}
$$

逼近 $\sin x$，求误差界。

解：这是 $\sin x$ 的 Maclaurin 多项式，最高次为 $9$，对应例 2 中 $2n-1=9$，即 $n=5$。余项为

$$
R_{10}(x)
=
\frac{\sin^{(11)}(\xi)}{11!}x^{11}
=
\frac{-\cos\xi}{11!}x^{11}.
$$

在 $[0,\pi]$ 上，$|-\cos\xi|\le1$，$|x|\le\pi$，所以

$$
|R_{10}(x)|
\le
\frac{\pi^{11}}{11!}
=
0.0073704\cdots.
$$

因此用 $P_9(x)$ 逼近 $\sin x$，误差不超过约 $0.00737$。在 $[0,\pi]$ 这样的区间上，这已经是很不错的逼近。

### 例 8：由端点值和二阶导数界估计一阶导数

设 $f$ 在 $[0,1]$ 上有二阶导数，且

$$
|f(0)|\le1,\qquad |f(1)|\le1,\qquad |f''(x)|\le2\quad(0\le x\le1).
$$

求证：对每个 $x\in[0,1]$，

$$
|f'(x)|\le3.
$$

**思路**：要估计的是 $f'(x)$，但已知的是 $f(0),f(1)$ 和 $f''$ 的界。把 $f$ 在任意点 $x$ 处分别向 $1$ 和向 $0$ 作 Taylor 展开，两个式子相减，$f(x)$ 被消去，$f'(x)$ 就露出来了；两个二阶导数项再用 $|f''|\le2$ 控制。

证明：对 $x\in(0,1)$，由 Taylor 定理，存在 $\xi\in(x,1)$、$\eta\in(0,x)$，使得

$$
f(1)=f(x)+f'(x)(1-x)+\frac12 f''(\xi)(1-x)^2,
$$

$$
f(0)=f(x)+f'(x)(0-x)+\frac12 f''(\eta)(0-x)^2.
$$

两式相减：

$$
f(1)-f(0)
=
f'(x)+\frac12 f''(\xi)(1-x)^2-\frac12 f''(\eta)x^2.
$$

于是

$$
f'(x)
=
f(1)-f(0)-\frac12 f''(\xi)(1-x)^2+\frac12 f''(\eta)x^2.
$$

取绝对值，利用 $|f(0)|\le1$、$|f(1)|\le1$、$|f''|\le2$：

$$
\begin{aligned}
|f'(x)|
&\le
|f(1)|+|f(0)|
+\frac12|f''(\xi)|(1-x)^2
+\frac12|f''(\eta)|x^2\\
&\le
2+(1-x)^2+x^2.
\end{aligned}
$$

在 $[0,1]$ 上，

$$
(1-x)^2+x^2\le1,
$$

所以

$$
|f'(x)|\le2+1=3.
$$

> **注意**：上面的展开对 $x\in(0,1)$ 进行；端点 $x=0,1$ 可用单侧 Taylor 展开（例如在 $x=1$ 处向 $0$ 展开）同样得到估计。

### 例 9：由 $f$ 与 $f'''$ 的极限推出各阶导数趋于零

设 $f$ 在 $[a,+\infty)$ 上有三阶导数，且

$$
\lim_{x\to+\infty}f(x)=\alpha,\qquad
\lim_{x\to+\infty}f'''(x)=\beta
$$

都存在且有限。求证：

$$
\lim_{x\to+\infty}f'(x)
=
\lim_{x\to+\infty}f''(x)
=
\lim_{x\to+\infty}f'''(x)
=
0.
$$

**思路**：先把 $f(x+1)$ 和 $f(x-1)$ 分别在 $x$ 处展开到三阶。两式相加，$f'(x)$ 消去，留下 $f''(x)$ 和两个三阶导数项；三阶导数都趋于 $\beta$，相减就趋于零，于是先得到 $f''(x)\to0$。再用一阶展开得到 $f'(x)\to0$，最后回代得到 $\beta=0$。

证明：当 $x\ge a+1$ 时，由 Taylor 定理，存在 $\xi\in(x,x+1)$、$\eta\in(x-1,x)$，使得

$$
f(x+1)=f(x)+f'(x)+\frac12 f''(x)+\frac16 f'''(\xi),
$$

$$
f(x-1)=f(x)-f'(x)+\frac12 f''(x)-\frac16 f'''(\eta).
$$

两式相加：

$$
f(x+1)+f(x-1)
=
2f(x)+f''(x)+\frac16\bigl(f'''(\xi)-f'''(\eta)\bigr).
$$

当 $x\to+\infty$ 时，$\xi,\eta\to+\infty$，所以 $f'''(\xi)\to\beta$、$f'''(\eta)\to\beta$，从而

$$
f''(x)
=
f(x+1)+f(x-1)-2f(x)-\frac16\bigl(f'''(\xi)-f'''(\eta)\bigr)
\longrightarrow
2\alpha-2\alpha-0=0.
$$

再对 $f(x+1)$ 在 $x$ 处作二阶 Taylor 展开：存在 $\zeta\in(x,x+1)$，使得

$$
f(x+1)=f(x)+f'(x)+\frac12 f''(\zeta).
$$

令 $x\to+\infty$，左边趋于 $\alpha$，$f(x)$ 趋于 $\alpha$，$f''(\zeta)\to0$，所以

$$
\lim_{x\to+\infty}f'(x)=0.
$$

最后回到三阶展开式：

$$
f(x+1)=f(x)+f'(x)+\frac12 f''(x)+\frac16 f'''(\xi).
$$

令 $x\to+\infty$，得

$$
\alpha=\alpha+0+0+\frac{\beta}{6},
$$

所以 $\beta=0$。于是

$$
\lim_{x\to+\infty}f'''(x)=0.
$$

### 例 10：Landau 不等式

设 $f$ 在 $\mathbb R$ 上有二阶导数，且

$$
M_k=\sup_{x\in\mathbb R}|f^{(k)}(x)|<\infty,\qquad k=0,1,2.
$$

求证：

$$
M_1^2\le2M_0M_2.
$$

**思路**：仍然是把 $f(x+h)$ 和 $f(x-h)$ 在 $x$ 处展开，相减消去 $f(x)$，留下 $2hf'(x)$ 和两个二阶导数项。这样可以把 $|f'(x)|$ 用 $M_0$ 和 $M_2$ 控制住，而且不等式对每个 $h>0$ 都成立；最后对 $h$ 取最优值。

证明：对任意 $x\in\mathbb R$、$h>0$，存在 $\xi\in(x,x+h)$、$\eta\in(x-h,x)$，使得

$$
f(x+h)=f(x)+f'(x)h+\frac12 f''(\xi)h^2,
$$

$$
f(x-h)=f(x)-f'(x)h+\frac12 f''(\eta)h^2.
$$

两式相减：

$$
f(x+h)-f(x-h)
=
2f'(x)h+\frac12\bigl(f''(\xi)-f''(\eta)\bigr)h^2.
$$

于是

$$
2h|f'(x)|
\le
|f(x+h)|+|f(x-h)|
+\frac12\bigl(|f''(\xi)|+|f''(\eta)|\bigr)h^2
\le
2M_0+M_2h^2.
$$

所以

$$
|f'(x)|\le\frac{M_0}{h}+\frac{M_2}{2}h.
$$

右边对 $h>0$ 的最小值在

$$
h=\sqrt{\frac{2M_0}{M_2}}
$$

处取得（若 $M_0=0$ 或 $M_2=0$，结论直接成立）。代入得

$$
|f'(x)|
\le
2\sqrt{\frac{M_0M_2}{2}}
=
\sqrt{2M_0M_2}.
$$

对 $x$ 取上确界，即得

$$
M_1\le\sqrt{2M_0M_2},
$$

也就是

$$
M_1^2\le2M_0M_2.
$$

### 例 11：Taylor 展开中 $\theta$ 的极限

设 $f$ 在点 $x_0$ 有 $n+1$ 阶导数，且 $f^{(n+1)}(x_0)\ne0$。$f$ 在 $x_0$ 处的 Taylor 展开式为

$$
f(x_0+h)
=
f(x_0)+f'(x_0)h+\frac{f''(x_0)}{2!}h^2+\cdots+
\frac{f^{(n)}(x_0+\theta_h h)}{n!}h^n,
\qquad
\theta_h\in(0,1).
$$

求证：

$$
\lim_{h\to0}\theta_h=\frac{1}{n+1}.
$$

**思路**：把同一个 $f(x_0+h)$ 写成两种余项形式。一种是用 Peano 余项展开到 $n+1$ 阶，另一种是题目给出的 Lagrange 形式。两者相减，就能把 $f^{(n)}(x_0+\theta_h h)-f^{(n)}(x_0)$ 与 $h$ 联系起来；再用 $f^{(n)}$ 在 $x_0$ 处可导（因为 $f^{(n+1)}(x_0)$ 存在）的定义，把 $\theta_h$ 解出来。

证明：记 $T_{n-1}$ 为 $f$ 在 $x_0$ 处的 $n-1$ 次 Taylor 多项式。由带 Peano 余项的 Taylor 公式（展开到 $n+1$ 阶），

$$
f(x_0+h)
=
T_{n-1}(x_0+h)+\frac{f^{(n)}(x_0)}{n!}h^n
+\frac{f^{(n+1)}(x_0)}{(n+1)!}h^{n+1}+o(h^{n+1}).
$$

另一方面，题目给出

$$
f(x_0+h)
=
T_{n-1}(x_0+h)+\frac{f^{(n)}(x_0+\theta_h h)}{n!}h^n.
$$

两式相减，除以 $h^n$：

$$
f^{(n)}(x_0+\theta_h h)
=
f^{(n)}(x_0)
+\frac{f^{(n+1)}(x_0)}{n+1}h+o(h).
$$

因为 $0<\theta_h<1$，所以 $\theta_h h\to0$。又 $f^{(n)}$ 在 $x_0$ 处可导，导数为 $f^{(n+1)}(x_0)$，按导数定义，

$$
f^{(n)}(x_0+\theta_h h)-f^{(n)}(x_0)
=
f^{(n+1)}(x_0)\theta_h h+o(\theta_h h).
$$

与上一式比较：

$$
f^{(n+1)}(x_0)\theta_h h+o(h)
=
\frac{f^{(n+1)}(x_0)}{n+1}h+o(h).
$$

两边除以 $h$，再令 $h\to0$。由于 $f^{(n+1)}(x_0)\ne0$，可以除过去，得

$$
\lim_{h\to0}\theta_h
=
\frac{1}{n+1}.
$$

> **易错点**：条件 $f^{(n+1)}(x_0)\ne0$ 不能去掉。若它等于零，$\theta_h$ 可能没有极限，或者极限依赖于函数的高阶项。
>
> 这里的中间点形式是 $n-1$ 次 Taylor 多项式加上含 $f^{(n)}$ 的余项。$f^{(n+1)}(x_0)$ 存在，已蕴含 $f^{(n)}$ 在该点附近有定义、在该点可导；本题不需额外假设 $f^{(n+1)}$ 在邻域连续。

## 课堂小结

- **两种余项**：Peano 余项是局部的、定性的，条件弱，适合求极限；Lagrange 余项是整体的、定量的，条件强，适合误差估计和证明不等式。
- **公式结构**：Lagrange 余项是“下一阶导数在中间点处的值除以 $(n+1)!$，再乘以 $(x-x_0)^{n+1}$”。中间点写成 $x_0+\theta h$，其中 $0<\theta<1$。
- **常见展开**：$e^x$、$\sin x$、$\cos x$、$\ln(1+x)$、$(1+x)^\lambda$ 的 Lagrange 余项要会写；注意 $\sin x$、$\cos x$ 的余项下标比多项式次数多一。
- **应用套路**：近似计算看误差界；证明导数估计时，把函数在任意点向两端展开再相减；证明极限为零时，用两阶展开消去低阶项。
- **易错点**：Lagrange 余项要求区间上有 $n+1$ 阶导数；$\theta$ 依赖于 $h$，不能当作常数；$\sin x$、$\cos x$ 的余项阶数容易写错；例 11 中必须用 $f^{(n+1)}(x_0)\ne0$ 才能除以它。
