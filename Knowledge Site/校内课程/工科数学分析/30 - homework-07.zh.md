---
slug: "30-homework-07"
title: "第 7 次作业与解析"
summary: "第 7 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "homework"
displayNumber: "07"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "7.png"
    url: "https://drive.google.com/file/d/1VsHdPaAXp7rYKYb8ToT4xkHcGhbztNkx/view?usp=drivesdk"
---

> 说明：以下解答是本次独立作出的**补充解答**，并非教师发布的标准答案。题面按作业图片转录；若个别题目的题面理解有歧义，已在对应解答中说明。

## 第 1 题

<!-- homework-topic: 写出 $\dfrac{1}{\sqrt{1+x}}$ 展开到 $x^4$ 的带 Peano 余项的 Maclaurin 公式 -->

写出 $\dfrac{1}{\sqrt{1+x}}$ 带 Peano 余项的 Maclaurin 展开式（展开到 $x^4$）。

**补充解答**

把函数写成

$$
\frac{1}{\sqrt{1+x}}=(1+x)^{-1/2}.
$$

用二项式展开

$$
(1+x)^\lambda=\sum_{k=0}^{n}C_\lambda^k x^k+o(x^n),
\qquad
C_\lambda^k=\frac{\lambda(\lambda-1)\cdots(\lambda-k+1)}{k!},
$$

取 $\lambda=-\dfrac12$。逐项计算：

$$
C_{-1/2}^1=-\frac12,
$$

$$
C_{-1/2}^2=\frac{\left(-\frac12\right)\left(-\frac32\right)}{2!}=\frac38,
$$

$$
C_{-1/2}^3=\frac{\left(-\frac12\right)\left(-\frac32\right)\left(-\frac52\right)}{3!}
=-\frac{5}{16},
$$

$$
C_{-1/2}^4=\frac{\left(-\frac12\right)\left(-\frac32\right)\left(-\frac52\right)\left(-\frac72\right)}{4!}
=\frac{35}{128}.
$$

所以

$$
\frac{1}{\sqrt{1+x}}
=
1-\frac{x}{2}+\frac{3x^2}{8}-\frac{5x^3}{16}+\frac{35x^4}{128}+o(x^4),
\qquad x\to0.
$$

> 这是 $x=0$ 处的局部展开，余项是 Peano 余项。函数本身在 $x>-1$ 上有定义，但展开式是 $x\to0$ 时的局部展开，不能直接用于离 $0$ 较远的 $x$。

## 第 2 题

<!-- homework-topic: 把多项式 $P(x)=1+3x+5x^2-2x^3$ 按 $(x+1)$ 的乘幂展开 -->

按 $(x+1)$ 的乘幂展开多项式

$$
P(x)=1+3x+5x^2-2x^3.
$$

**补充解答**

令 $t=x+1$，则 $x=t-1$。代入：

$$
\begin{aligned}
P(x)
&=
1+3(t-1)+5(t-1)^2-2(t-1)^3\\
&=
1+3t-3+5(t^2-2t+1)-2(t^3-3t^2+3t-1)\\
&=
(1-3+5+2)+(3-10-6)t+(5+6)t^2-2t^3\\
&=
5-13t+11t^2-2t^3.
\end{aligned}
$$

把 $t=x+1$ 代回：

$$
P(x)=5-13(x+1)+11(x+1)^2-2(x+1)^3.
$$

> 这实际上就是 $P$ 在 $x_0=-1$ 处的 Taylor 展开。也可以先算 $P(-1),P'(-1),P''(-1),P'''(-1)$，再用 Taylor 公式，结果相同。

## 第 3 题

<!-- homework-topic: 求 $f(x)=xe^x$ 带 Lagrange 余项的 $n$ 阶 Maclaurin 公式 -->

求函数 $f(x)=xe^x$ 的 $n$ 阶 Maclaurin 公式，带 Lagrange 余项。

**补充解答**

先求导：

$$
f'(x)=(1+x)e^x,\qquad
f''(x)=(2+x)e^x.
$$

一般地，对 $k\ge1$，

$$
f^{(k)}(x)=(k+x)e^x.
$$

这可以用归纳法证明：$k=1$ 时成立；若 $f^{(k)}(x)=(k+x)e^x$，则

