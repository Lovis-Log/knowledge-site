---
slug: "28-homework-05"
title: "第 5 次作业与解析"
summary: "第 5 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "homework"
displayNumber: "05"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "5.jpg"
    url: "https://drive.google.com/file/d/1HRxPM6clRFCRP6yyu0Dvo_z3TymY9adL/view?usp=drivesdk"
  - kind: article
    title: "第5次作业解答.pdf"
    url: "https://drive.google.com/file/d/1eE94yVSM2s1SNUBEV6Adw0pcmHMXB80I/view?usp=drivesdk"
---

本份作业覆盖导数与微分的整块内容：等价无穷小求极限（第 1 题）、公切线（第 2 题，用到导数的几何意义）、隐函数求导与二阶导（第 3 题）、参数方程求导（第 4 题）、极坐标求导（第 5 题）、Leibniz 公式（第 6 题）、用导数求最值（第 7 题）、微分近似（第 8 题）、相关变化率（第 9 题）、二阶导数计算（第 10 题）。题面与解答逐题核对过，十道题全部对应。

---

## 第 1 题

利用等价替换方法求下列极限，其中 $a>0,\ b>0$。

(1) $\displaystyle\lim_{x\to0}\frac{\sqrt[3]{1+x^2}-\cos x}{(\mathrm e^x-1)\ln(1+x)}$；

(2) $\displaystyle\lim_{n\to\infty}n\left(\sqrt[n]{a}-1\right)$；

(3) $\displaystyle\lim_{x\to0}\left(\frac{a^x+b^x}{2}\right)^{\frac1x}$。

**思路** 三小题的分子或分母都是"两个相近的量相减"，直接代换会得到 $0$，要把每个量展开到足够高的阶。(1) 分母 $(e^x-1)\ln(1+x)\sim x^2$，所以分子必须展开到 $x^2$ 项，两个二阶展开相减后一次项抵消，留下 $x^2$ 的系数。(2) 是 $0\cdot\infty$ 型，令 $t=1/n$ 把离散的 $n$ 变成连续变量，凑成 $(a^t-1)/t$。(3) 是 $1^\infty$ 型，先取对数把指数降下来，再用 $\ln(1+u)\sim u$。

**解** (1) 由

$$\sqrt[3]{1+x^2}=1+\frac13x^2+o(x^2),\qquad \cos x=1-\frac12x^2+o(x^2),$$

分子为

$$\left(1+\frac13x^2\right)-\left(1-\frac12x^2\right)+o(x^2)=\frac56x^2+o(x^2).$$

分母

$$(\mathrm e^x-1)\ln(1+x)\sim x\cdot x=x^2 .$$

故

$$\lim_{x\to0}\frac{\sqrt[3]{1+x^2}-\cos x}{(\mathrm e^x-1)\ln(1+x)}=\lim_{x\to0}\frac{\frac56x^2}{x^2}=\frac56 .$$

这里不能把分子两项分别替换成 $1$ 和 $1$，那样会把二阶项一起丢掉，得到 $0$ 的错误结果。等价替换只保证"乘除因子"可以替换，加减时要展开到相消之后的阶。

(2) 令 $t=\dfrac1n$，则 $n\to\infty$ 时 $t\to0^+$，且

$$n\left(\sqrt[n]{a}-1\right)=\frac{a^t-1}{t}=\frac{\mathrm e^{t\ln a}-1}{t}.$$

由 $\mathrm e^u-1\sim u$，分子 $\sim t\ln a$，故

$$\lim_{n\to\infty}n\left(\sqrt[n]{a}-1\right)=\ln a .$$

(3) 记 $L$ 为所求极限。先取对数：

$$\ln L=\lim_{x\to0}\frac1x\ln\frac{a^x+b^x}{2}=\lim_{x\to0}\frac1x\ln\left(1+\frac{a^x+b^x-2}{2}\right).$$

由 $a^x-1\sim x\ln a$、$b^x-1\sim x\ln b$，

$$\frac{a^x+b^x-2}{2}=\frac{(a^x-1)+(b^x-1)}{2}\sim\frac{x(\ln a+\ln b)}{2}\to0 .$$

再用 $\ln(1+u)\sim u$：

