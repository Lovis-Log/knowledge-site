---
slug: "homework-03"
title: "第 3 次作业 · 动量与角动量"
summary: "动量与角动量的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "03"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "3 动量与角动量.pdf", "url": "https://drive.google.com/file/d/1RG9PNaK1sQXad8g8yBR_9Z78jjYghH8x/view?usp=drivesdk"}, {"kind": "article", "title": "3 动量与角动量 (1).pdf", "url": "https://drive.google.com/file/d/1FzviTpG8PSoMi5kpT9RSb6glBkPJClg2/view?usp=drivesdk"}]
---

## 一、选择题

### 题目 1 · 选择题 1

<!-- homework-topic: 圆锥摆的张力在一周内的冲量 -->

如图所示，圆锥摆摆球质量为 $m$，以匀速率 $v$ 在水平面内作圆周运动，圆周半径为 $R$，则此球环绕一周过程中张力的冲量大小为

（A）$\dfrac{mg}{\tan\theta}\dfrac{2\pi R}{v}$；
（B）$\dfrac{mg}{\sin\theta}\dfrac{2\pi R}{v}$；
（C）$\dfrac{mg}{\cos\theta}\dfrac{2\pi R}{v}$；
（D）$mg\dfrac{2\pi R}{v}$。

![圆锥摆](/course-materials/campus-basic-physics/figures/33-01.png)

**答案：D**

**解：** 摆球受重力 $mg$ 与张力 $T$。竖直方向无加速度：
$$
T\cos\theta=mg .
$$
运动一周的时间（周期）
$$
\tau=\frac{2\pi R}{v}.
$$
张力大小虽不变，但方向时刻改变，不能直接用 $I=T\tau$ 作标量相乘。将张力分解：水平分量 $T\sin\theta$ 在一周内各方向对称，冲量矢量和为零；竖直分量 $T\cos\theta=mg$ 恒定向上。故合冲量
$$
\vec I_T=mg\,\tau\,\vec j
=mg\frac{2\pi R}{v}\,\vec j,
$$
大小为 $mg\dfrac{2\pi R}{v}$，方向竖直向上。

也可用动量定理：一周后摆球回到原状态，动量变化为零，故重力冲量与张力冲量等大反向。重力冲量
$$
\vec I_P=-mg\frac{2\pi R}{v}\,\vec j,
$$
于是
$$
\vec I_T=-\vec I_P=+mg\frac{2\pi R}{v}\,\vec j,
$$
方向竖直向上。

### 题目 2 · 选择题 2

<!-- homework-topic: 质点组动量、动能与机械能改变的判断 -->

对质点组有以下几种说法：

（1）质点组总动量的改变与内力无关；
（2）质点组总动能的改变与保守内力无关；
（3）质点组机械能的改变与保守内力无关。

在上述说法中，

（A）只有（1）是正确的；
（B）（1）、（3）是正确的；
（C）（1）、（2）是正确的；
（D）（2）、（3）是正确的。

**答案：B**

**解：** （1）正确。质点组总动量的改变只由合外力决定，内力总是成对出现、矢量和为零。

（2）错误。总动能的改变等于所有力（含内力）做功之和；保守内力（如重力、弹力）同样会改变系统的总动能。

（3）正确。机械能的改变等于非保守力做功之和；保守内力做功只引起动能与势能之间的转化，在机械能总量中相互抵消。

因此（1）、（3）正确，选 B。

### 题目 3 · 选择题 3

<!-- homework-topic: 沙子落到水平传送带上所受作用力的方向 -->

沙子从 $h=0.8\ \mathrm{m}$ 高处落到以 $3\ \mathrm{m/s}$ 速度水平向右运动的传送带上。取 $g=10\ \mathrm{m/s^{2}}$，则传送带给予沙子的作用力的方向

（A）与水平夹角 $53^\circ$ 向下；
（B）与水平夹角 $53^\circ$ 向上；
（C）与水平夹角 $37^\circ$ 向上；
（D）与水平夹角 $37^\circ$ 向下。

**答案：B**

**解：** 沙子落到传送带前的速度竖直向下，大小
$$
v_0=\sqrt{2gh}=\sqrt{2\times10\times0.8}=4\ \mathrm{m/s}.
$$
落到传送带上后，沙子水平速度变为 $v=3\ \mathrm{m/s}$（向右），竖直速度变为零。取向右为 $x$ 正方向、向上为 $y$ 正方向，则速度变化
$$
\Delta\vec v=(3-0)\vec i+\left[0-(-4)\right]\vec j
=3\vec i+4\vec j\ \mathrm{m/s}.
$$
传送带给予沙子的冲量 $\vec I=m\Delta\vec v$ 与 $\Delta\vec v$ 同向，故作用力方向与水平夹角
$$
\tan\alpha=\frac{4}{3}
\ \Longrightarrow\
\alpha=53^\circ,
$$
指向右上方。