$$
f^{(k+1)}(x)=e^x+(k+x)e^x=(k+1+x)e^x.
$$

在 $x=0$ 处，

$$
f(0)=0,\qquad f^{(k)}(0)=k,\quad k\ge1.
$$

所以 $n$ 次 Maclaurin 多项式为

$$
T_n(x)=\sum_{k=1}^{n}\frac{k}{k!}x^k
=
\sum_{k=1}^{n}\frac{x^k}{(k-1)!}.
$$

Lagrange 余项为

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}x^{n+1}
=
\frac{(n+1+\xi)e^\xi}{(n+1)!}x^{n+1},
$$

其中 $\xi$ 介于 $0$ 与 $x$ 之间。写成 $\xi=\theta x$，$0<\theta<1$，得

$$
xe^x
=
\sum_{k=1}^{n}\frac{x^k}{(k-1)!}
+\frac{(n+1+\theta x)e^{\theta x}}{(n+1)!}x^{n+1},
\qquad 0<\theta<1.
$$

这就是所求的 $n$ 阶 Maclaurin 公式。$n=0$ 时和式为空，公式仍然成立。

## 第 4 题

<!-- homework-topic: 用 Taylor 展开求三个极限 -->

求下列极限。

### (1) $\displaystyle\lim_{x\to0}\frac{e^{x^3}-1-x^3}{(\sin 2x)^6}$

**思路**：分子里一次项 $x^3$ 已经被减掉，指数函数展开后第一个不消失的项是 $(x^3)^2/2$，正好是六阶；分母也是六阶，所以比较首个非零项即可。

**补充解答**：由 $e^u=1+u+u^2/2+o(u^2)$，令 $u=x^3$，得

$$
e^{x^3}-1-x^3=\frac{x^6}{2}+o(x^6).
$$

又因为 $\sin 2x\sim2x$，所以

$$
\lim_{x\to0}\frac{e^{x^3}-1-x^3}{(\sin 2x)^6}
=\frac{1/2}{2^6}=\frac1{128}.
$$

> **易错点**：指数与减去的项都是 $x^3$，不是 $x^2$；先确认展开变量，再判断最低阶。

### (2) $\displaystyle\lim_{x\to+\infty}\left(x+\frac12\right)\ln\left(1+\frac1x\right)$

**补充解答**

令 $t=\dfrac1x$，则 $t\to0^+$，且

$$
x+\frac12=\frac1t+\frac12=\frac{2+t}{2t}.
$$

由

$$
\ln(1+t)=t-\frac{t^2}{2}+\frac{t^3}{3}+o(t^3),
$$

得

$$
\begin{aligned}
\left(x+\frac12\right)\ln\left(1+\frac1x\right)
&=
\frac{2+t}{2t}\left(t-\frac{t^2}{2}+\frac{t^3}{3}+o(t^3)\right)\\
&=
\frac{2+t}{2}\left(1-\frac{t}{2}+\frac{t^2}{3}+o(t^2)\right)\\
&=
\left(1+\frac t2\right)\left(1-\frac t2+\frac{t^2}{3}+o(t^2)\right)\\
&=
1+\left(\frac13-\frac14\right)t^2+o(t^2)\\
&=
1+\frac{t^2}{12}+o(t^2).
\end{aligned}
$$

所以极限为

$$
1.
$$

### (3) $\displaystyle\lim_{x\to0^+}\frac{e^x-1-x}{\sqrt{1-x}-\cos\sqrt{x}}$

**补充解答**

分子：

$$
e^x-1-x=\frac{x^2}{2}+o(x^2).
$$

分母分别展开：

$$
\sqrt{1-x}
=
1-\frac{x}{2}-\frac{x^2}{8}+o(x^2),
$$

$$
\cos\sqrt{x}
=
1-\frac{x}{2}+\frac{x^2}{24}+o(x^2).
$$

两式相减：

$$
\sqrt{1-x}-\cos\sqrt{x}
=
-\frac{x^2}{8}-\frac{x^2}{24}+o(x^2)
=
-\frac{x^2}{6}+o(x^2).
$$

于是

$$
\frac{e^x-1-x}{\sqrt{1-x}-\cos\sqrt{x}}
\longrightarrow
\frac{\frac12}{-\frac16}
=
-3.
$$

所以极限为

$$
-3.
$$

## 第 5 题

