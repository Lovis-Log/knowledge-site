---
slug: "homework-02"
title: "第 2 次作业 · 质点动力学"
summary: "质点动力学的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "02"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "2 质点动力学习题.pdf", "url": "https://drive.google.com/file/d/1YIVmTzFn3MUPNvzsmJLAmkkFqKwjXwUy/view?usp=drivesdk"}, {"kind": "article", "title": "2 质点动力学习题详解.pdf", "url": "https://drive.google.com/file/d/1GtDiBLMksdUVb5cHfmAbgyAWrHKqAhyw/view?usp=drivesdk"}]
---

**一、选择题**

## 题目 1 · 选择题 1

如图一 1a 所示，$A$、$B$ 两物体由弹簧连接，竖直悬挂，开始静止。绳子刚被剪断时，$A$、$B$ 两物体的加速度分别为

（A）$a_A=g$，$a_B=g$；
（B）$a_A=g$，$a_B=2g$；
（C）$a_A=2g$，$a_B=0$；
（D）$a_A=g$，$a_B=0$。

![弹簧连接的 A、B](/course-materials/campus-basic-physics/figures/32-01.png)

**答案：C**

**解：** 剪断前系统静止，设弹簧伸长量为 $x_0$。对 $A$：
$$
T=Mg+kx_0,
$$
对 $B$：
$$
kx_0=Mg .
$$
剪断绳子的瞬间 $T$ 突变为零，但弹簧形变来不及改变，弹力仍为 $kx_0$。此时

$A$ 受重力 $Mg$ 与弹簧向下的拉力 $kx_0$：
$$
Mg+kx_0=2Mg=Ma_A
\ \Longrightarrow\ a_A=2g\ (\text{向下}).
$$
$B$ 受重力 $Mg$ 向下、弹簧拉力 $kx_0=Mg$ 向上，合力为零：
$$
a_B=0 .
$$

## 题目 2 · 选择题 2

一轻绳跨过一定滑轮，两端各系一重物，它们的质量分别为 $m_1$ 和 $m_2$，且 $m_1>m_2$（滑轮质量及一切摩擦均不计），此时系统的加速度大小为 $a$。今用一竖直向下的恒力 $F=m_1g$ 代替 $m_1$，系统的加速度大小为 $a'$，则有

（A）$a'=a$；（B）$a'>a$；（C）$a'<a$；（D）条件不足，无法确定。

**答案：B**

**解：** 原来两物体系在绳两端，设绳中张力为 $T$，取 $m_1$ 向下、$m_2$ 向上为正：
$$
m_1g-T=m_1a,\qquad T-m_2g=m_2a .
$$
消去 $T$：
$$
a=\frac{m_1-m_2}{m_1+m_2}g .
$$
改用恒力 $F=m_1g$ 拉绳的一端时，另一端仍是 $m_2$，绳中张力等于 $F$（轻绳、轻滑轮）：
$$
F-m_2g=m_2a'
\ \Longrightarrow\
a'=\frac{m_1-m_2}{m_2}g .
$$
因为 $m_2<m_1+m_2$，所以
$$
a'>a .
$$
原因是原来 $m_1$ 本身也要被加速，绳中张力小于 $m_1g$；改成恒力后，绳端获得完整的 $m_1g$。

## 题目 3 · 选择题 3

如图所示，系统置于以 $g/2$ 加速度上升的升降机内，$A$、$B$ 两物块质量均为 $m$，$A$ 所处桌面是水平的，绳子和定滑轮质量忽略不计。

（1）若忽略一切摩擦，则绳中张力为

（A）$mg$；（B）$mg/2$；（C）$2mg$；（D）$3mg/4$。

（2）若 $A$ 与桌面间的摩擦系数为 $\mu$（系统仍加速滑动），则绳中张力为

（A）$\mu mg$；（B）$3\mu mg/4$；
（C）$3(1+\mu)mg/4$；（D）$3(1-\mu)mg/4$。

> 原卷此处第二个“(C)”应为“(D)”，上列已按选项顺序更正。

![升降机内的 A、B 系统](/course-materials/campus-basic-physics/figures/32-02.png)

**答案：（1）D；（2）C。**

**解：** 取升降机为非惯性参考系，其向上加速度为 $a=g/2$，故等效重力加速度
$$
g_{\text{eff}}=g+a=\frac32g,
$$
方向竖直向下。设 $A$ 沿桌面向滑轮方向的加速度为 $a'$，则 $B$ 相对升降机向下的加速度也是 $a'$。

（1）无摩擦时：

