---
slug: "homework-01"
title: "第 1 次作业 · 质点运动学"
summary: "质点运动学的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "01"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "1 质点运动学习题.pdf", "url": "https://drive.google.com/file/d/1fOdAqslvJmY3KBavj8doFpsx6T-llWfR/view?usp=drivesdk"}, {"kind": "article", "title": "1 质点运动学习题详解.pdf", "url": "https://drive.google.com/file/d/1Vm9PqAwC6vFDtswixIYmubdcGeKbHsM3/view?usp=drivesdk"}]
---

**一、选择题**

## 题目 1 · 选择题 1

质点沿轨道 $AB$ 作曲线运动，速率逐渐减小，图中哪一种情况正确地表示了质点在 $C$ 处的加速度？

![四种加速度方向](/course-materials/campus-basic-physics/figures/31-01.png)

四种情况 (A)–(D) 如题图所示。

**答案：C**

**解：** 曲线运动中加速度的法向分量 $a_{\mathrm{n}}$ 指向轨迹凹侧，切向分量 $a_{\mathrm{t}}$ 沿切线。质点速率逐渐减小，故 $a_{\mathrm{t}}$ 与速度方向相反。四图中只有（C）同时满足“指向凹侧”和“切向分量与运动方向相反”。

## 题目 2 · 选择题 2

一质点沿 $x$ 轴运动的规律是 $x=t^{2}-4t+5$（SI 制）。则前三秒内它的

（A）位移和路程都是 $3\ \mathrm{m}$；
（B）位移和路程都是 $-3\ \mathrm{m}$；
（C）位移是 $-3\ \mathrm{m}$，路程是 $3\ \mathrm{m}$；
（D）位移是 $-3\ \mathrm{m}$，路程是 $5\ \mathrm{m}$。

**答案：D**

**解：** 位移
$$
\Delta x=x(3)-x(0)=2-5=-3\ \mathrm{m}.
$$
由
$$
v=\frac{\mathrm{d}x}{\mathrm{d}t}=2t-4
$$
知 $t=2\ \mathrm{s}$ 时质点折返，此时 $x(2)=1\ \mathrm{m}$。故路程
$$
s=\left|x(2)-x(0)\right|+\left|x(3)-x(2)\right|
=|1-5|+|2-1|=5\ \mathrm{m}.
$$

## 题目 3 · 选择题 3

一质点的运动方程是 $\vec r=R\cos\omega t\,\vec i+R\sin\omega t\,\vec j$，$R$、$\omega$ 为正常数。从 $t=\pi/\omega$ 到 $t=2\pi/\omega$ 时间内：

（1）该质点的位移是

（A）$-2R\vec i$；（B）$2R\vec i$；（C）$-2\vec j$；（D）$0$。

（2）该质点经过的路程是

（A）$2R$；（B）$\pi R$；（C）$0$；（D）$\pi R\omega$。

**答案：（1）B；（2）B。**

**解：** （1）$t_1=\pi/\omega$ 时 $\vec r_1=-R\vec i$，$t_2=2\pi/\omega$ 时 $\vec r_2=R\vec i$，所以
$$
\Delta\vec r=\vec r_2-\vec r_1=2R\vec i.
$$

（2）运动轨迹是半径为 $R$ 的圆，$\Delta t=\pi/\omega$ 恰为半个周期，路程为半个圆周：
$$
s=\pi R.
$$
也可由 $v=\sqrt{v_x^2+v_y^2}=\omega R$ 得 $s=v\Delta t=\pi R$。

## 题目 4 · 选择题 4

一细直杆 $AB$，竖直靠在墙壁上，$B$ 端沿水平方向以速度 $\vec v$ 滑离墙壁，则当细杆运动到图示位置时，细杆中点 $C$ 的速度

（A）大小为 $v/2$，方向与 $B$ 端运动方向相同；
（B）大小为 $v/2$，方向与 $A$ 端运动方向相同；
（C）大小为 $v/2$，方向沿杆身方向；
（D）大小为 $v/(2\cos\theta)$，方向与水平方向成 $\theta$ 角。

![细杆靠墙下滑](/course-materials/campus-basic-physics/figures/31-02.png)

**答案：D**

