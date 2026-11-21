---
slug: "homework-04"
title: "第 4 次作业（功和能）"
summary: "功和能的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "04"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "4 功和能.pdf", "url": "https://drive.google.com/file/d/1qoj1mPIkA9PfteFwqg0OPEKYS76Akt01/view?usp=drivesdk"}, {"kind": "article", "title": "4 功和能 (1).pdf", "url": "https://drive.google.com/file/d/1TGYhF8SxEHgSVM3TND6xSM8HKTAF6Toe/view?usp=drivesdk"}]
---

## 一、选择题

### 题目 1 · 选择题 1

<!-- homework-topic: 阻力正比于深度时第二次敲入的深度 -->

用铁锤把质量很小的钉子敲入木板，设木板对钉子的阻力与钉子进入木板的深度成正比。在铁锤敲打第一次时，能把钉子敲入 $1.00\ \mathrm{cm}$。如果铁锤第二次敲打的速度与第一次完全相同，那么第二次敲入的深度为

（A）$0.41\ \mathrm{cm}$；（B）$0.50\ \mathrm{cm}$；（C）$0.73\ \mathrm{cm}$；（D）$1.00\ \mathrm{cm}$。

**答案：A**

**解：** 设阻力 $f=kx$，铁锤每次做功使钉子获得相同的初动能 $E_k$。第一次钉子从 $0$ 进入 $x_1=1.00\ \mathrm{cm}$，阻力做功
$$
\frac12kx_1^{2}=E_k .
$$
第二次从 $x_1$ 进入 $x_2$，阻力做功
$$
\frac12k\left(x_2^{2}-x_1^{2}\right)=E_k .
$$
两式相减得
$$
x_2^{2}=2x_1^{2}
\ \Longrightarrow\
x_2=\sqrt2\,x_1 .
$$
第二次敲入的深度
$$
\Delta x=x_2-x_1=(\sqrt2-1)x_1
=0.414\times1.00\ \mathrm{cm}
\approx0.41\ \mathrm{cm}.
$$

### 题目 2 · 选择题 2

<!-- homework-topic: 缓慢拉绳提起物体过程中外力做的功 -->

如图，外力 $F$ 通过刚性轻绳和一轻弹簧（$k=200\ \mathrm{N\cdot m^{-1}}$）缓慢地拉地面上的物体，已知物体的质量为 $M=2\ \mathrm{kg}$，滑轮的质量和摩擦不计，刚开始时弹簧为原长。当绳子被拉下 $0.2\ \mathrm{m}$ 的过程中，外力 $F$ 作的功为（$g$ 取 $10\ \mathrm{m\cdot s^{-2}}$）

（A）$1\ \mathrm{J}$；（B）$2\ \mathrm{J}$；（C）$3\ \mathrm{J}$；（D）$4\ \mathrm{J}$。

![绳、弹簧与滑轮](/course-materials/campus-basic-physics/figures/34-01.png)

**答案：C**

**解：** 物体刚被提起时，弹簧拉力等于重力：
$$
kx_m=Mg
\ \Longrightarrow\
x_m=\frac{Mg}{k}=\frac{2\times10}{200}=0.1\ \mathrm{m}.
$$
绳子被拉下 $0.2\ \mathrm{m}$，其中前 $0.1\ \mathrm{m}$ 使弹簧由原长伸长到 $x_m$（物体仍在地面），后 $0.1\ \mathrm{m}$ 使物体升高 $0.1\ \mathrm{m}$。

外力做功等于系统机械能的增加：
$$
A=\frac12kx_m^{2}+Mg(0.2-x_m)
=\frac12\times200\times0.1^{2}+20\times0.1
=1+2=3\ \mathrm{J}.
$$
也可直接对绳端拉力积分：前段 $T=kx$，平均拉力 $10\ \mathrm{N}$，做功 $10\times0.1=1\ \mathrm{J}$；后段 $T=Mg=20\ \mathrm{N}$，做功 $20\times0.1=2\ \mathrm{J}$；合计 $3\ \mathrm{J}$。

### 题目 3 · 选择题 3

<!-- homework-topic: 可动斜面上物块下滑时动能关系的判断 -->

如图，质量为 $m$ 的物体 $B$ 放在光滑斜面 $A$（质量为 $M$）上。二者最初静止于一个光滑水平面上。有人以 $A$ 为参考系，认为 $B$ 下落高度为 $h$ 时，$B$ 相对于 $A$ 的速率 $u$ 满足
$$
mgh=\frac12mu^{2},
$$
这个公式

（A）对；

（B）错，正确应为 $mgh=\dfrac12mu^{2}\left[1+\dfrac{Mm\cos^{2}\theta}{(M+m)^{2}}\right]$；

