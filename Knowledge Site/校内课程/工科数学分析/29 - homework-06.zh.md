---
slug: "29-homework-06"
title: "第 6 次作业（洛必达法则与中值定理）"
summary: "第 6 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "homework"
displayNumber: "06"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "第6次作业.jpg"
    url: "https://drive.google.com/file/d/1N5IahoyGuFugVMARVO99YvuQXVtrBPM1/view?usp=drivesdk"
  - kind: article
    title: "第6次作业解答.pdf"
    url: "https://drive.google.com/file/d/1sAVAoqbSBokIT2QOCibtbvOG2gFiX7Cs/view?usp=drivesdk"
---

## 第 1 题

<!-- homework-topic: 由 $x=e^y+y$ 求 $\dfrac{d^2y}{dx^2}$（用 $y$ 表示） -->

已知 $x=e^y+y$，求 $\dfrac{d^2y}{dx^2}$（用含 $y$ 的式子表达）。

**解析**

把 $y$ 看作 $x$ 的函数，对等式两边关于 $x$ 求导：

$$
1=e^yy'+y',
\qquad
y'=\frac{1}{e^y+1}.
$$

上面第一个式子两边对 $x$ 求一次导（注意 $y,y'$ 是 $x$ 的函数）：

$$
0=e^y y'^2+e^y y''+y'',
$$

解得