**解：** 设杆长为 $2l$，杆与墙的夹角为 $\theta$。取墙角为原点，则
$$
x_C=l\sin\theta,\qquad y_C=l\cos\theta .
$$
对时间求导：
$$
v_{Cx}=l\cos\theta\,\dot\theta,\qquad
v_{Cy}=-l\sin\theta\,\dot\theta .
$$
$B$ 端满足 $x_B=2l\sin\theta$，故
$$
v=v_{Bx}=2l\cos\theta\,\dot\theta
\quad\Longrightarrow\quad
\dot\theta=\frac{v}{2l\cos\theta}.
$$
于是
$$
v_C=\sqrt{v_{Cx}^2+v_{Cy}^2}
=l\dot\theta=\frac{v}{2\cos\theta}.
$$
方向由 $\tan\alpha=\dfrac{|v_{Cy}|}{v_{Cx}}=\tan\theta$ 给出，即与水平方向成 $\theta$ 角（斜向下）。

## 题目 5 · 选择题 5

某人以 $4\ \mathrm{km/h}$ 的速率向东前进时，感觉风从正北吹来；如将速率增加一倍，则感觉风从东北方向吹来。实际风速与风向为

（A）$4\ \mathrm{km/h}$，从北方吹来；
（B）$4\ \mathrm{km/h}$，从西北方吹来；
（C）$4\sqrt2\ \mathrm{km/h}$，从东北方吹来；
（D）$4\sqrt2\ \mathrm{km/h}$，从西北方吹来。

**答案：D**

**解：** 由相对速度关系
$$
\vec v_{\text{风地}}=\vec v_{\text{风人}}+\vec v_{\text{人地}}.
$$
设风速为 $(W_x,W_y)$。第一次人速 $(4,0)$，感觉风从正北来，即相对速度指向正南：
$$
W_x-4=0\ \Longrightarrow\ W_x=4 .
$$
第二次人速 $(8,0)$，感觉风从东北来，即相对速度指向西南，且两分量大小相等：
$$
W_x-8=W_y .
$$
代入 $W_x=4$ 得 $W_y=-4$。故
$$
\vec W=(4,-4)\ \mathrm{km/h},\qquad
|\vec W|=4\sqrt2\ \mathrm{km/h}.
$$
风由西北吹向东南，即从西北方吹来。

**二、填空题**

## 题目 6 · 填空题 1

一物体作如图所示的斜抛运动，测得在轨道 $P$ 点处速度大小为 $v$，其方向与水平方向成 $30^\circ$ 角。则物体在 $P$ 点的切向加速度 $a_{\tau}=\underline{\qquad}$，轨道的曲率半径 $\rho=\underline{\qquad}$。

**答案：$a_{\tau}=-\dfrac{g}{2}$；$\rho=\dfrac{2v^{2}}{\sqrt3\,g}$。**

**解：** 斜抛物体只受重力，加速度竖直向下，大小 $g$。在 $P$ 点速度与水平成 $30^\circ$，故切向分量
$$
a_{\tau}=-g\sin30^\circ=-\frac{g}{2}
$$
（负号表示减速）。法向分量
$$
a_{\mathrm{n}}=g\cos30^\circ=\frac{\sqrt3}{2}g .
$$
由 $a_{\mathrm{n}}=v^{2}/\rho$ 得
$$
\rho=\frac{v^{2}}{a_{\mathrm{n}}}
=\frac{2v^{2}}{\sqrt3\,g}.
$$

## 题目 7 · 填空题 2

一质点在 $xy$ 平面内运动，其运动学方程为 $\vec r=2t\,\vec i+(2-t^{2})\,\vec j$，其中 $\vec r$、$t$ 分别以米和秒为单位。则从 $t=1\ \mathrm{s}$ 到 $t=3\ \mathrm{s}$ 质点的位移为 $\underline{\qquad}$；$t=2\ \mathrm{s}$ 时质点的加速度为 $\underline{\qquad}$；质点的轨迹方程是 $\underline{\qquad}$。

**答案：按题面时间区间为 $4\vec i-8\vec j\ \mathrm{m}$；$-2\vec j\ \mathrm{m/s^{2}}$；$y=2-\dfrac{x^{2}}{4}$。**

> 校注：原详解给出 $\Delta\vec r=2\vec i-3\vec j$，对应的是 $t=1\ \mathrm{s}$ 到 $t=2\ \mathrm{s}$，与题面“$1\ \mathrm{s}$ 到 $3\ \mathrm{s}$”不符，系解答中的区间笔误；此处按题面重新计算。

**解：** $t=1$ 时 $\vec r_1=2\vec i+\vec j$，$t=3$ 时 $\vec r_3=6\vec i-7\vec j$，故
$$
\Delta\vec r=\vec r_3-\vec r_1=4\vec i-8\vec j\ \mathrm{m}.
$$
加速度
$$
\vec a=\frac{\mathrm{d}^{2}x}{\mathrm{d}t^{2}}\vec i+
\frac{\mathrm{d}^{2}y}{\mathrm{d}t^{2}}\vec j=-2\vec j\ \mathrm{m/s^{2}}.
$$
由 $x=2t$、$y=2-t^{2}$ 消去 $t$：
$$
y=2-\frac{x^{2}}{4}.
$$