$$\ln L=\lim_{x\to0}\frac1x\cdot\frac{x(\ln a+\ln b)}{2}=\frac{\ln a+\ln b}{2}=\ln\sqrt{ab}.$$

故

$$L=\sqrt{ab}.$$

答案是几何平均，不是算术平均。可以这样检查：$a=b$ 时底数恒为 $a$，极限应为 $a$，而 $\sqrt{ab}=a$，相符。

---

## 第 2 题

求一条直线，使它同时与 $f(x)=x^2$ 和 $g(x)=x^2-2x$ 的图形相切。

**思路** 一条直线要同时是两条曲线的切线，需要两个条件：斜率等于两条曲线在各自切点处的导数；并且这条直线在两条曲线上是"同一条"，即截距相同。所以设两个切点，列出斜率和截距两组方程。

**解** 设直线与 $f$ 切于 $A(x_1,x_1^2)$，与 $g$ 切于 $B(x_2,x_2^2-2x_2)$。

切线斜率条件：

$$2x_1=2x_2-2 . \tag{1}$$

$f$ 在 $A$ 处的切线为 $y=2x_1x-x_1^2$，$g$ 在 $B$ 处的切线为

$$y=(2x_2-2)x-x_2^2 .$$

两线重合，截距相等：

$$-x_1^2=-x_2^2\ \Longrightarrow\ x_1=\pm x_2 . \tag{2}$$

由 (1)，$x_1=x_2-1$。若 $x_1=x_2$，则 $x_2=x_2-1$，矛盾；故 $x_1=-x_2$，代入 (1)：

$$-x_2=2x_2-2\ \Longrightarrow\ x_2=\frac12,\qquad x_1=-\frac12 .$$

斜率为 $k=2x_1=-1$。切点为

$$A\left(-\frac12,\frac14\right),\qquad B\left(\frac12,-\frac34\right).$$

直线方程

$$y-\frac14=-\left(x+\frac12\right),\qquad \text{即}\quad y=-x-\frac14 .$$

验证：与 $f$ 联立得 $x^2=-x-\frac14$，即 $\left(x+\frac12\right)^2=0$，只有一个交点；与 $g$ 联立得 $x^2-2x=-x-\frac14$，即 $\left(x-\frac12\right)^2=0$，也只有一个交点。两条曲线开口相同、顶点相差 $(1,-1)$，公切线正好夹在两者之间。

---

## 第 3 题

设 $y=y(x)$ 由方程 $\mathrm e^y+xy=\mathrm e$ 确定。

(1) 求 $y'$ 与 $y''$，结果用 $x,y$ 表示；

(2) 求曲线在点 $(0,1)$ 处的 $y'(0)$ 与 $y''(0)$。

**思路** 隐函数求导：$y$ 是 $x$ 的函数，遇到 $y$ 就用链式法则。求二阶导时不要试图直接对 $y'$ 的商式求导，那会很繁琐；正确做法是对一阶导所满足的等式再求一次导，得到含 $y''$ 的线性方程，解出 $y''$，最后代回 $y'$。

**解** (1) 两边对 $x$ 求导：

$$\mathrm e^yy'+y+xy'=0 . \tag{1}$$

解出

$$y'=-\frac{y}{\mathrm e^y+x}. \tag{2}$$

对 (1) 再求导，注意 $y,y'$ 都是 $x$ 的函数：

