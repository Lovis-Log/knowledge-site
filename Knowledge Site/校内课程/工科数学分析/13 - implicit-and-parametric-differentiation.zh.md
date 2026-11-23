---
slug: "13-implicit-and-parametric-differentiation"
title: "隐函数的导数和参数式求导"
summary: "第 13 讲：隐函数的导数和参数式求导。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "13"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "13隐函数的导数和参数式求导.pdf"
    url: "https://drive.google.com/file/d/1srUBmxgCHBzozP2MIAUOnnEkPOv4nt-5/view?usp=drivesdk"
---

函数不一定总写成 $y=f(x)$。有时它由一个方程 $F(x,y)=0$ 确定，有时由一对参数方程 $x=\varphi(t),y=\psi(t)$ 给出，有时用极坐标 $r=r(\theta)$ 描述。这些形式大多无法或不必化成显函数，但导数照样能求：办法是把 $y$ 始终看作 $x$ 的函数，用链式法则对等式两边求导，再解出 $y'$。

## 隐函数

在满足一定条件时（这些条件由多元函数微分学讨论），方程

$$F(x,y)=0$$

确定一个 $y$ 关于 $x$ 的函数 $y=y(x)$，称为**隐函数**。

有些隐函数可以解出显式。例如椭圆

$$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$$

可以解出上下两个半椭圆

$$y=\pm\frac ba\sqrt{a^2-x^2},\qquad -a\le x\le a .$$

更多时候解不出来。高次的二元代数方程一般无法把 $y$ 写成 $x$ 的初等函数；但由介值定理，对每个 $x$，只要方程在 $y$ 方向上有变号，就至少存在一个 $y$ 使 $F(x,y)=0$，因此方程仍然确定了一个隐函数，只是没有显式表达式。

> **关键结论**：求隐函数的导数不需要先解出 $y$。核心只有一句话：**$y$ 是 $x$ 的函数，遇到 $y$ 就用链式法则**。

**例 1** 求由方程 $\mathrm e^{xy}+x^2y-1=0$ 确定的隐函数 $y=y(x)$ 的导函数。

**解** 两边对 $x$ 求导。第一项 $\mathrm e^{xy}$ 的指数含 $y$，要用链式法则：

$$\mathrm e^{xy}(xy)'+2xy+x^2y'=0,$$

即