## 题目 8 · 填空题 3

一质点沿半径为 $R$ 的圆周运动，运动学方程为 $s=v_0t-\dfrac12bt^{2}$，其中 $v_0$、$b$ 都是常数。$t$ 时刻，质点的加速度矢量 $\vec a=\underline{\qquad}$；加速度大小为 $b$ 时，质点沿圆周运行的圈数为 $\underline{\qquad}$。

**答案：$\vec a=\dfrac{(v_0-bt)^{2}}{R}\vec n-b\vec\tau$；$N=\dfrac{v_0^{2}}{4\pi Rb}$。**

**解：** 速率与切向加速度分别为
$$
v=\frac{\mathrm{d}s}{\mathrm{d}t}=v_0-bt,\qquad
a_{\tau}=\frac{\mathrm{d}v}{\mathrm{d}t}=-b .
$$
法向加速度
$$
a_{\mathrm{n}}=\frac{v^{2}}{R}=\frac{(v_0-bt)^{2}}{R}.
$$
故
$$
\vec a=a_{\mathrm{n}}\vec n+a_{\tau}\vec\tau
=\frac{(v_0-bt)^{2}}{R}\vec n-b\vec\tau .
$$
当 $|\vec a|=b$ 时，
$$
\sqrt{\left[\frac{(v_0-bt)^{2}}{R}\right]^{2}+b^{2}}=b
\ \Longrightarrow\ v_0-bt=0
\ \Longrightarrow\ t=\frac{v_0}{b}.
$$
此间路程
$$
\Delta s=s\!\left(\frac{v_0}{b}\right)-s(0)
=v_0\frac{v_0}{b}-\frac12b\left(\frac{v_0}{b}\right)^{2}
=\frac{v_0^{2}}{2b}.
$$
圈数
$$
N=\frac{\Delta s}{2\pi R}=\frac{v_0^{2}}{4\pi Rb}.
$$

## 题目 9 · 填空题 4

在相对地面静止的坐标系内，$A$、$B$ 二船都以 $2\ \mathrm{m\cdot s^{-1}}$ 的速率匀速行驶，$A$ 船沿 $x$ 轴正向，$B$ 船沿 $y$ 轴正向。今在 $A$ 船上设置与该坐标系方向相同的坐标系（$xy$ 方向的单位矢量为 $\vec i,\vec j$），那么在 $A$ 船上的坐标系中，$B$ 船的速度（以 $\mathrm{m\cdot s^{-1}}$ 为单位）为 $\underline{\qquad}$。

**答案：$-2\vec i+2\vec j$。**

**解：** 由相对速度变换
$$
\vec v_{BA}=\vec v_{B\text{地}}+\vec v_{\text{地}A}
=\vec v_{B\text{地}}-\vec v_{A\text{地}}.
$$
其中 $\vec v_{B\text{地}}=2\vec j$，$\vec v_{A\text{地}}=2\vec i$，所以
$$
\vec v_{BA}=-2\vec i+2\vec j\ \mathrm{m\cdot s^{-1}}.
$$

## 题目 10 · 填空题 5

一质点沿半径为 $0.1\ \mathrm{m}$ 的圆周运动，其用角坐标表示的运动学方程为 $\theta=2+4t^{3}$，$\theta$ 的单位为 $\mathrm{rad}$，$t$ 的单位为 $\mathrm{s}$。问 $t=2\ \mathrm{s}$ 时，质点的切向加速度 $\underline{\qquad}$，法向加速度 $\underline{\qquad}$；$\theta$ 等于 $\underline{\qquad}\ \mathrm{rad}$ 时，质点的加速度和半径的夹角为 $45^\circ$。

**答案：$4.8\ \mathrm{m/s^{2}}$；$230.4\ \mathrm{m/s^{2}}$；$2.67\ \mathrm{rad}$。**

> 校注：原详解第一空给的是通式 $a_{\tau}=24Rt$；题面问的是 $t=2\ \mathrm{s}$ 时的值，应为 $4.8\ \mathrm{m/s^{2}}$。