<!-- homework-topic: 估计 $e^x$ 三阶近似在 $0<x\le\dfrac12$ 上的误差，并求误差小于 $0.01$ 的 $\sqrt e$ 近似值 -->

证明：当 $0<x\le\dfrac12$ 时，按公式

$$
e^x\approx1+x+\frac{x^2}{2}+\frac{x^3}{6}
$$

计算 $e^x$ 的近似值时，所产生的误差小于 $0.01$；并求 $\sqrt{e}$ 的近似值，使误差小于 $0.01$。

**补充解答**

这是 $e^x$ 的三阶 Maclaurin 公式。由 Lagrange 余项，存在 $\xi$ 介于 $0$ 与 $x$ 之间，使得

$$
e^x
=
1+x+\frac{x^2}{2}+\frac{x^3}{6}
+\frac{e^\xi}{4!}x^4.
$$

当 $0<x\le\dfrac12$ 时，

$$
e^\xi\le e^{1/2}<2,\qquad
x^4\le\left(\frac12\right)^4=\frac1{16},\qquad
4!=24.
$$

所以误差不超过

$$
|R_3(x)|
\le
\frac{2}{24}\cdot\frac1{16}
=
\frac{1}{192}
\approx0.00521<0.01.
$$

因此对任意 $0<x\le\dfrac12$，用该公式计算 $e^x$ 的误差都小于 $0.01$。

取 $x=\dfrac12$，则 $\sqrt e=e^{1/2}$，于是

$$
\sqrt e
\approx
1+\frac12+\frac{1}{2}\left(\frac12\right)^2+\frac{1}{6}\left(\frac12\right)^3
=
1+\frac12+\frac18+\frac1{48}
=
\frac{79}{48}
\approx1.645833.
$$

误差仍不超过 $\dfrac1{192}<0.01$。因此可取

$$
\sqrt e\approx1.646
$$

（精确值为 $1.64872\cdots$，实际误差约为 $0.0029$）。

## 第 6 题

<!-- homework-topic: 证明 Landau 不等式 $M_1^2\le2M_0M_2$ -->

设 $f$ 在 $\mathbb R$ 上有二阶导数。如果

$$
M_k=\sup_{x\in\mathbb R}\left|f^{(k)}(x)\right|,\qquad k=0,1,2
$$

都为有限数，求证：

$$
M_1^2\le2M_0M_2.
$$

**补充解答**

**思路**：把 $f(x+h)$ 与 $f(x-h)$ 在 $x$ 处分别展开，相减消去 $f(x)$，留下 $2hf'(x)$ 和两个二阶导数项。这样可以用 $M_0$ 控制函数值，用 $M_2$ 控制二阶导数，最后对 $h$ 取最优值。

证明：若 $M_0=0$，则 $f\equiv0$，结论显然。若 $M_2=0$，则 $f''\equiv0$，$f'$ 为常数；又 $f$ 有界，这个常数只能为 $0$，所以 $M_1=0$，结论也成立。下面设 $M_0>0$、$M_2>0$。

对任意 $x\in\mathbb R$、$h>0$，由 Taylor 定理，存在 $\xi\in(x,x+h)$、$\eta\in(x-h,x)$，使得

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

处取得，最小值为

$$
2\sqrt{\frac{M_0M_2}{2}}
=
\sqrt{2M_0M_2}.
$$

因此对任意 $x$，

$$
|f'(x)|\le\sqrt{2M_0M_2}.
$$

对 $x$ 取上确界，得

$$
M_1\le\sqrt{2M_0M_2},
$$

即

$$
M_1^2\le2M_0M_2.
$$

## 第 7 题

<!-- homework-topic: 证明 Taylor 展开式中的 $\theta_h\to\dfrac{1}{n+1}\ (h\to0)$ -->

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

**补充解答**

**思路**：同一个 $f(x_0+h)$ 有两种写法：一种是用 Peano 余项展开到 $n+1$ 阶，另一种是题目给出的 Lagrange 形式。两者相减，就能把 $f^{(n)}(x_0+\theta_h h)-f^{(n)}(x_0)$ 与 $h$ 联系起来，再用 $f^{(n)}$ 在 $x_0$ 处可导的定义解出 $\theta_h$。