（C）错，正确应为 $mgh=\dfrac12(m+M)u^{2}$；

（D）错，正确应为 $mgh=\dfrac12mu^{2}\left[1+\dfrac{Mm}{(M+m)^{2}}\right]$。

![斜面上的 B 与可动的 A](/course-materials/campus-basic-physics/figures/34-02.png)

**答案：按图示的光滑水平面模型，四个选项均无正确公式。** 正确关系为 $mgh=\tfrac12mu^2[1-m\cos^2\theta/(M+m)]$。

> 校注：题卷文字误写为“光滑斜面”，图中楔块底面水平。原详解把 B 标为答案，其计算只将楔块动能加到物体相对楔块的动能上。物体的对地动能应由对地速度求得，其中还包括楔块速度项和速度的交叉项。

**解：** 设某时刻 $A$ 向右的速度为 $V$，$B$ 相对 $A$ 沿斜面向下的速度为 $u$。取水平向右为正，则 $B$ 对地的速度分量为
$$
v_{Bx}=V-u\cos\theta,\qquad v_{By}=-u\sin\theta .
$$
系统水平方向不受外力，动量守恒（初始静止）：
$$
MV+m(V-u\cos\theta)=0
\ \Longrightarrow\
V=\frac{mu\cos\theta}{M+m}.
$$
于是
$$
v_{Bx}=V-u\cos\theta
=-\frac{Mu\cos\theta}{M+m}.
$$
系统机械能守恒：
$$
mgh=\frac12MV^{2}+\frac12m\left(v_{Bx}^{2}+v_{By}^{2}\right).
$$
代入 $V$ 与 $v_{Bx}$：
$$
mgh=\frac12m u^{2}
\left[
\frac{Mm\cos^{2}\theta}{(M+m)^{2}}
+\frac{M^{2}\cos^{2}\theta}{(M+m)^{2}}
+\sin^{2}\theta
\right].
$$
合并前两项：
$$
\frac{Mm+M^{2}}{(M+m)^{2}}\cos^{2}\theta
=\frac{M}{M+m}\cos^{2}\theta,
$$
故
$$
mgh=\frac12mu^{2}
\left[\sin^{2}\theta+\frac{M}{M+m}\cos^{2}\theta\right]
=\frac12mu^{2}
\left[1-\frac{m\cos^{2}\theta}{M+m}\right].
$$
这也给出
$$
u=\sqrt{\frac{2gh(M+m)}{M+m\sin^{2}\theta}}.
$$
极限校验：$M\to\infty$ 时 $u\to\sqrt{2gh}$，退化为固定斜面；$M\to0$ 时 $u\to\sqrt{2gh}/\sin\theta$，$B$ 几乎竖直下落，均合理。

## 二、填空题

### 题目 4 · 填空题 1

<!-- homework-topic: 子弹射入砂箱的平均阻力与系统损失的机械能 -->

质量为 $m$ 的子弹，以水平速度 $v_0$ 射入置于光滑水平面上的质量为 $M$ 的静止砂箱，子弹在砂箱中前进距离 $l$ 后停在砂箱中，同时砂箱向前运动的距离为 $S$，此后子弹与砂箱一起以共同速度匀速运动，则子弹受到的平均阻力 $F=\underline{\qquad}$；砂箱与子弹系统损失的机械能 $\Delta E=\underline{\qquad}$。

**答案：$F=\dfrac{mM(2m+M)v_0^{2}}{2(m+M)^{2}(l+S)}$；$\Delta E=\dfrac{Mm}{2(M+m)}v_0^{2}$。**

**解：** 设共同速度为 $v$。水平方向动量守恒：
$$
mv_0=(m+M)v
\ \Longrightarrow\
v=\frac{m}{m+M}v_0 .
$$
子弹相对地面移动 $l+S$，阻力对其做功 $-F(l+S)$。由动能定理：
$$
-F(l+S)=\frac12mv^{2}-\frac12mv_0^{2}.
$$
代入 $v$：
$$
F(l+S)=\frac12mv_0^{2}
\left[1-\frac{m^{2}}{(m+M)^{2}}\right]
=\frac12mv_0^{2}
\frac{M(2m+M)}{(m+M)^{2}},
$$
所以
$$
F=\frac{mM(2m+M)v_0^{2}}{2(m+M)^{2}(l+S)}.
$$
系统损失的机械能
$$
\Delta E=\frac12mv_0^{2}-\frac12(m+M)v^{2}
=\frac12mv_0^{2}
\left[1-\frac{m}{m+M}\right]
=\frac{Mm}{2(M+m)}v_0^{2}.
$$
> 上式的平均是按子弹对地位移 $l+S$ 加权的。用砂箱位移 $S$ 列式求的是按砂箱位移加权的平均作用力，按相对位移 $l$ 加权则得到 $\Delta E/l$。阻力随过程变化时，应明确所采用的平均定义。