**解：** 角速度与角加速度分别为
$$
\omega=\frac{\mathrm{d}\theta}{\mathrm{d}t}=12t^{2},\qquad
\alpha=\frac{\mathrm{d}\omega}{\mathrm{d}t}=24t .
$$
故
$$
a_{\tau}=R\alpha=24Rt,\qquad
a_{\mathrm{n}}=R\omega^{2}=144Rt^{4}.
$$
$t=2\ \mathrm{s}$ 时
$$
a_{\tau}=24\times0.1\times2=4.8\ \mathrm{m/s^{2}},
$$
$$
a_{\mathrm{n}}=144\times0.1\times2^{4}=230.4\ \mathrm{m/s^{2}}.
$$
加速度与半径夹角为 $45^\circ$ 时 $a_{\mathrm{n}}=a_{\tau}$：
$$
144Rt^{4}=24Rt\ \Longrightarrow\ t^{3}=\frac16 .
$$
于是
$$
\theta=2+4t^{3}=2+\frac{4}{6}=2.67\ \mathrm{rad}.
$$

**三、计算题**

## 题目 11 · 计算题 1

一质点由静止开始做直线运动，初始加速度为 $a_0$，以后加速度均匀增加，每经过 $\tau$ 秒增加 $a_0$，求经过 $t$ 秒后质点的速度和位移。

**答案：$v=a_0t+\dfrac{a_0}{2\tau}t^{2}$；$x=\dfrac12a_0t^{2}+\dfrac{a_0}{6\tau}t^{3}$。**