证明：记 $T_{n-1}$ 为 $f$ 在 $x_0$ 处的 $n-1$ 次 Taylor 多项式。由带 Peano 余项的 Taylor 公式（展开到 $n+1$ 阶），

$$
f(x_0+h)
=
T_{n-1}(x_0+h)+\frac{f^{(n)}(x_0)}{n!}h^n
+\frac{f^{(n+1)}(x_0)}{(n+1)!}h^{n+1}+o(h^{n+1}).
$$

题目给出的展开式是

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

两边除以 $h$：

$$
f^{(n+1)}(x_0)\theta_h+o(1)
=
\frac{f^{(n+1)}(x_0)}{n+1}+o(1).
$$

由于 $f^{(n+1)}(x_0)\ne0$，两边除以它，再令 $h\to0$，得

$$
\lim_{h\to0}\theta_h=\frac{1}{n+1}.
$$

> 题中的展开式是“展开到 $n$ 阶”：多项式部分到 $n-1$ 次，余项用 $f^{(n)}$ 在中间点的值。不要把它和“展开到 $n+1$ 阶、余项用 $f^{(n+1)}$”的公式混淆。
>
> 这里的中间点形式是 $n-1$ 次 Taylor 多项式加上含 $f^{(n)}$ 的余项。$f^{(n+1)}(x_0)$ 存在，已蕴含 $f^{(n)}$ 在该点附近有定义、在该点可导；本题不需额外假设 $f^{(n+1)}$ 在邻域连续。

## 第 8 题

<!-- homework-topic: 由 $f\left(\dfrac13\right)=1$ 与 $x=\dfrac13$ 处取极大值确定 $f(x)=axe^{bx}$ 的 $a,b$ -->

设 $f(x)=axe^{bx}$，试确定常数 $a,b$，使得 $f\left(\dfrac13\right)=1$，且函数在 $x=\dfrac13$ 处有极大值。

**补充解答**

求导：

$$
f'(x)=ae^{bx}+axbe^{bx}=ae^{bx}(1+bx).
$$

因为 $f$ 在 $x=\dfrac13$ 处有极大值，且 $f$ 处处可导，由 Fermat 定理，

$$
f'\left(\frac13\right)=0.
$$

即

$$
ae^{b/3}\left(1+\frac b3\right)=0.
$$

又 $f\left(\dfrac13\right)=1\ne0$，所以 $a\ne0$，$e^{b/3}\ne0$，故

$$
1+\frac b3=0,
\qquad
b=-3.
$$

再由 $f\left(\dfrac13\right)=1$：

$$
a\cdot\frac13\cdot e^{-1}=1,
\qquad
a=3e.
$$

所以

$$
a=3e,\qquad b=-3.
$$

验证：此时

$$
f''(x)=abe^{bx}(2+bx).
$$

在 $x=\dfrac13$ 处，

$$
f''\left(\frac13\right)
=
3e\cdot(-3)\cdot e^{-1}\left(2-1\right)
=
-9<0,
$$

所以 $x=\dfrac13$ 确实是严格极大值点。

## 第 9 题

<!-- homework-topic: 证明严格下凸函数在 $[a,b]$ 上的最大值只在端点取得，且切线在曲线下方 -->

设 $f(x)$ 在 $[a,b]$ 上连续，且为严格下凸函数，证明：

(1) 在 $[a,b]$ 上函数 $f(x)$ 只可能在端点处达到最大值；

(2) 若 $f(x)$ 可导，则曲线 $y=f(x)$ 上每点处的切线 $y=g(x)$ 均在曲线下方（$g\le f$）。

**补充解答**

### (1)

任取内部点 $x_0\in(a,b)$。存在 $t\in(0,1)$，使得

$$
x_0=(1-t)a+tb.
$$

由严格下凸性，

$$
f(x_0)
<
(1-t)f(a)+tf(b)
\le
\max\{f(a),f(b)\}.
$$

所以 $f(x_0)$ 严格小于端点的最大值，$x_0$ 不可能是最大值点。因此最大值只能在端点 $a$ 或 $b$ 处达到。

### (2)

设 $x_0\in(a,b)$，切线为

$$
g(x)=f(x_0)+f'(x_0)(x-x_0).
$$

先看 $x>x_0$。对任意 $y\in(x_0,x)$，由下凸性（定理 1 的三项不等式），