$$\mathrm e^y(y')^2+\mathrm e^yy''+y'+y'+xy''=0 .$$

即

$$y''\left(\mathrm e^y+x\right)=-\left(\mathrm e^y(y')^2+2y'\right),$$

$$y''=-\frac{\mathrm e^y(y')^2+2y'}{\mathrm e^y+x}. \tag{3}$$

把 (2) 代入 (3)：

$$
\begin{aligned}
y''&=-\frac{\mathrm e^y\dfrac{y^2}{(\mathrm e^y+x)^2}-\dfrac{2y}{\mathrm e^y+x}}{\mathrm e^y+x}\\
&=\frac{2y(\mathrm e^y+x)-\mathrm e^yy^2}{(\mathrm e^y+x)^3}.
\end{aligned}
$$

(2) 点 $(0,1)$ 满足方程：$\mathrm e^1+0=\mathrm e$。代入 (2)、(3)：

$$y'(0)=-\frac{1}{\mathrm e+0}=-\frac1{\mathrm e},$$

$$y''(0)=\frac{2\cdot1\cdot(\mathrm e+0)-\mathrm e\cdot1^2}{(\mathrm e+0)^3}=\frac{2\mathrm e-\mathrm e}{\mathrm e^3}=\frac{1}{\mathrm e^2}.$$

也可以直接把 $x=0,y=1,y'=-1/\mathrm e$ 代入 (3) 求 $y''(0)$，结果相同。先代值再算通常比先化简整式更省事。

---

## 第 4 题

设曲线由参数方程 $x=\ln(1+t^2),\ y=t-\arctan t\ (t\in\mathbb R)$ 确定。求 $\dfrac{\mathrm dy}{\mathrm dx}$ 与 $\dfrac{\mathrm d^2y}{\mathrm dx^2}$，结果用 $t$ 表示。

**思路** 一阶导用 $\dfrac{\mathrm dy}{\mathrm dx}=\dfrac{\psi'(t)}{\varphi'(t)}$。二阶导不能对 $t$ 求两次导就完事，要把 $\dfrac{\mathrm dy}{\mathrm dx}$ 看成新的因变量，和 $x=\varphi(t)$ 组成新的参数方程，再对 $x$ 求一次导，分母仍是 $\varphi'(t)$。

**解** 先求一阶导：

$$\frac{\mathrm dy}{\mathrm dx}=\frac{(t-\arctan t)'}{(\ln(1+t^2))'}=\frac{1-\dfrac1{1+t^2}}{\dfrac{2t}{1+t^2}}=\frac{\dfrac{t^2}{1+t^2}}{\dfrac{2t}{1+t^2}}=\frac t2 .$$

再对 $\begin{cases}x=\ln(1+t^2),\\ \dfrac{\mathrm dy}{\mathrm dx}=\dfrac t2\end{cases}$ 求导：

$$\frac{\mathrm d^2y}{\mathrm dx^2}=\frac{\left(\dfrac t2\right)'}{(\ln(1+t^2))'}=\frac{\dfrac12}{\dfrac{2t}{1+t^2}}=\frac{1+t^2}{4t},\qquad t\ne0 .$$

在 $t=0$ 处 $x'=0$，公式失效；此时 $\dfrac{\mathrm dy}{\mathrm dx}=0$，曲线有水平切线，而 $\dfrac{\mathrm d^2y}{\mathrm dx^2}$ 不存在（$t\to0^+$ 时趋于 $+\infty$）。

---

## 第 5 题

设曲线 $C$ 的极坐标方程为 $r=a(1+\cos\theta)\ (a>0)$。

(1) 求 $\dfrac{\mathrm dy}{\mathrm dx}$，结果用 $\theta$ 表示；

(2) 求曲线 $C$ 在 $\theta=\dfrac\pi2$ 处的切线方程（直角坐标系下）。

**思路** 极坐标方程没有直接的求导公式，先化成以 $\theta$ 为参数的参数方程 $x=r(\theta)\cos\theta,\ y=r(\theta)\sin\theta$，再用参数方程求导。切线方程需要切点坐标和斜率，把 $\theta=\frac\pi2$ 代入参数方程和导数即可。

**解** (1) 由

$$\begin{cases}x=a(1+\cos\theta)\cos\theta,\\ y=a(1+\cos\theta)\sin\theta,\end{cases}$$

得

$$x'=a\left[-\sin\theta\cos\theta-(1+\cos\theta)\sin\theta\right]=-a\sin\theta(1+2\cos\theta),$$

$$y'=a\left[-\sin^2\theta+(1+\cos\theta)\cos\theta\right]=a(\cos\theta+\cos2\theta).$$

故

$$\frac{\mathrm dy}{\mathrm dx}=-\frac{\cos\theta+\cos2\theta}{\sin\theta(1+2\cos\theta)}=-\frac{\cos\theta+\cos2\theta}{\sin\theta+\sin2\theta}.$$

用和差化积化简：

$$\frac{\mathrm dy}{\mathrm dx}=-\cot\frac{3\theta}{2}.$$

公式在 $\theta=0,\ \dfrac{2\pi}{3},\ \pi,\ \dfrac{4\pi}{3}$ 处失效：$\theta=\pi$ 对应心脏线的尖点（$x'=y'=0$，曲线回到原点），其余三处 $x'=0$、切线竖直。

(2) 当 $\theta=\dfrac\pi2$ 时，

$$x=a(1+0)\cdot0=0,\qquad y=a(1+0)\cdot1=a,$$

切点为 $(0,a)$，是心脏线的最高点。斜率

$$k=-\cot\frac{3\pi}{4}=-\cot\frac{3\pi}{4}=1 .$$

切线方程

$$y-a=1\cdot(x-0),\qquad \text{即}\quad y=x+a .$$

---

## 第 6 题

设 $y=x^2\mathrm e^{2x}$。

(1) 求 $y^{(n)}(x)$，其中 $n\ge2$；

(2) 求 $y^{(10)}(0)$。

**思路** $x^2$ 求三次导就为零，$\mathrm e^{2x}$ 求多少阶都保持指数形式，这是 Leibniz 公式最典型的用法：和式中只有前三项非零。$\mathrm e^{2x}$ 的 $n$ 阶导每次多一个因子 $2$，所以是 $2^n\mathrm e^{2x}$。

**解** (1) 取 $f=x^2$，$g=\mathrm e^{2x}$，则

$$f'=2x,\qquad f''=2,\qquad f^{(k)}=0\ (k\ge3),$$

$$g^{(k)}=2^k\mathrm e^{2x}.$$

由 Leibniz 公式，只保留 $k=0,1,2$ 三项：

$$
\begin{aligned}
y^{(n)}&=x^2\cdot2^n\mathrm e^{2x}+C_n^1\cdot2x\cdot2^{n-1}\mathrm e^{2x}+C_n^2\cdot2\cdot2^{n-2}\mathrm e^{2x}\\
&=2^nx^2\mathrm e^{2x}+n\cdot2^n x\,\mathrm e^{2x}+n(n-1)2^{n-2}\mathrm e^{2x}\\
&=2^{n-2}\left(4x^2+4nx+n^2-n\right)\mathrm e^{2x}.
\end{aligned}
$$

最后一步是把前两项的 $2^n$ 写成 $4\cdot2^{n-2}$ 与 $2\cdot2^{n-2}\cdot2n=4n\cdot2^{n-2}$。

(2) 令 $x=0$：

$$y^{(10)}(0)=2^{8}\left(0+0+100-10\right)=256\times90=23040 .$$

---

## 第 7 题

在抛物线 $y=x^2$ 上取一点 $P$（横坐标满足 $0<x\le1$），过 $P$ 作该抛物线的切线。若该切线与 $x$ 轴及直线 $x=1$ 围成一个三角形，求此三角形面积的最大值，并求取到最大值时点 $P$ 的坐标。

**思路** 先把面积写成 $P$ 的横坐标 $x$ 的函数。切线与两条边界线的交点都能由切线方程算出，三角形是直角三角形，底和高分别是 $1-\frac x2$ 与 $2x-x^2$。面积函数是三次多项式，求导找驻点，再和端点比较——因为是闭区间（$0<x\le1$，左端取极限），必须检查端点。

**解** 设 $P(x,x^2)$，$0<x\le1$。切线斜率 $2x$，切线方程

$$Y-x^2=2x(X-x),\qquad \text{即}\quad Y=2xX-x^2 .$$

与 $x$ 轴（$Y=0$）的交点 $A\left(\dfrac x2,0\right)$；与 $x=1$ 的交点 $B(1,2x-x^2)$；记 $C(1,0)$。三角形 $ABC$ 的两条直角边为

$$|AC|=1-\frac x2,\qquad |BC|=2x-x^2=x(2-x),$$

面积为

$$S(x)=\frac12\left(1-\frac x2\right)x(2-x)=\frac14x(2-x)^2,\qquad 0<x\le1 .$$

求导：

$$S'(x)=\frac14\left[(2-x)^2-2x(2-x)\right]=\frac14(2-x)(2-3x)=\frac14(3x-2)(x-2).$$

在 $(0,1]$ 上，$x-2<0$，故 $S'(x)=0$ 只有 $x=\dfrac23$；当 $0<x<\dfrac23$ 时 $S'>0$，当 $\dfrac23<x\le1$ 时 $S'<0$。所以 $x=\dfrac23$ 是极大值点，也是最大值点。最大面积

$$S\left(\frac23\right)=\frac14\cdot\frac23\cdot\left(\frac43\right)^2=\frac{8}{27}.$$

端点：$S(0^+)=0$，$S(1)=\dfrac14<\dfrac{8}{27}$，不影响最大值。此时

$$P\left(\frac23,\frac49\right).$$

**另解（几何平均不超过算术平均）** 把面积写成

$$S=\frac14x(2-x)^2=\frac18\cdot(2x)(2-x)(2-x).$$

三个正因子 $2x,\ 2-x,\ 2-x$ 的和为 $4$，是常数，故

$$(2x)(2-x)(2-x)\le\left(\frac{2x+(2-x)+(2-x)}{3}\right)^3=\left(\frac43\right)^3=\frac{64}{27},$$

等号当且仅当 $2x=2-x$，即 $x=\dfrac23$。于是

$$S\le\frac18\cdot\frac{64}{27}=\frac{8}{27},$$

最大值在 $x=\dfrac23$ 取到。用均值不等式时，凑出"和为常数"的三个因子是关键；这里把 $x$ 写成 $\frac12\cdot2x$，正是为了让 $2x$ 与两个 $2-x$ 的和消去 $x$。

---

## 第 8 题

已知 $\sqrt{2.89}=1.7$，利用微分近似计算 $\sqrt3$（保留到小数点后第三位）。

**思路** 取 $f(x)=\sqrt x$，在已知点 $x_0=2.89$ 处用线性近似 $f(x)\approx f(x_0)+f'(x_0)(x-x_0)$。$x_0$ 要尽量接近 $3$，且函数值和导数值都容易算，$2.89=1.7^2$ 正好满足。

**解** 取 $f(x)=\sqrt x$，$x_0=2.89$，$x=3$。由

$$f'(x)=\frac{1}{2\sqrt x},\qquad f'(2.89)=\frac{1}{2\times1.7}=\frac{1}{3.4},$$

得

$$
\begin{aligned}
\sqrt3&\approx\sqrt{2.89}+\frac{1}{2\sqrt{2.89}}(3-2.89)\\
&=1.7+\frac{0.11}{3.4}\\
&=1.7+0.03235\cdots=1.73235\cdots .
\end{aligned}
$$

保留三位小数：

$$\sqrt3\approx1.732 .$$

与真值 $1.73205\cdots$ 相比，误差约为 $3\times10^{-4}$。误差的主要来源是忽略了二阶项 $\frac12f''(x_0)(x-x_0)^2$，其中 $f''(x)=-\frac14x^{-3/2}$，在 $x_0=2.89$ 附近很小。

---

## 第 9 题

在距海岸 $5\ \mathrm{km}$ 处有一灯塔，它的灯每分钟转动一周。求光束与岸边成 $60^\circ$ 角时，光束沿岸边滑动的速度（$\mathrm{km/min}$）。

**思路** 这是相关变化率问题：光束的转角随时间匀速变化（每分钟 $2\pi$），光斑在岸边的位置由转角决定，两者由直角三角形的正切关系联系。对时间求导，就得到光斑速度与角速度的关系。注意"光束与岸边成 $60^\circ$"是与海岸线的夹角，而公式里的角应取光束与垂线的夹角。

**解** 设灯塔为 $L$，到海岸的垂足为 $O$，$|LO|=5$。某时刻光束与垂线 $LO$ 的夹角为 $\alpha$，光斑位置为 $P$，$|OP|=y$。则

$$y=5\tan\alpha .$$

灯每分钟转一周，角速度

$$\omega=\frac{\mathrm d\alpha}{\mathrm dt}=2\pi\ \mathrm{rad/min}.$$

对 $t$ 求导：

$$v=\frac{\mathrm dy}{\mathrm dt}=5\sec^2\alpha\cdot\frac{\mathrm d\alpha}{\mathrm dt}=10\pi\sec^2\alpha .$$

光束与岸边成 $60^\circ$ 时，与垂线的夹角 $\alpha=90^\circ-60^\circ=30^\circ$，$\sec^2 30^\circ=\dfrac43$。故

$$v=10\pi\cdot\frac43=\frac{40\pi}{3}\approx41.9\ \mathrm{km/min}.$$

速度为正表示光斑沿一个方向移动，反方向同理。数值看起来很大，是因为光斑的移动由光束的转动几何关系决定，光束每分钟就转一整圈；当光束接近与海岸平行时，$\alpha\to90^\circ$，$\sec^2\alpha\to\infty$，光斑速度趋于无穷。

---

## 第 10 题

求下列函数的二阶导数：

(1) $y=3x^2+\ln x$；(2) $y=x\cos x$；(3) $y=a^{2x}$；

(4) $y=\tan x$；(5) $y=x\ln x$；(6) $y=\dfrac{\arcsin x}{\sqrt{1-x^2}}$。

**思路** 前五题是基本公式加四则运算的直接应用，逐次求导即可。第 (6) 题是商与复合的叠加，第一次求导后会出现 $\arcsin x$ 与 $(1-x^2)^{-3/2}$ 的乘积，第二次求导要对两项分别用乘积法则，并把同分母的项合并。

**解** (1) $y'=6x+\dfrac1x$，

$$y''=6-\frac{1}{x^2}.$$

(2) $y'=\cos x-x\sin x$，

$$y''=-\sin x-(\sin x+x\cos x)=-2\sin x-x\cos x .$$

(3) $y'=2a^{2x}\ln a$，

$$y''=4a^{2x}(\ln a)^2 .$$

(4) $y'=\sec^2x=1+\tan^2x$，

$$y''=2\tan x\sec^2x=2\tan x\left(1+\tan^2x\right).$$

(5) $y'=\ln x+1$，

$$y''=\frac1x .$$

(6) 先把 $y$ 写成 $y=\arcsin x\cdot(1-x^2)^{-1/2}$，用乘积法则：

$$
\begin{aligned}
y'&=(1-x^2)^{-1/2}\cdot(1-x^2)^{-1/2}+\arcsin x\cdot x(1-x^2)^{-3/2}\\
&=\frac{1}{1-x^2}+\frac{x\arcsin x}{(1-x^2)^{3/2}} .
\end{aligned}
$$

再求导。第一项：

$$\left(\frac{1}{1-x^2}\right)'=\frac{2x}{(1-x^2)^2}.$$

第二项用乘积法则：

$$
\begin{aligned}
\left(\frac{x\arcsin x}{(1-x^2)^{3/2}}\right)'
&=\frac{\arcsin x}{(1-x^2)^{3/2}}+\frac{x}{(1-x^2)^{1/2}}\cdot\frac{1}{(1-x^2)^{3/2}}+\frac{x\arcsin x\cdot3x}{(1-x^2)^{5/2}}\\
&=\frac{\arcsin x}{(1-x^2)^{3/2}}+\frac{x}{(1-x^2)^2}+\frac{3x^2\arcsin x}{(1-x^2)^{5/2}} .
\end{aligned}
$$

合并 $1/(1-x^2)^2$ 的两项：$\dfrac{2x+x}{(1-x^2)^2}=\dfrac{3x}{(1-x^2)^2}$。合并 $\arcsin x$ 的两项：

$$\frac{\arcsin x}{(1-x^2)^{3/2}}+\frac{3x^2\arcsin x}{(1-x^2)^{5/2}}=\frac{(1-x^2)+3x^2}{(1-x^2)^{5/2}}\arcsin x=\frac{(1+2x^2)\arcsin x}{(1-x^2)^{5/2}} .$$

故

$$y''=\frac{3x}{(1-x^2)^2}+\frac{(1+2x^2)\arcsin x}{(1-x^2)^{5/2}} .$$

---

## 相关资料

- 原题：[5.jpg](https://drive.google.com/file/d/1HRxPM6clRFCRP6yyu0Dvo_z3TymY9adL/view?usp=drivesdk)
- 解答：[第5次作业解答.pdf](https://drive.google.com/file/d/1eE94yVSM2s1SNUBEV6Adw0pcmHMXB80I/view?usp=drivesdk)