### 题目 4 · 选择题 4

<!-- homework-topic: $\alpha$ 粒子被金核散射时动量与角量是否守恒 -->

一个 $\alpha$ 粒子飞过一个金原子核被散射，金核基本未动，在这一过程中，对金核中心来说，$\alpha$ 粒子的动量和角动量

（A）动量守恒，角动量守恒；
（B）动量不守恒，角动量守恒；
（C）动量守恒，角动量不守恒；
（D）动量不守恒，角动量不守恒。

**答案：B**

**解：** 以金核中心为参考点，$\alpha$ 粒子受到的是金核的有心力（库仑斥力），力的作用线始终通过金核中心，故力矩为零：
$$
\vec M=\vec r\times\vec F=0
\ \Longrightarrow\
\frac{\mathrm{d}\vec L}{\mathrm{d}t}=0,
$$
角动量守恒。

但 $\alpha$ 粒子还受到金核的斥力这一外力，动量不守恒（只有把金核也包括进系统，总动量才守恒）。故动量不守恒、角动量守恒，选 B。

## 二、填空题

### 题目 5 · 填空题 1

<!-- homework-topic: 与光滑斜面弹性碰撞时球对斜面的冲量与方向 -->

如图二 2a 所示，质量为 $M$ 的小球，自距离斜面高度为 $h$ 处自由下落到倾角为 $30^\circ$ 的光滑固定斜面上，设碰撞是完全弹性的，则小球对斜面的冲量的大小为 $\underline{\qquad}$，方向为 $\underline{\qquad}$。

![小球落到斜面上](/course-materials/campus-basic-physics/figures/33-02.png)

**答案：$I'=M\sqrt{6gh}$，方向垂直于斜面指向斜面下方。**

**解：** 小球与斜面碰撞前的速度竖直向下，大小
$$
v_1=\sqrt{2gh}.
$$
将速度分解为沿斜面和垂直斜面两个方向：垂直斜面向里的分量为 $v_1\cos30^\circ$，沿斜面向下的分量为 $v_1\sin30^\circ$。

斜面对小球的冲量沿法线方向。完全弹性碰撞且斜面固定，小球沿斜面方向的速度不变，垂直斜面的速度反向、大小不变。故小球动量变化的大小为
$$
\Delta p=2Mv_1\cos30^\circ
=2M\sqrt{2gh}\cdot\frac{\sqrt3}{2}
=M\sqrt{6gh}.
$$
斜面对小球的冲量方向垂直斜面向外（向上）；由牛顿第三定律，小球对斜面的冲量大小相等、方向相反，即
$$
I'=M\sqrt{6gh},
$$
方向垂直于斜面指向斜面下方。

### 题目 6 · 填空题 2

<!-- homework-topic: 变力 $12t$ 的冲量与质点末速度 -->

如图所示，质量 $m=2.0\ \mathrm{kg}$ 的质点，受合力 $\vec F=12t\,\vec i$ 的作用，沿 $Ox$ 轴作直线运动。已知 $t=0$ 时 $x_0=0$，$v_0=0$，则从 $t=0$ 到 $t=3\ \mathrm{s}$ 这段时间内，合力 $\vec F$ 的冲量 $\vec I$ 为 $\underline{\qquad}$；质点的末速度大小为 $v=\underline{\qquad}$。

**答案：$\vec I=54\ \mathrm{N\cdot s}\,\vec i$；$v=27\ \mathrm{m/s}$。**

**解：** 由冲量定义
$$
\vec I=\int_0^3\vec F\,\mathrm{d}t
=\int_0^3 12t\,\vec i\,\mathrm{d}t
=\left.6t^{2}\right|_0^3\vec i
=54\ \mathrm{N\cdot s}\,\vec i .
$$
由动量定理 $\vec I=m\vec v-m\vec v_0$，且 $v_0=0$：
$$
v=\frac{I}{m}=\frac{54}{2}=27\ \mathrm{m/s}.
$$
也可先由 $a=F/m=6t$ 积分得 $v=3t^{2}$，$t=3\ \mathrm{s}$ 时 $v=27\ \mathrm{m/s}$。

### 题目 7 · 填空题 3

<!-- homework-topic: 连发步枪射击时对肩部的平均压力 -->

自动步枪连发时每分钟射出 $120$ 发子弹，每颗子弹质量为 $0.79\ \mathrm{g}$，出口速率为 $735\ \mathrm{m/s}$，射击时（以分钟计）枪托对肩部的平均压力为 $\underline{\qquad}$。

**答案：$1.16\ \mathrm{N}$。**