$$
\frac{f(y)-f(x_0)}{y-x_0}
\le
\frac{f(x)-f(x_0)}{x-x_0}.
$$

令 $y\to x_0^+$，得

$$
f'(x_0)\le\frac{f(x)-f(x_0)}{x-x_0}.
$$

两边乘以 $x-x_0>0$：

$$
f(x)\ge f(x_0)+f'(x_0)(x-x_0)=g(x).
$$

再看 $x<x_0$。同样由下凸性，

$$
\frac{f(x)-f(x_0)}{x-x_0}
\le f'(x_0).
$$

因为 $x-x_0<0$，两边乘以 $x-x_0$ 时不等号反向：

$$
f(x)-f(x_0)\ge f'(x_0)(x-x_0),
$$

即

$$
f(x)\ge g(x).
$$

所以对任意 $x\in[a,b]$，都有 $g(x)\le f(x)$，即切线在曲线下方。严格下凸时，$x\ne x_0$ 时不等式严格。

> 端点处的切线用相应的单侧导数理解；结论仍然成立。

## 第 10 题

<!-- homework-topic: 证明六个不等式（含 $x>2\ln x$、$\cos x>1-\dfrac{x^2}{2}$ 与 Jensen 型不等式） -->

证明下列不等式。

### (1) $x>2\ln x\quad(x>0)$

**补充解答**

令

$$
f(x)=x-2\ln x,\qquad x>0.
$$

则

$$
f'(x)=1-\frac2x=\frac{x-2}{x}.
$$

当 $0<x<2$ 时 $f'(x)<0$，$f$ 严格减少；当 $x>2$ 时 $f'(x)>0$，$f$ 严格增加。所以 $f$ 在 $x=2$ 处取得最小值：

$$
f(2)=2-2\ln2>0
$$

（因为 $\ln2<1$）。因此对任意 $x>0$，

$$
x-2\ln x>0,
$$

即

$$
x>2\ln x.
$$

### (2) $\cos x>1-\dfrac{x^2}{2}\quad(x\ne0)$

**补充解答**

令

$$
f(x)=\cos x-1+\frac{x^2}{2}.
$$

则

$$
f'(x)=-\sin x+x=x-\sin x,
\qquad
f''(x)=1-\cos x\ge0.
$$

所以 $f'$ 单调增加。又 $f'(0)=0$，因此：

- 当 $x<0$ 时，$f'(x)<0$；
- 当 $x>0$ 时，$f'(x)>0$。

于是 $f$ 在 $x=0$ 处取得严格最小值，且 $f(0)=0$。所以当 $x\ne0$ 时，

$$
f(x)>0,
$$

即

$$
\cos x>1-\frac{x^2}{2}.
$$

### (3) $x>\ln(1+x)>x-\dfrac{x^2}{2}\quad(x>0)$

**补充解答**

由 $\ln(1+x)$ 的 Lagrange 余项展开。存在 $\xi\in(0,x)$，使得

$$
\ln(1+x)=x-\frac{x^2}{2(1+\xi)^2}.
$$

因为 $\dfrac{x^2}{2(1+\xi)^2}>0$，所以

$$
\ln(1+x)<x.
$$

再展开到二阶。存在 $\eta\in(0,x)$，使得

$$
\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3(1+\eta)^3}.
$$

因为 $\dfrac{x^3}{3(1+\eta)^3}>0$，所以

$$
\ln(1+x)>x-\frac{x^2}{2}.
$$

合起来：

$$
x>\ln(1+x)>x-\frac{x^2}{2}.
$$

### (4) $\ln(1+x)\ge\dfrac{\arctan x}{1+x}\quad(x\ge0)$

**补充解答**

令

$$
f(x)=\ln(1+x)-\frac{\arctan x}{1+x},\qquad x\ge0.
$$

则 $f(0)=0$。求导：

$$
\begin{aligned}
f'(x)
&=
\frac1{1+x}
-
\frac{\frac{1}{1+x^2}(1+x)-\arctan x}{(1+x)^2}\\
&=
\frac{(1+x)-\frac{1+x}{1+x^2}+\arctan x}{(1+x)^2}\\
&=
\frac{\frac{(1+x)x^2}{1+x^2}+\arctan x}{(1+x)^2}\\
&=
\frac{x^2}{(1+x)(1+x^2)}+\frac{\arctan x}{(1+x)^2}
\ge0.
\end{aligned}
$$