### 题目 5 · 填空题 2

<!-- homework-topic: 弹簧推物体后在水平面上滑停，求摩擦系数 -->

一轻质弹簧的劲度系数为 $k=100\ \mathrm{N/m}$，用手推一质量 $m=0.1\ \mathrm{kg}$ 的物体 $A$ 把弹簧压缩到离平衡位置为 $x_1=0.02\ \mathrm{m}$，如图所示。放手后，物体沿水平面移动距离 $x_2=0.1\ \mathrm{m}$ 后停止。求物体与水平面间的滑动摩擦系数为 $\underline{\qquad}$。

![压缩弹簧推动物体](/course-materials/campus-basic-physics/figures/34-03.png)

**答案：$0.2$**

**解：** 物体从释放到停止，弹簧弹力做正功、摩擦力做负功。物体离开弹簧后弹力不再作用，故弹力总功为
$$
A_k=\frac12kx_1^{2}.
$$
摩擦力全程做功
$$
A_f=-\mu mgx_2 .
$$
由动能定理（初、末动能均为零）：
$$
\frac12kx_1^{2}-\mu mgx_2=0,
$$
解得
$$
\mu=\frac{kx_1^{2}}{2mgx_2}
=\frac{100\times0.02^{2}}{2\times0.1\times9.8\times0.1}
=\frac{0.04}{0.196}
\approx0.2 .
$$

### 题目 6 · 填空题 3

<!-- homework-topic: 椭圆轨道近地点与远地点的势能差、动能差 -->

如图所示，一人造地球卫星绕地球作椭圆运动，近地点为 $A$，远地点为 $B$。$A$、$B$ 两点距地心分别为 $r_1$、$r_2$。设卫星质量为 $m$，地球质量为 $M$，万有引力常数为 $G$。则卫星在 $A$、$B$ 两点的万有引力势能之差 $E_{PB}-E_{PA}=\underline{\qquad}$，卫星在 $A$、$B$ 两点的动能之差 $E_{KB}-E_{KA}=\underline{\qquad}$。

**答案：$E_{PB}-E_{PA}=\dfrac{GMm(r_2-r_1)}{r_1r_2}$；$E_{KB}-E_{KA}=\dfrac{GMm(r_1-r_2)}{r_1r_2}$。**

**解：** 取无穷远处势能为零，引力势能
$$
E_P=-\frac{GMm}{r}.
$$
故
$$
E_{PB}-E_{PA}
=-GMm\left(\frac1{r_2}-\frac1{r_1}\right)
=GMm\frac{r_2-r_1}{r_1r_2}.
$$
卫星沿椭圆轨道运动，只有引力做功，机械能守恒：
$$
E_{KB}+E_{PB}=E_{KA}+E_{PA},
$$
所以
$$
E_{KB}-E_{KA}=-(E_{PB}-E_{PA})
=GMm\frac{r_1-r_2}{r_1r_2}.
$$
因 $r_1<r_2$，第二式为负，表示远地点 $B$ 的动能小于近地点 $A$ 的动能。

### 题目 7 · 填空题 4

<!-- homework-topic: 恒力与摩擦共同作用下弹簧振子到最远点时的弹性势能 -->

如图所示，一劲度系数为 $k$ 的弹簧，一端固定在墙壁上，另一端连一质量为 $m$ 的物体。在恒力 $\vec F$ 作用下，物体自平衡位置由静止向右移动，设物体与桌面的摩擦因数为 $\mu$，则物体到达最远位置时系统的弹性势能 $E_P=\underline{\qquad}$。

**答案：$E_P=\dfrac{2(F-\mu mg)^{2}}{k}$。**

**解：** 设物体离开平衡位置 $x$ 时速度为零（最远位置）。从静止到最远点用动能定理：
$$
(F-\mu mg)x-\frac12kx^{2}=0 .
$$
除 $x=0$ 外，
$$
x_{\max}=\frac{2(F-\mu mg)}{k}.
$$
此时弹性势能
$$
E_P=\frac12kx_{\max}^{2}
=\frac12k\left[\frac{2(F-\mu mg)}{k}\right]^{2}
=\frac{2(F-\mu mg)^{2}}{k}.
$$
成立条件为 $F>\mu mg$，否则物体不能起动。

## 三、计算题

### 题目 8 · 计算题 1

<!-- homework-topic: 砝码落入盘中后盘向下移动的最大距离 -->