**解：** 由题意，加速度随时间线性增长：
$$
a=a_0+\frac{a_0}{\tau}t .
$$
取 $t=0$ 时 $v_0=0$、$x_0=0$，积分
$$
v=\int_0^t a\,\mathrm{d}t
=\int_0^t\left(a_0+\frac{a_0}{\tau}t'\right)\mathrm{d}t'
=a_0t+\frac{a_0}{2\tau}t^{2},
$$
$$
x=\int_0^t v\,\mathrm{d}t'
=\int_0^t\left(a_0t'+\frac{a_0}{2\tau}t'^{2}\right)\mathrm{d}t'
=\frac12a_0t^{2}+\frac{a_0}{6\tau}t^{3}.
$$

## 题目 12 · 计算题 2

一质点以初速度 $v_0$ 作一维运动，所受阻力与其速率成正比，试求当质点速率为 $\dfrac{v_0}{n}$（$n>1$）时，质点经过的距离与质点所能行经的总距离之比。

**答案：$1-\dfrac1n$。**

**解：** 设阻力产生的加速度为 $a=-Kv$（$K>0$，把质量并入常数 $K$）。取初速方向为正，初始条件为 $t=0$ 时 $x=0$、$v=v_0$。

由
$$
\frac{\mathrm{d}v}{\mathrm{d}t}=-Kv
$$
分离变量并积分：
$$
\int_{v_0}^{v}\frac{\mathrm{d}v'}{v'}=-K\int_0^t\mathrm{d}t'
\ \Longrightarrow\
v=v_0e^{-Kt}.
$$
再积分求位移：
$$
x=\int_0^t v_0e^{-Kt'}\mathrm{d}t'
=\frac{v_0}{K}\left(1-e^{-Kt}\right).
$$
当 $t\to\infty$ 时 $v\to0$，质点行经的总距离
$$
x_{\max}=\frac{v_0}{K}.
$$
由 $v=v_0e^{-Kt}$ 得 $e^{-Kt}=v/v_0$，故
$$
\frac{x}{x_{\max}}=1-\frac{v}{v_0}.
$$
代入 $v=v_0/n$：
$$
\frac{x}{x_{\max}}=1-\frac1n .
$$
也可由 $a=v\dfrac{\mathrm{d}v}{\mathrm{d}x}=-Kv$ 得 $\mathrm{d}v=-K\mathrm{d}x$，直接得到 $v=v_0-Kx$，同样可得上述结果。

## 题目 13 · 计算题 3

一质点在 $xy$ 平面内的运动方程为 $x=6t$，$y=4t^{2}-8$（SI）。求 $t=1\ \mathrm{s}$ 时，质点的切向加速度 $a_{\tau}$ 与法向加速度 $a_{\mathrm{n}}$。

**答案：$a_{\tau}=6.4\ \mathrm{m\cdot s^{-2}}$；$a_{\mathrm{n}}=4.8\ \mathrm{m\cdot s^{-2}}$。**

**解：** 速度分量
$$
v_x=\frac{\mathrm{d}x}{\mathrm{d}t}=6,\qquad
v_y=\frac{\mathrm{d}y}{\mathrm{d}t}=8t,
$$
故
$$
v=\sqrt{36+64t^{2}}.
$$
切向加速度
$$
a_{\tau}=\frac{\mathrm{d}v}{\mathrm{d}t}
=\frac{64t}{\sqrt{36+64t^{2}}}
=\frac{32t}{\sqrt{9+16t^{2}}}.
$$
$t=1\ \mathrm{s}$ 时
$$
a_{\tau}=\frac{32}{5}=6.4\ \mathrm{m/s^{2}}.
$$
加速度分量
$$
a_x=0,\qquad a_y=8\ \mathrm{m/s^{2}},
$$
总加速度大小 $a=8\ \mathrm{m/s^{2}}$。于是
$$
a_{\mathrm{n}}=\sqrt{a^{2}-a_{\tau}^{2}}
=\sqrt{8^{2}-6.4^{2}}=4.8\ \mathrm{m/s^{2}}.
$$

## 题目 14 · 计算题 4

如图，一超音速歼击机在高空 $A$ 时的水平速率为 $1940\ \mathrm{km/h}$，沿近似于圆弧的曲线俯冲到点 $B$，其速率为 $2192\ \mathrm{km/h}$，所经历的时间为 $3\ \mathrm{s}$。设圆弧 $AB$ 的半径约为 $3.5\ \mathrm{km}$，且飞机从 $A$ 到 $B$ 的俯冲过程可视为匀变速率圆周运动，若不计重力加速度的影响，求：

（1）飞机在点 $B$ 的加速度；
（2）飞机由点 $A$ 到点 $B$ 所经历的路程。

**答案：（1）$a\approx109\ \mathrm{m/s^{2}}$，与法向成约 $12.4^\circ$；（2）$s\approx1722\ \mathrm{m}$。**

**解：** 先统一单位：
$$
v_A=1940\ \mathrm{km/h}=538.9\ \mathrm{m/s},\qquad
v_B=2192\ \mathrm{km/h}=608.9\ \mathrm{m/s}.
$$

（1）匀变速率圆周运动的切向加速度为常量：
$$
a_{\tau}=\frac{v_B-v_A}{t}
=\frac{608.9-538.9}{3}
=23.3\ \mathrm{m/s^{2}}.
$$
在 $B$ 点的法向加速度
$$
a_{\mathrm{n}}=\frac{v_B^{2}}{r}
=\frac{608.9^{2}}{3.5\times10^{3}}
=106\ \mathrm{m/s^{2}}.
$$
总加速度
$$
a=\sqrt{a_{\tau}^{2}+a_{\mathrm{n}}^{2}}
=\sqrt{23.3^{2}+106^{2}}
\approx109\ \mathrm{m/s^{2}}.
$$
与法向的夹角
$$
\beta=\arctan\frac{a_{\tau}}{a_{\mathrm{n}}}
=\arctan\frac{23.3}{106}
\approx12.4^\circ .
$$

（2）路程
$$
s=v_At+\frac12a_{\tau}t^{2}
=538.9\times3+\frac12\times23.3\times3^{2}
\approx1722\ \mathrm{m}.
$$
也可由转过的圆心角 $\Delta\theta=\dfrac{v_B-v_A}{a_{\tau}r}$ 及 $s=r\Delta\theta$ 得到同一结果。

## 题目 15 · 计算题 5

如图所示，一条宽度为 $d$ 的小河，已知河水的流速随着离开河岸的距离成正比地增加，靠两岸边河水的流速为零，而在河中心处流速最大，为 $v_0$。现有一人以不变的划船速度 $u$ 沿垂直于水流方向从岸边划船渡河，试求小船到达河心之前的运动轨迹。

**答案：$x=\dfrac{v_0}{ud}y^{2}$，轨迹为抛物线。**

**解：** 以出发点为原点，垂直河岸方向为 $y$ 轴，沿河方向为 $x$ 轴。到达河心前 $0\le y\le d/2$，流速
$$
v_{\text{w}}=ky .
$$
在河心 $y=d/2$ 处 $v_{\text{w}}=v_0$，故
$$
k=\frac{2v_0}{d},\qquad
v_{\text{w}}=\frac{2v_0}{d}y .
$$
小船速度分量
$$
v_x=v_{\text{w}}=\frac{2v_0}{d}y,\qquad
v_y=u .
$$
由 $y=ut$ 得 $y$ 与 $t$ 的关系，且
$$
\frac{\mathrm{d}x}{\mathrm{d}y}=\frac{v_x}{v_y}
=\frac{2v_0}{ud}y .
$$
积分并以 $x(0)=0$ 定常数：
$$
x=\frac{v_0}{ud}y^{2}.
$$
这是开口沿 $x$ 轴方向的抛物线。到达河心时 $y=d/2$，$x=\dfrac{v_0d}{4u}$。

若继续划向对岸，河心处的流速连续，轨迹切线连续。过河心后流速开始随 $y$ 减小，轨迹的弯曲方向随之改变。