所以 $f$ 在 $[0,+\infty)$ 上单调增加。又 $f(0)=0$，因此当 $x\ge0$ 时，

$$
f(x)\ge0,
$$

即

$$
\ln(1+x)\ge\frac{\arctan x}{1+x}.
$$

等号在 $x=0$ 处成立。

### (5) $1+x^2\le2^x\quad(0\le x\le1)$（利用第 9 题结论）

**补充解答**

两边取对数。令

$$
f(x)=x\ln2-\ln(1+x^2),\qquad 0\le x\le1.
$$

则 $f(0)=0$，$f(1)=\ln2-\ln2=0$。求导：

$$
f'(x)=\ln2-\frac{2x}{1+x^2},
$$

$$
f''(x)=-\frac{2(1-x^2)}{(1+x^2)^2}\le0
\qquad(0\le x\le1),
$$

且在 $(0,1)$ 内严格小于零。所以 $f$ 在 $[0,1]$ 上是严格上凸函数。

由第 9 题 (1) 的结论用于严格下凸函数 $-f$：$-f$ 在 $[0,1]$ 上的最大值只能在端点处达到。因为

$$
-f(0)=-f(1)=0,
$$

所以对任意 $x\in[0,1]$，

$$
-f(x)\le0,
$$

即

$$
f(x)\ge0.
$$

于是

$$
x\ln2\ge\ln(1+x^2),
$$

由指数函数的单调性，

$$
2^x\ge1+x^2.
$$

等号在 $x=0$ 和 $x=1$ 处成立。

### (6) $x_1\ln x_1+x_2\ln x_2+x_3\ln x_3>-\ln3$

其中 $x_1>x_2>x_3>0$，$x_1+x_2+x_3=1$。

**补充解答**

考察函数

$$
f(x)=x\ln x,\qquad x>0.
$$

则

$$
f'(x)=\ln x+1,
\qquad
f''(x)=\frac1x>0.
$$

所以 $f$ 在 $(0,+\infty)$ 上是严格下凸函数。取

$$
\lambda_1=\lambda_2=\lambda_3=\frac13,
$$

由 Jensen 不等式，

$$
\frac13\bigl(f(x_1)+f(x_2)+f(x_3)\bigr)
\ge
f\left(\frac{x_1+x_2+x_3}{3}\right)
=
f\left(\frac13\right).
$$

而

$$
f\left(\frac13\right)
=
\frac13\ln\frac13
=
-\frac{\ln3}{3}.
$$

所以

$$
x_1\ln x_1+x_2\ln x_2+x_3\ln x_3
\ge
-\ln3.
$$

等号成立当且仅当

$$
x_1=x_2=x_3=\frac13.
$$

但题设 $x_1>x_2>x_3$，三者不全相等，所以等号不能成立。因此

$$
x_1\ln x_1+x_2\ln x_2+x_3\ln x_3>-\ln3.
$$

## 第 11 题

<!-- homework-topic: 作出 $y=\dfrac{x^2}{1+x}$ 的图形并写出全部特征 -->

画出函数

$$
y=\frac{x^2}{1+x}
$$

的图形（需体现函数各特征要素）。

**补充解答**

先做多项式除法：

$$
\frac{x^2}{1+x}
=
x-1+\frac{1}{x+1}.
$$

**定义域**：$x\ne-1$。

**渐近线**：

- 垂直渐近线 $x=-1$。当 $x\to-1^+$ 时，$y\to+\infty$；当 $x\to-1^-$ 时，$y\to-\infty$。
- 斜渐近线 $y=x-1$。因为
  $$
  y-(x-1)=\frac{1}{x+1}\to0\qquad(x\to\pm\infty).
  $$
  当 $x>-1$ 时，$\dfrac{1}{x+1}>0$，曲线在斜渐近线上方；当 $x<-1$ 时，曲线在斜渐近线下方。

**一阶导数**：

$$
y'=\frac{x(x+2)}{(x+1)^2}.
$$

驻点为 $x=-2$ 和 $x=0$。列表：

| 区间 | $(-\infty,-2)$ | $x=-2$ | $(-2,-1)$ | $(-1,0)$ | $x=0$ | $(0,+\infty)$ |
|---|---|---|---|---|---|---|
| $y'$ | $+$ | $0$ | $-$ | $-$ | $0$ | $+$ |
| $y$ | 增加 | 极大 | 减少 | 减少 | 极小 | 增加 |

