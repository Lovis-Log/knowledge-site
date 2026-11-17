---
slug: "12-derivatives-and-differentials"
title: "导数和微分"
summary: "第 12 讲：导数和微分。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "12"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "12导数和微分.pdf"
    url: "https://drive.google.com/file/d/1db9iqFF__E3xz4GoCUg_i_0cJa4uo__s/view?usp=drivesdk"
---

导数刻画的是"函数变化相对于自变量变化有多快"，微分刻画的是"函数的变化量能不能用自变量的变化量线性地近似"。两者是同一件事的两种说法：可导与可微等价，导数就是微分的系数。把这一点说清楚，后面用微分做近似计算、用微分形式做隐函数求导、以及把导数写成微商，才有依据。

## 以直代曲

先看一个几何问题：曲线能不能在一点附近用直线代替？

过曲线 $y=f(x)$ 上定点 $(x,f(x))$ 作一条直线

$$Y-f(x)=k(X-x),$$

在横坐标 $x+\Delta x$ 处，直线的纵坐标与 $f(x)$ 相差 $k\Delta x$，而曲线的实际增量是

$$\Delta y=f(x+\Delta x)-f(x).$$

希望找到合适的 $k$，使 $\Delta y$ 与 $k\Delta x$ 只差一个比 $\Delta x$ 高阶的无穷小：

$$\Delta y=k\Delta x+o(\Delta x)\qquad(\Delta x\to0).$$

> **关键结论**：这就是"以直代曲"的精确含义：在 $x$ 附近，曲线的增量可以用自变量的增量乘以一个系数来近似，误差比 $\Delta x$ 小得多。

刘徽注《九章算术》说"割之弥细，所失弥少；割之又割，以至于不可割"，讲的是同一件事：局部越缩越小，曲线越接近直线。

## 微分的定义

**定义 1** 设 $y=f(x)$ 在点 $x_0$ 的某邻域内有定义。若存在一个只与 $x_0$ 有关、与 $\Delta x$ 无关的数 $g(x_0)$，使得当 $\Delta x\to0$ 时

$$\Delta y=g(x_0)\Delta x+o(\Delta x),$$

则称 $f(x)$ 在 $x_0$ 处**可微**，称 $g(x_0)\Delta x$ 为 $f(x)$ 在 $x_0$ 处的**微分**（一阶微分），记作 $\mathrm dy$。若 $f$ 在区间上每一点都可微，则称 $f$ 在该区间上可微。

几点说明：

- $\Delta x\to0$ 时 $\Delta y\to0$，所以可微必连续；
- $g(x_0)\Delta x$ 是 $\Delta y$ 的**线性主要部分**；
- $|\Delta x|$ 充分小时，可以用 $g(x_0)\Delta x$ 代替 $\Delta y$，产生的偏差是 $o(\Delta x)$。

对函数 $y=x$，$\Delta y=\Delta x$，而 $\mathrm dy=\mathrm dx$，故 $\Delta x=\mathrm dx$。于是微分总可以写成

$$\mathrm dy=g(x)\,\mathrm dx.$$

**例 1** 设 $y=f(x)=x^2$，求它在任意点 $x$ 处的微分。

**解** 对任意增量 $\Delta x$，

$$\Delta y=(x+\Delta x)^2-x^2=2x\Delta x+(\Delta x)^2.$$

右端第一项是 $\Delta x$ 的线性项，第二项是 $o(\Delta x)$，故 $f$ 在 $x$ 处可微，

$$\mathrm dy=\mathrm d(x^2)=2x\,\mathrm dx.$$

**例 2** 设 $y=f(x)=\sqrt[3]{x^2}$，说明它在 $x=0$ 处不可微。

**解** 在 $x=0$ 处，

$$\Delta y=f(\Delta x)-f(0)=\sqrt[3]{(\Delta x)^2}=|\Delta x|^{2/3}.$$

若 $f$ 在 $0$ 处可微，则应存在常数 $g(0)$ 使 $\Delta y=g(0)\Delta x+o(\Delta x)$，两边除以 $\Delta x$ 得

$$\frac{\Delta y}{\Delta x}=g(0)+o(1),$$

即差商应有有限极限。但实际上

$$\frac{\Delta y}{\Delta x}=\frac{|\Delta x|^{2/3}}{\Delta x}=\operatorname{sgn}(\Delta x)\,|\Delta x|^{-1/3}\to\pm\infty,$$

差商没有有限极限，矛盾。故 $f$ 在 $x=0$ 处不可微。几何上，曲线 $y=\sqrt[3]{x^2}$ 在原点有竖直切线，无法用斜率有限的直线近似。

## 可微与可导等价

**定理 1** 函数 $y=f(x)$ 在 $x_0$ 处可导，当且仅当它在 $x_0$ 处可微。

**证明** 设 $f$ 在 $x_0$ 可导，则

$$f'(x_0)=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$$

存在且有限。于是

$$\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)-f'(x_0)\Delta x}{\Delta x}=0,$$

即

$$f(x_0+\Delta x)-f(x_0)-f'(x_0)\Delta x=o(\Delta x),$$

所以