对 $B$：
$$
m g_{\text{eff}}-T=ma' ,
$$
对 $A$：
$$
T=ma' .
$$
两式相加得 $2T=m g_{\text{eff}}$，所以
$$
T=\frac12m\cdot\frac32g=\frac34mg .
$$

（2）有摩擦时，$A$ 受桌面的支持力
$$
N=m g_{\text{eff}}=\frac32mg,
$$
摩擦力 $f=\mu N$ 阻碍 $A$ 滑动。对 $B$：
$$
m g_{\text{eff}}-T'=ma' ,
$$
对 $A$：
$$
T'-f=ma' .
$$
两式相加：
$$
m g_{\text{eff}}(1-\mu)=2ma'
\ \Longrightarrow\
a'=\frac12(1-\mu)g_{\text{eff}} .
$$
于是
$$
T'=ma'+f
=m\left[\frac12(1-\mu)g_{\text{eff}}+\mu g_{\text{eff}}\right]
=\frac12(1+\mu)m g_{\text{eff}}
=\frac34(1+\mu)mg .
$$

**二、填空题**

## 题目 4 · 填空题 1

沿半球型碗的光滑内面，质量为 $m$ 的小球以角速度 $\omega$ 在一水平面内作匀速圆周运动，碗的半径为 $R$，如图二 1a 所示。则该小球作圆周运动的水平面离碗底的高度 $H=\underline{\qquad}$。

![半球碗内的小球](/course-materials/campus-basic-physics/figures/32-03.png)

**答案：$H=R\left(1-\dfrac{g}{\omega^{2}R}\right)$（需 $\omega^{2}R>g$）。**

**解：** 设小球与球心的连线跟竖直方向夹角为 $\theta$，圆周半径
$$
r=R\sin\theta .
$$
小球受重力 $mg$ 与碗面的支持力 $N$。竖直方向
$$
N\cos\theta=mg,
$$
水平方向提供向心力
$$
N\sin\theta=m\omega^{2}r .
$$
两式相除：
$$
\tan\theta=\frac{\omega^{2}r}{g}
=\frac{\omega^{2}R\sin\theta}{g}
\ \Longrightarrow\
\cos\theta=\frac{g}{\omega^{2}R}.
$$
（非零 $\theta$ 要求 $\omega^{2}R>g$。）高度
$$
H=R-R\cos\theta
=R\left(1-\frac{g}{\omega^{2}R}\right).
$$

## 题目 5 · 填空题 2

质量为 $m$ 的质点在变力 $F=F_0(1-kt)$（$F_0$、$k$ 为常量）作用下沿 $Ox$ 轴作直线运动。若 $t=0$ 时，质点在坐标原点，速度为 $v_0$，则质点运动微分方程为 $\underline{\qquad}$；速度随时间变化规律为 $v=\underline{\qquad}$；质点运动学方程 $x=\underline{\qquad}$。

**答案：$\dfrac{\mathrm{d}^{2}x}{\mathrm{d}t^{2}}=\dfrac{F_0}{m}(1-kt)$；$v=v_0+\dfrac{F_0}{m}\left(t-\dfrac12kt^{2}\right)$；$x=v_0t+\dfrac{F_0}{2m}\left(t^{2}-\dfrac13kt^{3}\right)$。**