$$\mathrm e^{xy}(y+xy')+2xy+x^2y'=0.$$

把含 $y'$ 的项归到一边：

$$y'\left(x\mathrm e^{xy}+x^2\right)=-\left(y\mathrm e^{xy}+2xy\right),$$

故

$$y'=-\frac{\mathrm e^{xy}y+2xy}{x\mathrm e^{xy}+x^2}.$$

结果里同时出现 $x$ 和 $y$。在满足原方程且 $x\mathrm e^{xy}+x^2\ne 0$ 的点，隐函数定理保证局部可将 $y$ 写成 $x$ 的可微函数，此时把坐标代入就能求出导数。分母为零的点需要单独考察。

> **补充说明**
>
> 分母其实就是隐函数定理中的 $F_y$。记 $F(x,y)=\mathrm e^{xy}+x^2y-1$，把 $y=y(x)$ 代入后对 $x$ 求导，由链式法则
>
> $$
> F_x(x,y)+F_y(x,y)y'=0,\qquad
> F_x=\mathrm e^{xy}y+2xy,\quad F_y=x\mathrm e^{xy}+x^2 .
> $$
>
> 所以
>
> $$
> y'=-\frac{F_x}{F_y}
> =-\frac{\mathrm e^{xy}y+2xy}{x\mathrm e^{xy}+x^2},
> $$
>
> 与逐项求导的结果一致。隐函数定理的条件正是 $F_y\ne0$：它保证在局部可以把 $F(x,y)=0$ 解成 $y=y(x)$。若 $F_y=0$，曲线在该点可能有竖直切线，$y'$ 不存在，不能直接把坐标代入公式。

**例 2** 求曲线 $y^3+y^2=2x$ 在点 $(1,1)$ 处的切线和法线方程。

**解** 点 $(1,1)$ 满足方程：$1+1=2$。两边对 $x$ 求导，

$$3y^2y'+2yy'=2,$$

故

$$y'=\frac{2}{3y^2+2y}.$$

在 $(1,1)$ 处，

$$k=y'\big|_{(1,1)}=\frac{2}{3+2}=\frac25 .$$

切线：

$$y-1=\frac25(x-1).$$

法线斜率为 $-\dfrac52$：

$$y-1=-\frac52(x-1).$$

**例 3** 求由 $\mathrm e^{x+y}-xy-\mathrm e=0$ 确定的曲线在点 $(0,1)$ 处的切线方程。

**解** 验证点：$\mathrm e^{0+1}-0-\mathrm e=0$，点在曲线上。

两边对 $x$ 求导，注意 $\mathrm e^{x+y}$ 对 $x$ 求导要乘 $(1+y')$：

$$\mathrm e^{x+y}(1+y')-y-xy'=0.$$

代入 $x=0,y=1$：

$$\mathrm e(1+y')-1=0\ \Longrightarrow\ y'=\frac1{\mathrm e}-1=\frac{1-\mathrm e}{\mathrm e}.$$

切线方程为

$$y=\frac{1-\mathrm e}{\mathrm e}x+1.$$

## 参数方程求导

设自变量 $x$ 与因变量 $y$ 的关系由参数方程

$$\begin{cases}x=\varphi(t),\\ y=\psi(t),\end{cases}\qquad \alpha\le t\le\beta$$

确定，其中 $\varphi,\psi$ 都可微，$\varphi$ 严格单调且 $\varphi'(t)\ne0$。

**第一步**，由反函数求导法则，$x=\varphi(t)$ 的反函数 $t=\varphi^{-1}(x)$ 存在且可导，

$$\left(\varphi^{-1}(x)\right)'=\frac{1}{\varphi'(t)} .$$

**第二步**，把 $y$ 写成 $x$ 的函数：

$$y=\psi(t)=\psi\left(\varphi^{-1}(x)\right).$$

**第三步**，用链式法则：

$$\frac{\mathrm dy}{\mathrm dx}=\frac{\mathrm dy}{\mathrm dt}\cdot\frac{\mathrm dt}{\mathrm dx}=\psi'(t)\cdot\frac{1}{\varphi'(t)}=\frac{\psi'(t)}{\varphi'(t)} .$$

这就是参数方程的求导公式。记忆时可以把它看成两个微分相除：

$$\mathrm dy=\psi'(t)\,\mathrm dt,\qquad \mathrm dx=\varphi'(t)\,\mathrm dt,\qquad \frac{\mathrm dy}{\mathrm dx}=\frac{\psi'(t)}{\varphi'(t)} .$$

若反过来把 $y$ 看作自变量、$x$ 看作因变量，则

$$\frac{\mathrm dx}{\mathrm dy}=\frac{\varphi'(t)}{\psi'(t)} .$$

**例 4** 求旋轮线

$$\begin{cases}x=t-\sin t,\\ y=1-\cos t,\end{cases}\qquad 0\le t\le2\pi$$

的导函数 $\dfrac{\mathrm dy}{\mathrm dx}$。

**解** 这条曲线是半径为 $1$ 的圆沿 $x$ 轴无滑动滚动时，圆周上一点的运动轨迹。由公式，

$$\frac{\mathrm dy}{\mathrm dx}=\frac{(1-\cos t)'}{(t-\sin t)'}=\frac{\sin t}{1-\cos t}.$$

用半角公式化简：

$$\frac{\sin t}{1-\cos t}=\frac{2\sin\frac t2\cos\frac t2}{2\sin^2\frac t2}=\cot\frac t2 .$$

在 $t=0$ 与 $t=2\pi$ 处，$1-\cos t=0$，导数为无穷大，曲线在这两点出现尖点；在 $0<t<2\pi$ 内曲线光滑。

## 同一函数的三种表达形式

显式、隐式、参数式是表达函数的三种重要形式。同一个函数用不同形式表示，求导的难易可能相差很多，选择合适的形式能省不少计算。

**例 5** 求椭圆 $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ 在上半椭圆上一点的导数。

**方法一（显式）** 上半椭圆为

$$y=\frac ba\sqrt{a^2-x^2},\qquad -a<x<a .$$

由链式法则，

$$y'=\frac ba\cdot\frac{1}{2\sqrt{a^2-x^2}}\cdot(-2x)=-\frac{bx}{a\sqrt{a^2-x^2}} .$$

再用 $y=\dfrac ba\sqrt{a^2-x^2}$ 把根式换掉：

$$y'=-\frac{b^2x}{a^2y}.$$

**方法二（参数式）** 上半椭圆的参数方程为

$$\begin{cases}x=a\cos t,\\ y=b\sin t,\end{cases}\qquad 0<t<\pi .$$

于是

$$\frac{\mathrm dy}{\mathrm dx}=\frac{b\cos t}{-a\sin t}=-\frac{b\cos t}{a\sin t}=-\frac{b^2(a\cos t)}{a^2(b\sin t)}=-\frac{b^2x}{a^2y}.$$

**方法三（隐式）** 直接对标准方程两边求导：

$$\frac{2x}{a^2}+\frac{2y}{b^2}y'=0\ \Longrightarrow\ y'=-\frac{b^2x}{a^2y}.$$

> **理解关键**：三种方法结果相同。显式要处理根式，参数式要背公式，隐式最快。一般原则是：能直接用隐式求导就不必解出 $y$；参数式在曲线有自然的参数（角度、时间）时最方便。

## 极坐标与极坐标求导

极坐标用方向和距离描写点的位置。在平面上取定点 $O$（**极点**），从 $O$ 出发的射线 $Ox$（**极轴**），一个长度单位和一个角度正方向（通常取逆时针），合起来构成极坐标系。点 $P$ 的位置由 $OP$ 的长度 $r$（**极径**）与 $Ox$ 到 $OP$ 的角 $\theta$（**极角**）刻画，$(r,\theta)$ 称为 $P$ 的极坐标。

极坐标与直角坐标的关系是

$$x=r\cos\theta,\qquad y=r\sin\theta,$$

反过来

$$r=\sqrt{x^2+y^2},\qquad \cos\theta=\frac{x}{\sqrt{x^2+y^2}},\qquad \sin\theta=\frac{y}{\sqrt{x^2+y^2}} .$$

一些常见曲线的极坐标方程：

- 圆 $x^2+y^2=a^2$：$r=a,\ 0\le\theta\le2\pi$；
- 直线 $x=a\ (a>0)$：$r\cos\theta=a$，即 $r=\dfrac a{\cos\theta}$，$\theta\in\left(-\frac\pi2,\frac\pi2\right)$；
- 阿基米德螺线：$r=a\theta,\ \theta\ge0$，由射线绕极点匀速转动、同时点沿射线匀速远离形成；
- 心脏线：$r=a(1+\cos\theta),\ 0\le\theta\le2\pi$；
- 三叶玫瑰线：$r=a\sin3\theta,\ \theta\in[0,\pi]$。

极坐标方程中 $\theta$ 的范围不是唯一的，同一条曲线可以有不同的写法，例如圆也可以写成 $r=a,\ -\pi\le\theta\le\pi$。讨论曲线时只需取一个能描出整条曲线的范围。

求 $\dfrac{\mathrm dy}{\mathrm dx}$ 的办法是先把极坐标方程化成以 $\theta$ 为参数的参数方程：

$$x=r(\theta)\cos\theta,\qquad y=r(\theta)\sin\theta .$$

于是

$$\frac{\mathrm dy}{\mathrm dx}=\frac{r'(\theta)\sin\theta+r(\theta)\cos\theta}{r'(\theta)\cos\theta-r(\theta)\sin\theta}.$$

**例 6** 求心脏线 $r=a(1+\cos\theta)\ (a>0)$ 的 $\dfrac{\mathrm dy}{\mathrm dx}$。

**解** 参数方程为

$$\begin{cases}x=a(1+\cos\theta)\cos\theta,\\ y=a(1+\cos\theta)\sin\theta .\end{cases}$$

分别求导：

$$x'=a\left[-\sin\theta\cos\theta-(1+\cos\theta)\sin\theta\right]=-a\sin\theta(1+2\cos\theta),$$

$$y'=a\left[-\sin^2\theta+(1+\cos\theta)\cos\theta\right]=a(\cos\theta+\cos2\theta).$$

故

$$\frac{\mathrm dy}{\mathrm dx}=-\frac{\cos\theta+\cos2\theta}{\sin\theta(1+2\cos\theta)}=-\frac{\cos\theta+\cos2\theta}{\sin\theta+\sin2\theta}.$$

用和差化积，

$$\cos\theta+\cos2\theta=2\cos\frac{3\theta}{2}\cos\frac\theta2,\qquad \sin\theta+\sin2\theta=2\sin\frac{3\theta}{2}\cos\frac\theta2,$$

得到

$$\frac{\mathrm dy}{\mathrm dx}=-\cot\frac{3\theta}{2},\qquad \theta\ne0,\ \frac{2\pi}{3},\ \pi,\ \frac{4\pi}{3}.$$

在 $\theta=0,\ \frac{2\pi}{3},\ \frac{4\pi}{3}$ 处 $x'=0$，切线竖直；在 $\theta=\pi$ 处 $r=0$，曲线回到原点，这是心脏线的尖点，$x'=y'=0$，导数不存在。

## 相关变化率

> **关键结论**：实际问题中，几个量都随时间变化，且由某个几何或物理关系联系。已知其中一个量的变化率，求另一个量的变化率，叫**相关变化率**问题。做法是：先写出各量之间的关系式，再对时间 $t$ 求导，最后代入瞬时值。

**例 7** 有一底半径为 $R$、高为 $h$ 的正圆锥形容器，以速度 $A$ 往容器中倒水。求容器内水位等于锥高一半时，水面的上升速度。

**思路** 水的体积 $V$ 由水位 $y$ 决定，而 $V$ 又随时间以速率 $A$ 增加。把 $V$ 写成 $y$ 的函数，对 $t$ 求导，左端是 $A$，右端含 $\dfrac{\mathrm dy}{\mathrm dt}$，解出来即可。

**解** 设某时刻水位为 $y$，水面半径为 $r$。水的体积等于整个圆锥体积减去上方空锥的体积：

$$V=\frac{\pi R^2h}{3}-\frac{\pi r^2}{3}(h-y).$$

由相似三角形 $\dfrac rR=\dfrac{h-y}{h}$，得

$$r=R\left(1-\frac yh\right).$$

代入得

$$V=\frac{\pi R^2h}{3}-\frac{\pi R^2}{3h^2}(h-y)^3=\frac{\pi R^2h}{3}\left[1-\left(1-\frac yh\right)^3\right].$$

另一方面 $V=At$，故

$$At=\frac{\pi R^2h}{3}\left[1-\left(1-\frac yh\right)^3\right].$$

两边对 $t$ 求导：

$$A=\frac{\pi R^2h}{3}\cdot3\left(1-\frac yh\right)^2\cdot\frac1h\cdot\frac{\mathrm dy}{\mathrm dt}=\pi R^2\left(1-\frac yh\right)^2\frac{\mathrm dy}{\mathrm dt}.$$

于是

$$\frac{\mathrm dy}{\mathrm dt}=\frac{A}{\pi R^2\left(1-\frac yh\right)^2}=\frac{Ah^2}{\pi R^2(h-y)^2}.$$

当 $y=\dfrac h2$ 时，$\left(1-\dfrac yh\right)^2=\dfrac14$，

$$\frac{\mathrm dy}{\mathrm dt}=\frac{4A}{\pi R^2}.$$

结果可以用微元法直接验证：在极短时间 $\mathrm dt$ 内，水面上升 $\mathrm dy$，增加的体积近似为一层薄圆柱，$A\,\mathrm dt\approx\pi r^2\,\mathrm dy$，故 $\dfrac{\mathrm dy}{\mathrm dt}=\dfrac{A}{\pi r^2}$。当 $y=\frac h2$ 时 $r=\frac R2$，$\pi r^2=\frac{\pi R^2}{4}$，同样得到 $\dfrac{4A}{\pi R^2}$。

这个结果说明：水位越低，水面越大，上升越慢；水位到一半时水面半径只剩 $R/2$，上升速度是初始时刻（若从空容器开始）的四倍。

## 课堂小结

这一讲的主线是：隐函数、参数式、极坐标三种表示，求导都归结为"把 $y$ 看成 $x$ 的函数，用链式法则"。隐函数对等式两边求导再解出 $y'$；参数方程用 $\dfrac{\mathrm dy}{\mathrm dx}=\dfrac{\psi'}{\varphi'}$；极坐标先化成以 $\theta$ 为参数的参数方程；相关变化率则是先写关系式、再对时间求导。

容易出错的地方有四处。

第一，隐函数求导时 $\mathrm e^{xy}$、$\sin(xy)$ 这类项要乘内层导数 $(xy)'=y+xy'$，漏掉 $y'$ 是最常见的错误。

第二，隐函数的结果含 $y$ 是正常的，求某点导数值时直接代入坐标，不必解出 $y(x)$。

第三，参数方程求导的分母是 $\varphi'(t)$，不是 $\varphi(t)$；在 $\varphi'(t)=0$ 处公式失效，曲线可能出现竖直切线或尖点，要单独看。

第四，极坐标求导不能把 $\dfrac{\mathrm dy}{\mathrm dx}$ 写成 $\dfrac{r'(\theta)\sin\theta}{r'(\theta)\cos\theta}=\tan\theta$，必须用完整的参数式公式，因为 $r$ 也随 $\theta$ 变化。