$$\Delta y=f'(x_0)\Delta x+o(\Delta x),$$

$f$ 在 $x_0$ 可微，且 $\mathrm dy=f'(x_0)\mathrm dx$。

反之，设 $f$ 在 $x_0$ 可微，则存在 $g(x_0)$ 使

$$f(x_0+\Delta x)-f(x_0)=g(x_0)\Delta x+o(\Delta x).$$

两边除以 $\Delta x$ 并令 $\Delta x\to0$：

$$\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}=g(x_0),$$

故 $f$ 在 $x_0$ 可导，且 $f'(x_0)=g(x_0)$。

定理说明两件事。第一，可导与可微是同一个性质的两种说法，判断时可以互换。第二，微分的系数就是导数：

$$\mathrm dy=f'(x_0)\,\mathrm dx,\qquad f'(x_0)=\frac{\mathrm dy}{\mathrm dx}.$$

导数因此也称为**微商**：它是两个微分之比。这个写法在后面处理反函数、参数方程、隐函数时特别方便，因为 $\mathrm dy$ 与 $\mathrm dx$ 可以像普通的量一样参与运算。

## 线性近似与切线

把微分的定义移项，得到

$$f(x)=f(x_0)+f'(x_0)(x-x_0)+o(x-x_0)\qquad(x\to x_0).$$

去掉高阶项，就是线性近似

$$f(x)\approx f(x_0)+f'(x_0)(x-x_0),\qquad x\in(x_0-\delta,x_0+\delta),$$

右端正是曲线在 $(x_0,f(x_0))$ 处的切线。$\delta$ 取得越小，近似越准。这就是"以直代曲"在计算上的用法：在已知点附近，用切线代替曲线。

**例 3** 计算 $\sin 30^\circ5'$ 的近似值。

**解** 先把角度化成弧度。$5'=\dfrac{5}{60}$ 度 $=\dfrac{5\pi}{180\cdot60}=\dfrac{\pi}{2160}\approx0.0014544$，故

$$30^\circ5'=\frac\pi6+0.0014544 .$$

取 $f(x)=\sin x$，$x_0=\dfrac\pi6$，$\delta=0.0014544$，则

$$
\begin{aligned}
\sin 30^\circ5'&\approx\sin\frac\pi6+\cos\frac\pi6\cdot\delta\\
&=0.5+\frac{\sqrt3}{2}\times0.0014544\\
&=0.5+0.0012594=0.5012594 .
\end{aligned}
$$

真值为 $0.5012591\cdots$，近似值到小数点后第六位都与真值相同，第七位才出现差别。

## 微分的运算法则

由 $\mathrm dy=f'(x)\mathrm dx$ 和导数的运算法则，立刻得到微分法则：

$$\mathrm d(c_1f+c_2g)=c_1\,\mathrm df+c_2\,\mathrm dg,$$

$$\mathrm d(fg)=g\,\mathrm df+f\,\mathrm dg,$$

$$\mathrm d\left(\frac fg\right)=\frac{g\,\mathrm df-f\,\mathrm dg}{g^2}\qquad(g\ne0),$$