**解：** 由牛顿第二定律
$$
F=ma=m\frac{\mathrm{d}^{2}x}{\mathrm{d}t^{2}},
$$
得运动微分方程
$$
\frac{\mathrm{d}^{2}x}{\mathrm{d}t^{2}}=\frac{F_0}{m}(1-kt).
$$
积分一次，并用 $v(0)=v_0$：
$$
v=v_0+\int_0^t\frac{F_0}{m}(1-kt')\,\mathrm{d}t'
=v_0+\frac{F_0}{m}\left(t-\frac12kt^{2}\right).
$$
再积分，并用 $x(0)=0$：
$$
x=\int_0^t v\,\mathrm{d}t'
=v_0t+\frac{F_0}{2m}\left(t^{2}-\frac13kt^{3}\right).
$$

**三、计算题**

## 题目 6 · 计算题 1

在光滑的水平桌面上有一根质量均匀分布的细绳，质量为 $m$、长度为 $L$，其一端系一质量为 $M$ 的物体，另一端施加一水平拉力 $F$，如图三 1a 所示。试求：

（1）细绳作用于物体上的力；
（2）绳上离左端点 $x$ 处的张力 $T$。

![桌面上的物体与细绳](/course-materials/campus-basic-physics/figures/32-04.png)

**答案：（1）$T_0=\dfrac{M}{m+M}F$；（2）$T(x)=\dfrac{F}{m+M}\left(M+\dfrac{m}{L}x\right)$。**

**解：** （1）物体与绳不可伸长，整体加速度相同。对整体：
$$
a=\frac{F}{m+M}.
$$
对物体 $M$：
$$
T_0=Ma=\frac{M}{m+M}F .
$$
在一般情况下 $T_0<F$；只有绳的质量可忽略（$m\to0$）时才有 $T_0\approx F$。

（2）在离左端 $x$ 处取截面，截面左侧包括物体 $M$ 和长度为 $x$ 的一段绳，其总质量
$$
M+\frac{m}{L}x .
$$
该部分整体以加速度 $a$ 运动，故截面处的张力
$$
T(x)=\left(M+\frac{m}{L}x\right)a
=\frac{F}{m+M}\left(M+\frac{m}{L}x\right).
$$
校验：$x=0$ 时 $T=T_0=\dfrac{MF}{m+M}$；$x=L$ 时 $T=F$，符合边界条件。

## 题目 7 · 计算题 2

如图三 2a，把质量 $m=10\ \mathrm{kg}$ 的物体放在倾角为 $\alpha$ 的斜面上，$\tan\alpha=0.1$，物体与斜面的静摩擦系数为 $\mu_s=0.4$。求要把物体往上拉动所需的最小拉力 $\vec F$ 的大小与方向满足的条件。（假设拉力与斜面的夹角为 $\theta$）

![斜面上的拉力](/course-materials/campus-basic-physics/figures/32-05.png)

**答案：$F\ge45.3\ \mathrm{N}$，方向与斜面成 $\theta=21.8^\circ$ 向上（在斜面与法线之间）。**

**解：** 取沿斜面向上为 $x$ 轴、垂直斜面向外为 $y$ 轴。刚要向上滑动时，摩擦力沿斜面向下并达到最大值 $f_r=\mu_sN$。平衡方程（临界状态）为
$$
F\cos\theta-mg\sin\alpha-f_r=0,
$$
$$
N+F\sin\theta-mg\cos\alpha=0,
$$
$$
f_r=\mu_sN .
$$
解得
$$
F=\frac{mg(\sin\alpha+\mu_s\cos\alpha)}
{\cos\theta+\mu_s\sin\theta}.
$$
分子与 $\theta$ 无关，故 $F$ 最小时分母最大。令
$$
\frac{\mathrm{d}}{\mathrm{d}\theta}
\left(\cos\theta+\mu_s\sin\theta\right)
=-\sin\theta+\mu_s\cos\theta=0,
$$
得
$$
\tan\theta=\mu_s=0.4
\ \Longrightarrow\
\theta=21.8^\circ .
$$
由 $\tan\alpha=0.1$ 得
$$
\sin\alpha=0.0995,\qquad \cos\alpha=0.995 .
$$
代入：
$$
F_{\min}
=\frac{10\times9.8\times(0.0995+0.4\times0.995)}
{\sqrt{1+0.4^{2}}}
=\frac{48.8}{1.077}
=45.3\ \mathrm{N}.
$$
因此要把物体往上拉动，需
$$
F\ge45.3\ \mathrm{N},
$$
且拉力方向取与斜面成 $21.8^\circ$ 向上时最省力。此时 $F\sin\theta\approx16.8\ \mathrm{N}<mg\cos\alpha\approx97.5\ \mathrm{N}$，物体不会离开斜面，解有效。

## 题目 8 · 计算题 3

质量为 $m$ 的石块，以初速 $v_0$ 垂直上抛，设空气阻力为 $f_r=-kv$（$k$ 为比例常数），试求石块上升到最高点所需的时间。

**答案：$t=\dfrac{m}{k}\ln\left(1+\dfrac{kv_0}{mg}\right)$。**

**解：** 取竖直向上为 $y$ 轴正方向。上升过程中石块受重力 $mg$ 向下、阻力 $kv$ 向下，运动方程
$$
-mg-kv=m\frac{\mathrm{d}v}{\mathrm{d}t}.
$$
分离变量：
$$
\mathrm{d}t=\frac{m\,\mathrm{d}v}{-mg-kv}.
$$
从 $t=0$（$v=v_0$）积分到最高点（$v=0$）：
$$
t=\int_{v_0}^{0}\frac{m\,\mathrm{d}v}{-mg-kv}
=-\frac{m}{k}\left[\ln(mg+kv)\right]_{v_0}^{0}
=\frac{m}{k}\ln\left(1+\frac{kv_0}{mg}\right).
$$
到达最高点后石块开始下落，阻力方向改变，运动方程随之改变；本题只求上升时间。