> 校注：原详解答案行印为 $11.6\ \mathrm{N}$，代入式也将单颗质量误写为 $0.0079\ \mathrm{kg}$。按题给 $0.79\ \mathrm{g}=7.9\times10^{-4}\ \mathrm{kg}$ 计算，得 $1.16\ \mathrm{N}$。

**解：** 一分钟内射出的子弹总质量
$$
M=120\times0.79\ \mathrm{g}=94.8\ \mathrm{g}=9.48\times10^{-2}\ \mathrm{kg}.
$$
这些子弹获得的动量
$$
p=Mv=9.48\times10^{-2}\times735
=69.7\ \mathrm{kg\cdot m/s}.
$$
由动量定理，枪托对肩的平均压力（大小等于肩对枪的平均反作用力）
$$
F=\frac{p}{\Delta t}
=\frac{69.7}{60}
=1.16\ \mathrm{N}.
$$
也可直接写成
$$
F=\frac{Nmv}{\Delta t}
=\frac{120\times0.79\times10^{-3}\times735}{60}
=1.16\ \mathrm{N}.
$$

### 题目 8 · 填空题 4

<!-- homework-topic: 先后自由释放两石子时系统的质心速度与加速度 -->

在楼顶释放一质量 $m_1=20\ \mathrm{g}$ 的石子后，$1\ \mathrm{s}$ 末又自同一点释放另一质量为 $m_2=50\ \mathrm{g}$ 的石子，在前者释放后的 $t$（$>1$）$\mathrm{s}$ 末这两个石子系统的质心速度为 $\underline{\qquad}$，加速度为 $\underline{\qquad}$。

**答案：$v_c=\left(t-\dfrac57\right)g$，方向竖直向下；$a_c=g$，方向竖直向下。**

**解：** 取竖直向下为正。$t$ 时刻（$t>1\ \mathrm{s}$）两石子速度分别为
$$
v_1=gt,\qquad v_2=g(t-1).
$$
质心速度
$$
v_c=\frac{m_1v_1+m_2v_2}{m_1+m_2}
=\frac{20gt+50g(t-1)}{20+50}
=\frac{70gt-50g}{70}
=\left(t-\frac57\right)g .
$$
两石子都只受重力，加速度均为 $g$ 向下，故质心加速度
$$
a_c=\frac{m_1a_1+m_2a_2}{m_1+m_2}=g .
$$

## 三、计算题

### 题目 9 · 计算题 1

<!-- homework-topic: 定滑轮—动滑轮系统中各物体的加速度与两绳张力 -->

图中 $A$ 为定滑轮，$B$ 为动滑轮，三个物体 $m_1=200\ \mathrm{g}$，$m_2=100\ \mathrm{g}$，$m_3=50\ \mathrm{g}$，滑轮及绳的质量以及摩擦均忽略不计。求：

（1）每个物体的加速度；
（2）两根绳子的张力 $T_1$ 与 $T_2$。

![定滑轮与动滑轮系统](/course-materials/campus-basic-physics/figures/33-03.png)

**答案：$a_1=\dfrac{g}{5}$（向下），$a_2=\dfrac{g}{5}$（向下），$a_3=\dfrac{3g}{5}$（向上）；$T_1=0.16g=1.568\ \mathrm{N}$，$T_2=0.08g=0.784\ \mathrm{N}$。**

**解：** 设跨过定滑轮 $A$ 的绳中张力为 $T_1$，跨过动滑轮 $B$ 的绳中张力为 $T_2$。$m_1$ 向下运动，加速度为 $a_1$；$B$ 向上运动，加速度也为 $a_1$。设 $m_2$ 相对 $B$ 向下、$m_3$ 相对 $B$ 向上的加速度为 $a_2'$。

取竖直向下为正。各物体的绝对加速度为：

$m_1$：$a_1$（向下）；
$m_2$：$a_2'-a_1$（向下）；
$m_3$：$-a_2'-a_1$（即向上 $a_2'+a_1$）。