一质量为 $200\ \mathrm{g}$ 的砝码盘悬挂在劲度系数 $k=196\ \mathrm{N/m}$ 的弹簧下，现有质量为 $100\ \mathrm{g}$ 的砝码自 $30\ \mathrm{cm}$ 高处落入盘中且粘在盘上，求盘向下移动的最大距离（设砝码与盘的碰撞是完全非弹性碰撞）。

![砝码落入盘中](/course-materials/campus-basic-physics/figures/34-04.png)

**答案：$0.037\ \mathrm{m}$。**

**解：** 记砝码质量 $m_1=0.1\ \mathrm{kg}$，盘质量 $m_2=0.2\ \mathrm{kg}$。砝码自由下落 $h=0.3\ \mathrm{m}$，碰前速度
$$
v_1=\sqrt{2gh}=\sqrt{2\times9.8\times0.3}=2.42\ \mathrm{m/s}.
$$
完全非弹性碰撞，动量守恒：
$$
m_1v_1=(m_1+m_2)v_2
\ \Longrightarrow\
v_2=\frac{0.1}{0.3}\times2.42=0.808\ \mathrm{m/s}.
$$
碰前盘已使弹簧伸长（平衡）
$$
l_1=\frac{m_2g}{k}
=\frac{0.2\times9.8}{196}=0.01\ \mathrm{m}.
$$
碰后盘与砝码一起向下移动 $l_2$ 到最低点，机械能守恒：
$$
\frac12(m_1+m_2)v_2^{2}
+\frac12kl_1^{2}
+(m_1+m_2)gl_2
=\frac12k(l_1+l_2)^{2}.
$$
展开并代入数值：
$$
\frac12\times196\left[(0.01+l_2)^{2}-0.01^{2}\right]
=0.3\times9.8\,l_2
+\frac12\times0.3\times0.808^{2}.
$$
即
$$
1.96l_2+98l_2^{2}=2.94l_2+0.098,
$$
$$
98l_2^{2}-0.98l_2-0.098=0.
$$
取正根：
$$
l_2=\frac{0.98+\sqrt{0.98^{2}+4\times98\times0.098}}{2\times98}
\approx0.037\ \mathrm{m}.
$$
所以盘向下移动的最大距离约为 $3.7\ \mathrm{cm}$。

### 题目 9 · 计算题 2

<!-- homework-topic: 沿圆弧路面缓慢上拉货物时拉力、重力与摩擦力做的功 -->

一匹马拉着货物沿着圆弧形路面极其缓慢地匀速移动。设圆弧路面半径为 $R$，马对货物的拉力总是平行于路面，货物质量为 $m$，与路面的滑动摩擦系数为 $\mu$。把货物由底端拉上 $45^\circ$ 圆弧位置时，马对货物做功多少？重力和摩擦力做功多少？

![马拉货物沿圆弧上行](/course-materials/campus-basic-physics/figures/34-05.png)

**答案：$A_F=mgR\left[\left(1-\dfrac{\sqrt2}{2}\right)+\dfrac{\sqrt2}{2}\mu\right]$；$A_g=mgR\left(\dfrac{\sqrt2}{2}-1\right)$；$A_f=-\dfrac{\sqrt2}{2}\mu mgR$。**

**解：** “极其缓慢”意味着货物动能始终为零。设货物所在位置与竖直方向的夹角为 $\alpha$，沿切向和法向列平衡方程：
$$
F-mg\sin\alpha-f=0,
$$
$$
N-mg\cos\alpha=0,
$$
$$
f=\mu N .
$$
故
$$
F=mg\sin\alpha+\mu mg\cos\alpha .
$$
货物沿圆弧移动 $\mathrm{d}s=R\,\mathrm{d}\alpha$，马做功
$$
A_F=\int_0^{\pi/4}\left(mg\sin\alpha+\mu mg\cos\alpha\right)R\,\mathrm{d}\alpha .
$$
计算得
$$
A_F=mgR\left[-\cos\alpha+\mu\sin\alpha\right]_0^{\pi/4}
=mgR\left[\left(1-\frac{\sqrt2}{2}\right)+\frac{\sqrt2}{2}\mu\right].
$$
重力做功
$$
A_g=-mgR\left(1-\cos\frac{\pi}{4}\right)
=mgR\left(\frac{\sqrt2}{2}-1\right).
$$
摩擦力做功
$$
A_f=-\int_0^{\pi/4}\mu mg\cos\alpha\,R\,\mathrm{d}\alpha
=-\frac{\sqrt2}{2}\mu mgR .
$$
校验：$A_F+A_g+A_f=0$，与“缓慢、动能不变”一致。