函数值：

$$
y(-2)=\frac{4}{-1}=-4,
\qquad
y(0)=0.
$$

所以 $x=-2$ 是极大值点，极大值为 $-4$；$x=0$ 是极小值点，极小值为 $0$。

**二阶导数**：

$$
y''=\frac{2}{(x+1)^3}.
$$

当 $x<-1$ 时，$y''<0$，曲线在上凸（凹向下）；当 $x>-1$ 时，$y''>0$，曲线在下凸（凹向上）。$x=-1$ 不在定义域内，所以没有拐点。

**截距**：曲线过原点 $(0,0)$。

**作图要点**：

- 左支（$x<-1$）：从 $x\to-\infty$ 时的 $y\to-\infty$ 开始，在斜渐近线下方上升，到 $(-2,-4)$ 处达到极大，再下降，当 $x\to-1^-$ 时趋于 $-\infty$。
- 右支（$x>-1$）：当 $x\to-1^+$ 时从 $+\infty$ 下降，经过 $(0,0)$ 处达到极小，再上升，当 $x\to+\infty$ 时从上方逼近斜渐近线 $y=x-1$。

按上述渐近线、单调区间、极值点和凹凸性即可画出图形。

## 第 12 题

<!-- homework-topic: 求两光源连线上照度最小的点 -->

设有光强度为 $a$ 与 $b$ 的两个光源，它们之间的距离是 $d$。假定照度与光强度成正比而与距离的平方成反比。试问在两光源的连接线上什么地方其光的照度最小？

**补充解答**

设该点距光源 $a$ 为 $x$，则距光源 $b$ 为 $d-x$。按题意取两光源之间的线段，$0\le x\le d$。总照度（略去公共比例常数）为

$$
E(x)=\frac{a}{x^2}+\frac{b}{(d-x)^2},
\qquad 0<x<d.
$$

当 $x\to0^+$ 或 $x\to d^-$ 时，$E(x)\to+\infty$，所以最小值在内部取得。求导：

$$
E'(x)=-\frac{2a}{x^3}+\frac{2b}{(d-x)^3}.
$$

令 $E'(x)=0$：

$$
\frac{a}{x^3}=\frac{b}{(d-x)^3}.
$$

于是

$$
\left(\frac{d-x}{x}\right)^3=\frac{b}{a},
\qquad
\frac{d-x}{x}=\left(\frac{b}{a}\right)^{1/3}.
$$

解得

$$
x=\frac{d\,a^{1/3}}{a^{1/3}+b^{1/3}},
\qquad
d-x=\frac{d\,b^{1/3}}{a^{1/3}+b^{1/3}}.
$$

又

$$
E''(x)=\frac{6a}{x^4}+\frac{6b}{(d-x)^4}>0,
$$

所以该点确为最小值点。

因此，当该点距光源 $a$ 为

$$
\frac{d\,a^{1/3}}{a^{1/3}+b^{1/3}},
$$

距光源 $b$ 为

$$
\frac{d\,b^{1/3}}{a^{1/3}+b^{1/3}}
$$

时，照度最小。

> 若把“连接线”理解为整条直线，则当点趋于无穷远时照度趋于 $0$，不存在最小值；本题通常指两光源之间的线段。

## 第 13 题

<!-- homework-topic: 求 $y$ 轴上点 $(0,b)$ 到抛物线 $x^2=4y$ 的最短距离 -->

求由 $y$ 轴上的一个给定点 $(0,b)$ 到抛物线 $x^2=4y$ 上的点的最短距离。

**补充解答**

抛物线上的点可写成

$$
\left(x,\frac{x^2}{4}\right),\qquad x\in\mathbb R.
$$

它到 $(0,b)$ 的距离平方为

$$
D(x)=x^2+\left(\frac{x^2}{4}-b\right)^2.
$$

令 $t=x^2\ge0$，则

$$
D(t)=t+\left(\frac t4-b\right)^2
=
\frac{t^2}{16}+\left(1-\frac b2\right)t+b^2.
$$

这是关于 $t$ 的二次函数，开口向上，顶点在