$$\mathrm d\left(f^{-1}(y)\right)=\frac{1}{f'(x)}\,\mathrm dy,\qquad y=f(x),$$

$$\mathrm d[f(g(x))]=f'(g(x))g'(x)\,\mathrm dx.$$

这些公式与导数公式一一对应，只是把"求导"换成了"求微分"。对一元函数，一阶微分与一阶导数包含的信息完全相同。

## 一阶微分的形式不变性

设 $y=f(u)$，$u=g(x)$，则复合函数的微分为

$$\mathrm d[f(g(x))]=f'(g(x))g'(x)\,\mathrm dx.$$

由于 $\mathrm du=g'(x)\mathrm dx$，上式可以写成

$$\mathrm d[f(u)]=f'(u)\,\mathrm du.$$

注意这个式子的形状与"$u$ 是自变量"时完全一样：若 $u$ 是自变量，$y=f(u)$ 的微分就是 $\mathrm dy=f'(u)\mathrm du$。也就是说，**不论 $u$ 是自变量还是中间变量，一阶微分都写成 $f'(u)\mathrm du$ 的形式**。这个性质称为**一阶微分的形式不变性**。

> **理解关键**：形式不变性的实际价值在于：它让我们可以不管 $u$ 的身份，直接把 $\mathrm dy=f'(u)\mathrm du$ 当作运算规则使用。例 4 的第二种解法就是利用这一点。

**例 4** 已知 $x^2+y^2=1$，求 $\dfrac{\mathrm dy}{\mathrm dx}$。

**解法一** 把 $y$ 看作 $x$ 的函数，两边对 $x$ 求导：

$$2x+2y\frac{\mathrm dy}{\mathrm dx}=0\ \Longrightarrow\ \frac{\mathrm dy}{\mathrm dx}=-\frac xy .$$

**解法二** 把 $x,y$ 看作平等的变量，两边求微分：

$$2x\,\mathrm dx+2y\,\mathrm dy=0\ \Longrightarrow\ \frac{\mathrm dy}{\mathrm dx}=-\frac xy .$$

第二种解法不需要事先指定谁是自变量，也不必写出 $y=y(x)$，直接对等式两边求微分再相除。这正是形式不变性带来的便利。

## 连续但不可导的例子

可导必连续，连续不一定可导。下面几个例子把"不可导"的各种情形分开来看。

**尖角。** $f(x)=|x|$ 在 $x=0$ 处连续，但

$$f'_+(0)=1,\qquad f'_-(0)=-1,$$

左右导数不相等。几何上曲线在原点有一个尖角，切线不唯一。

**竖直切线。** $f(x)=\sqrt[3]{x^2}$ 在 $x=0$ 处连续，且

$$f'_+(0)=+\infty,\qquad f'_-(0)=-\infty .$$

单侧导数作为有限数不存在，曲线在原点的切线是 $y$ 轴。

**振荡。** 考虑

$$f(x)=\begin{cases}x\sin\dfrac1x, & x\ne0,\\[4pt] 0, & x=0.\end{cases}$$

由 $|x\sin\frac1x|\le|x|$ 得 $\lim\limits_{x\to0}f(x)=0=f(0)$，故 $f$ 在 $0$ 处连续。但差商

$$\frac{f(0+\Delta x)-f(0)}{\Delta x}=\frac{\Delta x\sin\frac1{\Delta x}}{\Delta x}=\sin\frac1{\Delta x}$$

在 $\Delta x\to0$ 时不断在 $-1$ 与 $1$ 之间振荡，没有极限，故 $f$ 在 $0$ 处不可导。

**处处不可导的连续曲线。** 连续函数可以比上面这些例子更"坏"：科赫（Koch）雪花曲线由初等几何构造，处处连续，却处处没有切线。1904 年科赫的论文题目就叫《关于一条连续而无切线、可由初等几何构作的曲线》。这说明"连续"远不能保证"可导"，可导是一个强得多的要求。

## 可导但导函数不连续

导函数存在，不代表导函数连续。考虑

$$f(x)=\begin{cases}x^2\sin\dfrac1x, & x\ne0,\\[4pt] 0, & x=0.\end{cases}$$

**在 $0$ 处可导。** 差商为

$$\frac{f(\Delta x)-f(0)}{\Delta x}=\frac{(\Delta x)^2\sin\frac1{\Delta x}}{\Delta x}=\Delta x\sin\frac1{\Delta x}\to0,$$

故 $f'(0)=0$，且 $f'_+(0)=f'_-(0)=0$。

**导函数在 $0$ 处不连续。** 当 $x\ne0$ 时，用乘积与链式法则，

$$f'(x)=2x\sin\frac1x+x^2\cos\frac1x\cdot\left(-\frac1{x^2}\right)=2x\sin\frac1x-\cos\frac1x .$$

于是

$$f'(0+)=\lim_{x\to0^+}\left(2x\sin\frac1x-\cos\frac1x\right),$$

其中 $2x\sin\frac1x\to0$，而 $\cos\frac1x$ 在 $0^+$ 附近振荡，极限不存在。故 $f'(0+)$ 与 $f'(0-)$ 都不存在，$x=0$ 是导函数 $f'(x)$ 的第二类（振荡）间断点。

这个例子把两个容易混淆的记号彻底分开：

- $f'_+(0)=f'_-(0)=0$：$f$ 在 $0$ 处的单侧导数，存在且相等，所以 $f$ 在 $0$ 处可导；
- $f'(0+)$、$f'(0-)$：导函数 $f'(x)$ 在 $0$ 处的单侧极限，不存在。

> **易混点**：前者只管 $0$ 点附近差商的极限，后者要看整条导函数曲线的走向。两者不能互相替代：判断可导只能用单侧导数，研究导函数的连续性才用单侧极限。

## 课堂小结

这一讲的主线是：把"以直代曲"写成 $\Delta y=g(x_0)\Delta x+o(\Delta x)$，得到微分的定义；证明可微与可导等价，从而 $\mathrm dy=f'(x)\mathrm dx$，导数就是微商；由此得到线性近似与切线近似，以及一整套微分法则；一阶微分具有形式不变性，所以可以不分自变量与中间变量地使用 $\mathrm dy=f'(u)\mathrm du$。

容易出错的地方有四处。第一，$\Delta y$ 与 $\mathrm dy$ 不是一回事：$\Delta y$ 是函数的真实增量，$\mathrm dy$ 是它的线性主要部分，二者相差 $o(\Delta x)$。第二，可微必连续，连续不一定可微；判断不可微要看差商是否趋于有限数，$\sqrt[3]{x^2}$ 在 $0$ 处差商趋于无穷，$|x|$ 在 $0$ 处左右差商不等，都不行。第三，$f'(x_0-)$ 是导函数的左极限，$f'_-(x_0)$ 是左导数，$x^2\sin\frac1x$ 说明前者可以不存在而后者存在。第四，形式不变性只对一阶微分成立，二阶微分没有这个性质，下一讲会看到具体的反例。

## 相关资料

- 课件：[12导数和微分.pdf](https://drive.google.com/file/d/1db9iqFF__E3xz4GoCUg_i_0cJa4uo__s/view?usp=drivesdk)