对 $m_1$：
$$
m_1g-T_1=m_1a_1 .
$$
对 $m_2$：
$$
m_2g-T_2=m_2(a_2'-a_1).
$$
对 $m_3$：
$$
m_3g-T_2=m_3(-a_2'-a_1).
$$
动滑轮 $B$ 质量不计，受两段绳向上拉，故
$$
2T_2-T_1=0 .
$$
代入 $m_1=0.2\ \mathrm{kg}$、$m_2=0.1\ \mathrm{kg}$、$m_3=0.05\ \mathrm{kg}$，解得
$$
a_1=\frac{g}{5},\qquad
a_2'=\frac{2g}{5},\qquad
T_1=0.16g,\qquad
T_2=0.08g .
$$
于是
$$
a_2=a_2'-a_1=\frac{g}{5}\ (\text{向下}),
$$
$$
a_3=-(a_2'+a_1)=-\frac{3g}{5}
\ (\text{即 } \frac{3g}{5}\text{ 向上}).
$$
取 $g=9.8\ \mathrm{m/s^{2}}$：
$$
T_1=1.568\ \mathrm{N},\qquad T_2=0.784\ \mathrm{N}.
$$

### 题目 10 · 计算题 2

<!-- homework-topic: 人同向、迎面跳上小车后的共同速度 -->

质量为 $60\ \mathrm{kg}$ 的人以 $8\ \mathrm{km/h}$ 的速度从后面跳上一辆质量为 $80\ \mathrm{kg}$、速度为 $2.9\ \mathrm{km/h}$ 的小车，试问小车的速度将变为多大？如果人迎面跳上小车，结果又怎样？

**答案：从后面跳上时 $v=5.09\ \mathrm{km/h}$，方向沿原车前进方向；迎面跳上时 $v'=-1.77\ \mathrm{km/h}$，即方向与原车前进方向相反。**

**解：** 人跳上小车的过程中，人与车组成的系统在水平方向动量守恒。

（1）人从后面跳上，人与车同向运动。设共同速度为 $v$：
$$
m_1v_1+m_2v_2=(m_1+m_2)v,
$$
$$
v=\frac{60\times8+80\times2.9}{60+80}
=\frac{712}{140}
=5.09\ \mathrm{km/h}.
$$

（2）人迎面跳上，取车原方向为正，人的速度为 $-v_1$：
$$
m_2v_2-m_1v_1=(m_1+m_2)v',
$$
$$
v'=\frac{80\times2.9-60\times8}{140}
=\frac{232-480}{140}
=-1.77\ \mathrm{km/h}.
$$
负号表示共同速度与原车前进方向相反。

### 题目 11 · 计算题 3

<!-- homework-topic: 弹力在四分之一周期内施于小球的冲量 -->

一小球在弹簧的作用下振动（如图所示），弹力 $F=-kx$，而位移 $x=A\cos\omega t$，其中 $k$、$A$、$\omega$ 都是常量。求在 $t=0$ 到 $t=\pi/(2\omega)$ 的时间间隔内弹力施于小球的冲量。

![弹簧振子](/course-materials/campus-basic-physics/figures/33-04.png)

**答案：$I=-\dfrac{kA}{\omega}$。**

**解：** 解法一（按冲量定义）：
$$
I=\int_0^{\pi/(2\omega)}F\,\mathrm{d}t
=\int_0^{\pi/(2\omega)}(-kA\cos\omega t)\,\mathrm{d}t
=-\frac{kA}{\omega}\left.\sin\omega t\right|_0^{\pi/(2\omega)}
=-\frac{kA}{\omega}.
$$
负号表示冲量方向与 $x$ 轴正方向相反。

解法二（用动量定理）：速度
$$
v=\frac{\mathrm{d}x}{\mathrm{d}t}=-A\omega\sin\omega t .
$$
$t=0$ 时 $v_0=0$；$t=\pi/(2\omega)$ 时
$$
v=-A\omega\sin\frac{\pi}{2}=-A\omega .
$$
由 $I=mv-mv_0=-mA\omega$，并利用 $\omega^{2}=k/m$：
$$
I=-mA\omega=-\frac{kA}{\omega}.
$$

### 题目 12 · 计算题 4

<!-- homework-topic: 一级火箭分离后火箭壳与仪器舱的速度 -->

运载火箭的最后一级以 $v_0=7600\ \mathrm{m/s}$ 速率飞行。这一级由一个质量为 $m_1=290\ \mathrm{kg}$ 的火箭壳和一个质量为 $m_2=150\ \mathrm{kg}$ 的仪器舱扣在一起。当扣松开后，二者间的压缩弹簧使二者分离，这时二者的相对速率为 $u=910\ \mathrm{m/s}$。设所有速度都在同一直线上，求两部分分开后各自的速度。

**答案：火箭壳 $v_1=7290\ \mathrm{m/s}$；仪器舱 $v_2=8200\ \mathrm{m/s}$，均沿原飞行方向。**

**解：** 取原飞行方向为正。分离过程中系统在飞行方向不受外力，动量守恒：
$$
(m_1+m_2)v_0=m_1v_1+m_2v_2 .
$$
二者分离后的相对速率
$$
u=v_2-v_1 .
$$
联立解得
$$
v_1=v_0-\frac{m_2u}{m_1+m_2}
=7600-\frac{150\times910}{290+150}
=7600-310.2
=7289.8\ \mathrm{m/s}
\approx7290\ \mathrm{m/s},
$$
$$
v_2=u+v_1=910+7290=8200\ \mathrm{m/s}.
$$
两者方向均与原飞行方向相同，仪器舱在前、火箭壳在后。