$$
t=-\frac{1-\frac b2}{2\cdot\frac1{16}}
=
4(b-2).
$$

分两种情况：

**情形 1：$b\ge2$。** 此时 $t=4(b-2)\ge0$，最小值在

$$
x^2=4(b-2),\qquad y=\frac{x^2}{4}=b-2
$$

处取得。最小距离平方为

$$
D_{\min}=4(b-1),
$$

所以最短距离为

$$
2\sqrt{b-1}.
$$

**情形 2：$b<2$。** 此时顶点 $t=4(b-2)<0$，而 $t\ge0$，所以 $D(t)$ 在 $[0,+\infty)$ 上单调增加，最小值在 $t=0$ 处取得，即抛物线顶点 $(0,0)$。最短距离为

$$
|b|.
$$

当 $b=2$ 时，两种情形给出同一点 $(0,0)$，距离为 $2$，公式一致。

## 第 14 题

<!-- homework-topic: 证明 $|\sin b-\sin a|\le|b-a|$ 与对数平均不等式 -->

证明不等式：

### (1) $|\sin b-\sin a|\le|b-a|$

**补充解答**

若 $a=b$，显然成立。若 $a\ne b$，由 Lagrange 中值定理，存在 $\xi$ 介于 $a,b$ 之间，使得

$$
\sin b-\sin a=\cos\xi\,(b-a).
$$

两边取绝对值：

$$
|\sin b-\sin a|
=
|\cos\xi|\,|b-a|
\le
|b-a|.
$$

### (2) $\dfrac{a-b}{a}<\ln\dfrac ab<\dfrac{a-b}{b}\quad(a>b>0)$

**补充解答**

令

$$
x=\frac ab>1.
$$

则

$$
\ln\frac ab=\ln x,
\qquad
\frac{a-b}{a}=1-\frac1x,
\qquad
\frac{a-b}{b}=x-1.
$$

所以只需证明：当 $x>1$ 时，

$$
1-\frac1x<\ln x<x-1.
$$

对函数 $\ln t$ 在区间 $[1,x]$ 上用 Lagrange 中值定理。存在 $\xi\in(1,x)$，使得

$$
\ln x=\frac{\ln x-\ln1}{x-1}(x-1)=\frac{x-1}{\xi}.
$$

因为 $1<\xi<x$，所以

$$
\frac1x<\frac1\xi<1.
$$

两边乘以 $x-1>0$：

$$
\frac{x-1}{x}<\frac{x-1}{\xi}<x-1,
$$

即

$$
1-\frac1x<\ln x<x-1.
$$

代回 $x=\dfrac ab$，得

$$
\frac{a-b}{a}<\ln\frac ab<\frac{a-b}{b}.
$$

## 第 15 题

<!-- homework-topic: 证明非线性函数 $f$（$f(0)=0,f(1)=1$）在 $(0,1)$ 内有 $f'(\xi)>1$ -->

设函数 $f(x)\in C[0,1]$，在 $(0,1)$ 内可导，且 $f(0)=0$，$f(1)=1$。又设 $f(x)$ 是 $x$ 的非线性函数。求证：在 $(0,1)$ 内至少存在一点 $\xi$，使得 $f'(\xi)>1$。

**补充解答**

用反证法。假设对任意 $x\in(0,1)$，都有

$$
f'(x)\le1.
$$

令

$$
g(x)=f(x)-x,\qquad 0\le x\le1.
$$

则 $g$ 在 $[0,1]$ 上连续，在 $(0,1)$ 内可导，且

$$
g(0)=f(0)-0=0,
\qquad
g(1)=f(1)-1=0,
$$

$$
g'(x)=f'(x)-1\le0.
$$

所以 $g$ 在 $[0,1]$ 上单调不增。由 $g(0)=0$，得

$$
g(x)\le0,\qquad 0\le x\le1.
$$

又由 $g(1)=0$ 且 $g$ 单调不增，对 $0\le x\le1$，有

$$
g(x)\ge g(1)=0.
$$

于是

$$
g(x)=0,\qquad 0\le x\le1,
$$

即

$$
f(x)=x,\qquad 0\le x\le1.
$$

这与 $f(x)$ 是 $x$ 的非线性函数矛盾。因此假设不成立，必存在 $\xi\in(0,1)$，使得

$$
f'(\xi)>1.
$$