$$
y''=-\frac{e^y y'^2}{e^y+1}
=-\frac{e^y}{(e^y+1)^3}.
$$

> **注意**：求导时把 $y$ 看作 $x$ 的函数，第二次求导不能漏掉 $(y')^2$。也可从 $y'=1/(e^y+1)$ 出发，用链式法则直接求二阶导数。

## 第 2 题

<!-- homework-topic: 求六个函数的极限（含 $1^\infty$、$0^0$ 与差式通分） -->

求下列极限：

### (1) $\displaystyle\lim_{x\to0}\left(\frac1{\sin x}-\frac1x\right)$

**解析**

$$
\lim_{x\to0}\left(\frac1{\sin x}-\frac1x\right)
=
\lim_{x\to0}\frac{x-\sin x}{x\sin x}
=
\lim_{x\to0}\frac{x-\sin x}{x^2}
=
\lim_{x\to0}\frac{1-\cos x}{2x}
=
\lim_{x\to0}\frac{\sin x}{2}
=0.
$$

### (2) $\displaystyle\lim_{x\to0}\left[\frac1{\ln(1+x)}-\frac1x\right]$

**解析**

$$
\lim_{x\to0}\left[\frac1{\ln(1+x)}-\frac1x\right]
=
\lim_{x\to0}\frac{x-\ln(1+x)}{x\ln(1+x)}
=
\lim_{x\to0}\frac{x-\ln(1+x)}{x^2}
=
\lim_{x\to0}\frac{1-\frac1{1+x}}{2x}
=
\lim_{x\to0}\frac{1}{2(1+x)}
=\frac12.
$$

### (3) $\displaystyle\lim_{x\to1}(1-x)\tan\frac{\pi x}{2}$

**解析**

$$
\lim_{x\to1}(1-x)\tan\frac{\pi x}{2}
=
\lim_{x\to1}\frac{(1-x)\sin\frac{\pi x}{2}}{\cos\frac{\pi x}{2}}
=
\lim_{x\to1}\frac{1-x}{\cos\frac{\pi x}{2}}
=
\lim_{x\to1}\frac{-1}{-\frac{\pi}{2}\sin\frac{\pi x}{2}}
=\frac{2}{\pi}.
$$

> **补充说明**：第三步能去掉因子 $\sin\dfrac{\pi x}{2}$，是因为它趋于 $\sin\dfrac{\pi}{2}=1$，属于非零的极限因子，可以分离出来单独求极限。剩下的 $\dfrac{1-x}{\cos\frac{\pi x}{2}}$ 为 $\dfrac00$ 型，分母导数在 $x=1$ 附近不为零，满足洛必达法则的条件。

### (4) $\displaystyle\lim_{x\to1}\frac{x-x^x}{1-x+\ln x}$

**思路**：代入 $x=1$ 得到 $0/0$ 型，可用 **洛必达法则**。难点在 $x^x$ 的求导：先写成 $e^{x\ln x}$，得到 $(x^x)'=x^x(1+\ln x)$。第一次求导后，把分子、分母同乘 $x$，将分母化为 $1-x$，再求导时就简单得多。

**解析**

$$
\begin{aligned}
\lim_{x\to1}\frac{x-x^x}{1-x+\ln x}
&=
\lim_{x\to1}\frac{1-x^x(1+\ln x)}{-1+\frac1x}\\
&=
\lim_{x\to1}\frac{x-x^{x+1}(1+\ln x)}{1-x}\\
&=
\lim_{x\to1}\frac{1-x^x-x^{x+1}(1+\ln x)\left(1+\ln x+\frac1x\right)}{-1}\\
&=\frac{-2}{-1}=2.
\end{aligned}
$$

> **补充说明**：第三步的分子是把上一式上下同乘 $x$ 得到的，$x\left[1-x^x(1+\ln x)\right]=x-x^{x+1}(1+\ln x)$。对 $x^{x+1}(1+\ln x)$ 用乘积法则时，先把 $x^{x+1}=e^{(x+1)\ln x}$ 求导得 $x^{x+1}\left(\ln x+1+\frac1x\right)$，于是
>
> $$
> \left[x^{x+1}(1+\ln x)\right]'=x^{x+1}(1+\ln x)\left(1+\ln x+\frac1x\right)+x^{x},
> $$
>
> 最后一项来自 $x^{x+1}\cdot\dfrac1x=x^x$。在 $x=1$ 处它等于 $2+1=3$，故分子导数为 $1-3=-2$，分母 $(1-x)'=-1$，商为 $2$。

### (5) $\displaystyle\lim_{x\to+\infty}\left(\frac{\pi}{2}-\arctan x\right)^{1/x}$

**思路**：底数趋于 0、指数也趋于 0，是 $0^0$ 待定型，先用 $u^v=e^{v\ln u}$ **取对数**。令 $t=\pi/2-\arctan x$，就有 $x=\cot t$、$1/x=\tan t$，指数化为 $\tan t\ln t$。再用 $\tan t\sim t$ 和 $t\ln t=\ln t/(1/t)\to0$，最后取指数。后一极限可由 **洛必达法则**得到。

**解析**

令 $t=\dfrac{\pi}{2}-\arctan x$，则 $x\to+\infty$ 时 $t\to0^+$，且 $x=\tan\left(\dfrac{\pi}{2}-t\right)$，所以 $\dfrac1x=\tan t$。于是

$$
\begin{aligned}
\lim_{x\to+\infty}\left(\frac{\pi}{2}-\arctan x\right)^{1/x}
&=
\exp\left[\lim_{t\to0^+}\frac{1}{\tan\left(\frac{\pi}{2}-t\right)}\ln t\right]\\
&=
\exp\left[\lim_{t\to0^+}\tan t\ln t\right]\\
&=
\exp\left[\lim_{t\to0^+}t\ln t\right]
=e^0=1.
\end{aligned}
$$

### (6) $\displaystyle\lim_{x\to0}x\cot2x$

**解析**

$$
\lim_{x\to0}x\cot2x
=
\lim_{x\to0}\frac{x\cos2x}{\sin2x}
=\frac12.
$$

**关键条件与易错点**：$\sin2x\sim2x$ 是 $x\to0$ 时的等价无穷小；不要漏掉因子 2，否则会得到 1。

> **易错点**：等价无穷小不能直接替换差中的某一项；$(x^x)'=x^x(1+\ln x)$；幂式极限可先取对数，或换元后处理。

## 第 3 题

<!-- homework-topic: 指出 $\dfrac{x+\sin x}{x-\sin x}$ 一题中洛必达法则误用之处并给出正确解法 -->

下面极限求解中，应用洛必达法则错在何处：

$$
\lim_{x\to+\infty}\frac{x+\sin x}{x-\sin x}
=
\lim_{x\to+\infty}\frac{1+\cos x}{1-\cos x}
=
\lim_{x\to+\infty}\frac{-\sin x}{\sin x}
=-1.
$$

**解析**

在

$$
\lim_{x\to+\infty}\frac{1+\cos x}{1-\cos x}
=
\lim_{x\to+\infty}\frac{-\sin x}{\sin x}
$$

中，不满足洛必达法则的条件，因为

$$
\lim_{x\to+\infty}\frac{1+\cos x}{1-\cos x}
$$

不是未定式 $\dfrac00$ 或 $\dfrac{\infty}{\infty}$。

本题正确解答如下：

$$
\lim_{x\to+\infty}\frac{x+\sin x}{x-\sin x}
=
\lim_{x\to+\infty}\frac{1+\frac{\sin x}{x}}{1-\frac{\sin x}{x}}
=
\frac{1+0}{1-0}=1.
$$

> **注意**：第一次使用洛必达还需检查分母导数的非零条件。这里直接同除以 $x$ 最稳妥；导数比的极限不存在，不代表原极限不存在。

## 第 4 题

<!-- homework-topic: 由系数和 $\sum\dfrac{a_k}{k+1}=0$ 证明多项式在 $(0,1)$ 内有零点（Rolle 定理） -->

证明：若

$$
\frac{a_0}{1}+\frac{a_1}{2}+\cdots+\frac{a_n}{n+1}=0,
$$

则对于区间 $[0,1]$ 内的某个 $x$，有

$$
a_0+a_1x+\cdots+a_nx^n=0.
$$

**思路**：结论要证明一个多项式有零点，但题设给出的却是带有 $1/(k+1)$ 的系数和。这提示我们把多项式“还原”为某个函数的导数：$x^{k+1}/(k+1)$ 的导数正好是 $x^k$。这样题设就变成辅助函数在 0、1 两端取值相同，再用 **Rolle 定理**得到导数的零点。

**解析**

考虑函数

$$
f(x)=\frac{a_0}{1}x+\frac{a_1}{2}x^2+\cdots+\frac{a_n}{n+1}x^{n+1},
\qquad x\in[0,1].
$$

则有

$$
f(0)=0,\qquad
f(1)=\frac{a_0}{1}+\frac{a_1}{2}+\cdots+\frac{a_n}{n+1}=0.
$$

由罗尔定理可得：存在 $x\in(0,1)$，使得 $f'(x)=0$，即

$$
a_0+a_1x+\cdots+a_nx^n=0.
$$

## 第 5 题

<!-- homework-topic: 证明 $e^x=ax^2+bx+c$ 的根不超过三个 -->

求证：方程 $e^x=ax^2+bx+c$ 的根不超过三个。

**思路**：要限制零点个数，可以用 **Rolle 定理**把“函数有很多零点”逐步转化成“高阶导数有零点”。右边是二次多项式，求三次导数后多项式消失，只剩始终不为零的 $-e^x$。因此反设有四个不同零点，连续三次应用 Rolle 定理就会产生矛盾。

**解析**

用反证法，假设方程至少有四个根：

$$
x_1<x_2<x_3<x_4.
$$

记

$$
f(x)=ax^2+bx+c-e^x,
$$

则

$$
f(x_1)=f(x_2)=f(x_3)=f(x_4)=0.
$$

由罗尔定理，存在

$$
y_1\in(x_1,x_2),\quad y_2\in(x_2,x_3),\quad y_3\in(x_3,x_4)
$$

满足

$$
f'(y_1)=f'(y_2)=f'(y_3)=0.
$$

继续使用罗尔定理，存在

$$
z_1\in(y_1,y_2),\quad z_2\in(y_2,y_3)
$$

满足

$$
f''(z_1)=f''(z_2)=0.
$$

再次由罗尔定理可得，存在 $\xi\in(z_1,z_2)$ 满足

$$
f'''(\xi)=0.
$$

而

$$
f'''(x)=(ax^2+bx+c-e^x)'''=-e^x<0,
$$

从而导出矛盾。假设不成立，方程的根不超过三个。

## 第 6 题

<!-- homework-topic: 由 $g(0)=g'(0)=0$、$g''(0)=17$ 求 $f'(0)$，其中 $f(x)=g(x)/x\ (x\ne0)$ -->

设

$$
f(x)=
\begin{cases}
\dfrac{g(x)}{x}, & x\ne0,\\[4pt]
0, & x=0,
\end{cases}
$$

并设 $g(0)=g'(0)=0$，$g''(0)=17$。求 $f'(0)$。

**思路**：求的是分段点 $x=0$ 处的导数，必须先用 **导数定义**，不能直接把 $x\ne0$ 时的求导公式代入 0。代入定义后得到 $g(x)/x^2$，用一次 **洛必达法则**将它变成 $g'(x)/(2x)$；再利用 $g'(0)=0$，把剩下的极限认成 $g''(0)$ 的定义。

**解析**

首先 $f(x)$ 在 $x=0$ 处是连续的。由 $g(0)=0$，差商

$$
\frac{g(x)-g(0)}{x-0}=\frac{g(x)}{x}\longrightarrow g'(0)=0\qquad(x\to0),
$$

这正是导数的定义，故 $\lim\limits_{x\to0}f(x)=0=f(0)$。这里不必用洛必达法则：$g'(x)$ 在 $0$ 附近是否存在、是否有极限都还没有保证，而导数的定义只用到 $g'(0)$ 本身。

下面计算 $f'(0)$，由极限定义

$$
f'(0)
=
\lim_{x\to0}\frac{f(x)-f(0)}{x-0}
=
\lim_{x\to0}\frac{f(x)}{x}
=
\lim_{x\to0}\frac{g(x)}{x^2}.
$$

利用一次洛必达法则和一次导数定义计算可得：

$$
f'(0)
=
\lim_{x\to0}\frac{g(x)}{x^2}
=
\lim_{x\to0}\frac{g'(x)}{2x}
=
\frac12\lim_{x\to0}\frac{g'(x)-g'(0)}{x-0}
=
\frac12g''(0)
=
\frac{17}{2}.
$$

**注意**：计算 $\lim_{x\to0}g'(x)/(2x)$ 时，应改用导数定义；题设未保证 $g''(x)$ 在附近存在，不能再次使用洛必达法则。

> **注意**：只知道 $g''(0)$ 存在，不能保证 $g''(x)$ 在附近存在。一次洛必达后出现的极限应改用导数定义，不能继续对 $g'$ 求导。

## 第 7 题

<!-- homework-topic: 证明 $f$ 的两个零点之间存在 $f+f'$ 的零点 -->

设 $f(x)$ 可导，求证：在 $f(x)$ 的两个零点之间必有 $f(x)+f'(x)$ 的零点。

**思路**：已有 $f$ 的两个零点，适合用 **Rolle 定理**；但目标是 $f+f'$ 的零点，不能直接对 $f$ 使用定理。先找一个导数中含有 $f+f'$ 的辅助函数。由 **乘积求导法则**，$(e^xf)'=e^x(f+f')$，而乘以 $e^x$ 又保留了原来的两个零点，因此选择 $g=e^xf$。

**解析**

设 $f(x_1)=f(x_2)=0$，$x_1<x_2$。考虑函数

$$
g(x)=e^xf(x),
$$

则有 $g(x_1)=g(x_2)=0$。由罗尔定理可得：存在 $\xi\in(x_1,x_2)$，使得 $g'(\xi)=0$，即

$$
e^\xi\bigl(f(\xi)+f'(\xi)\bigr)=0,
$$

从而

$$
f(\xi)+f'(\xi)=0.
$$

结论得证。

## 第 8 题

<!-- homework-topic: 证明导函数 $f'$ 不可能有第一类间断点 -->

设 $f(x)$ 可导，证明：$f'(x)$ 不可能有第一类间断点。

**思路**：第一类间断点要求左右有限极限都存在。要排除它，就证明：只要 $f'$ 的某个单侧有限极限存在，它就必须等于 $f'(x_0)$。连接二者的桥梁是 **Lagrange 中值定理**——它把 $f$ 的差商变成邻近某点的导数；再用 **导数定义**取极限，就能把左右极限都确定为同一个值。

**解析**

用反证法，假设 $f'(x)$ 有第一类间断点 $x_0$，则 $f'(x)$ 在点 $x_0$ 处的左、右极限

$$
f'(x_0^+)=\lim_{x\to x_0^+}f'(x),
\qquad
f'(x_0^-)=\lim_{x\to x_0^-}f'(x)
$$

都存在。

对每个 $h>0$，由 Lagrange 中值定理，存在 $\xi_h\in(x_0,x_0+h)$，使差商等于 $f'(\xi_h)$。因为 $0<\xi_h-x_0<h$，当 $h\to0^+$ 时，$\xi_h\to x_0^+$。于是

$$
f'(x_0)
=
f'_+(x_0)
=
\lim_{h\to0^+}\frac{f(x_0+h)-f(x_0)}{h}
=
\lim_{h\to0^+}f'(\xi_h)
=
\lim_{x\to x_0^+}f'(x)
=
f'(x_0^+).
$$

同理可证：

$$
f'(x_0)=f'_-(x_0)=f'(x_0^-).
$$

综上，

$$
f'(x_0^+)=f'(x_0)=f'(x_0^-),
$$

这说明 $f'(x)$ 在点 $x_0$ 处连续，与 $x_0$ 为第一类间断点矛盾。结论得证。

## 第 9 题

<!-- homework-topic: 证明 $\ln(1+x)=x\cdot\dfrac{1}{1+\theta x}$ 中的 $\theta\to\dfrac12\ (x\to0)$ -->

由拉格朗日中值定理知，

$$
\ln(1+x)-0=x\cdot\frac{1}{1+\theta x}\qquad(0<\theta<1),
$$

证明 $\displaystyle\lim_{x\to0}\theta=\frac12$。

**思路**：中值定理中的 $\theta$ 随 $x$ 变化，不能把它当常数处理。先从等式中解出 $\theta$，会得到 $1/\ln(1+x)-1/x$，这正是第 2 题 (2) 已求过的极限。也可以不引用前题，通分后用 **等价无穷小和洛必达法则**直接计算。

**解析**

根据

$$
\ln(1+x)-0=x\cdot\frac{1}{1+\theta x}
$$

可得

$$
\theta=\frac{x-\ln(1+x)}{x\ln(1+x)}.
$$

利用洛必达法则计算可得：

$$
\lim_{x\to0}\theta
=
\lim_{x\to0}\frac{x-\ln(1+x)}{x\ln(1+x)}
=
\lim_{x\to0}\frac{x-\ln(1+x)}{x^2}
=
\lim_{x\to0}\frac{1-\frac1{1+x}}{2x}
=
\frac12.
$$

结论得证。

## 第 10 题

<!-- homework-topic: 由 $f''(x_0)$ 存在证明二阶差商的极限等于 $f''(x_0)$ -->

设 $f(x)$ 一阶可导，且 $f''(x_0)$ 存在。求证：

$$
\lim_{h\to0}\frac{f(x_0+2h)-2f(x_0+h)+f(x_0)}{h^2}=f''(x_0).
$$

**思路**：分子里的系数 $1,-2,1$ 会抵消常数项和一次项，分母又是 $h^2$，因此应当联系二阶导数。按 **导数定义**的方向处理：先用一次 **洛必达法则**降阶，再把分子拆成两个 $f'$ 的差，凑出 $f''(x_0)$ 的差商。另一条更短的思路是用 **带 Peano 余项的二阶泰勒公式**，直接观察相消后的二阶项。

**解析**

用一次洛必达法则和一次导数定义计算：

$$
\begin{aligned}
&\lim_{h\to0}\frac{f(x_0+2h)-2f(x_0+h)+f(x_0)}{h^2}\\
&\quad=
\lim_{h\to0}\frac{2f'(x_0+2h)-2f'(x_0+h)}{2h}\\
&\quad=
\lim_{h\to0}\frac{\bigl[f'(x_0+2h)-f'(x_0)\bigr]-\bigl[f'(x_0+h)-f'(x_0)\bigr]}{h}\\
&\quad=
2\lim_{h\to0}\frac{f'(x_0+2h)-f'(x_0)}{2h}
-\lim_{h\to0}\frac{f'(x_0+h)-f'(x_0)}{h}\\
&\quad=
2f''(x_0)-f''(x_0)
=f''(x_0).
\end{aligned}
$$

结论得证。

**另一种解法：泰勒展开**

> 本题也可用带皮亚诺余项的泰勒展开式求解：
>
> $$
> f(x_0+2h)=f(x_0)+f'(x_0)(2h)+\frac12f''(x_0)(2h)^2+o(h^2),\qquad h\to0,
> $$
>
> 以及
>
> $$
> f(x_0+h)=f(x_0)+f'(x_0)(h)+\frac12f''(x_0)(h)^2+o(h^2),\qquad h\to0.
> $$
>
> 将展开式代入极限中分式整理化简即得。

> **注意**：$f''(x_0)$ 存在不表示二阶导数在附近处处存在。一次洛必达后应把表达式拆成 $f'$ 的差商；上面的泰勒展开给出了另一条解题思路。

## 本次小结

本次练习主要用到隐函数求导、洛必达法则、辅助函数构造和导数定义。证明存在性时先考虑中值定理；求极限时先判断类型和可导条件，不能因算式复杂就反复求导。

- [微分中值定理与洛必达法则](/books/campus-mathematical-analysis/15-mean-value-theorems-and-lhopital/)
- [返回课程目录](/books/campus-mathematical-analysis/)
