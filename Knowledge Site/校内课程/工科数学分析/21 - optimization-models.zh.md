---
slug: "21-optimization-models"
title: "最优化问题数学模型"
summary: "第 21 讲：最优化问题数学模型。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "21"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "21最优化问题数学模型.pdf"
    url: "https://drive.google.com/file/d/1tTuzsYFHI5EZBCnqNmm85vTHinYcceUV/view?usp=drivesdk"
---

## 从实际问题到求最值

工程师想从一根圆木中切出强度最大的矩形梁，科学家想知道给定温度下哪种波长辐射最强，城市设计者想让路网的阻塞程度最低。这些问题的实际背景完全不同，数学上却是同一件事：**求某个函数的最大值或最小值**。

把实际问题变成最优化问题的过程叫建模。通用的四步是：

1. **明确优化对象**：到底让哪个量最大或最小；
2. **画草图理关系**：标出各量，找出它们之间的等式约束；
3. **写出目标函数**：用约束消去多余变量，化成一元函数；
4. **求最值**：用导数求驻点，再比较驻点值与端点值。

真正需要动脑的是第 1、3 步：目标函数写对了，后面只是计算。下面几个模型都遵循这个套路，重点看变量、约束和目标函数各自从哪里来。

## 横梁强度模型

从直径为 $d$ 的圆木中切出一根矩形截面梁，底为 $b$、高为 $h$。梁的强度与 $bh^2$ 成正比，问尺寸如何取使强度最大。

**变量与约束**：矩形的对角线就是圆木截面的直径，所以

$$
b^2+h^2=d^2,\qquad 0\leqslant b\leqslant d.
$$
**目标函数**：强度正比于 $bh^2$，比例常数不影响最值位置，取

$$
f(b)=bh^2=b(d^2-b^2),\qquad 0\leqslant b\leqslant d.
$$
这里把 $h^2=d^2-b^2$ 代进去，目标函数就只含一个变量。

求导：

$$
f'(b)=d^2-3b^2.
$$
令 $f'(b)=0$ 得 $b=\dfrac{d}{\sqrt3}$（负根不在区间内）。端点值 $f(0)=f(d)=0$，而

$$
f\left(\frac{d}{\sqrt3}\right)=\frac{d}{\sqrt3}\cdot\frac{2d^2}{3}>0,
$$
所以这就是最大值。此时

$$
h=\sqrt{d^2-b^2}=\sqrt{\frac23}\,d.
$$
**结论**：底 $b=\dfrac{d}{\sqrt3}$、高 $h=\sqrt{\dfrac23}\,d$ 时梁的强度最大。比值 $h:b=\sqrt2:1$，梁的高度大于宽度，这与“竖放更抗弯”的直觉一致。

## 用料最省模型

要生产容积为 $100\ \mathrm{cm^3}$ 的圆柱形有盖罐头盒，底半径为 $r$、高为 $h$，怎样设计尺寸使材料最省。

**变量与约束**：表面积由上下两个底和侧面组成，

$$
S=2\pi r^2+2\pi rh,
$$
容积约束为

$$
\pi r^2h=100.
$$
**目标函数**：由约束解出 $h=\dfrac{100}{\pi r^2}$，代入表面积：

$$
S(r)=2\pi r^2+\frac{200}{r},\qquad r>0.
$$
这里 $r>0$ 是自然定义域；$r\to 0^+$ 或 $r\to+\infty$ 时 $S\to+\infty$，所以最小值一定在内部取得。

求导：

$$
S'(r)=4\pi r-\frac{200}{r^2}.
$$
令 $S'(r)=0$：

$$
4\pi r^3=200\ \Longrightarrow\ r^3=\frac{50}{\pi}
\ \Longrightarrow\ r=\sqrt[3]{\frac{50}{\pi}}\approx 2.52\ \mathrm{cm}.
$$
再由约束得

$$
h=\frac{100}{\pi r^2}=2r\approx 5.03\ \mathrm{cm}.
$$
**结论**：底半径约 $2.52\ \mathrm{cm}$、高约 $5.03\ \mathrm{cm}$ 时用料最省。最省材料的圆柱形罐子，其高恰好等于底面直径，这是一个可以直接记住的结论。

这里不必再做二阶导数判别：$S(r)$ 在 $(0,+\infty)$ 上连续，两端都趋于 $+\infty$，唯一的驻点只能是全局最小点。实际问题通常保证最优解存在，当驻点唯一时，它就是要找的最值点；但这句话的前提是“最优解确实存在”，不能无条件套用。

## 最优路径模型

公园宽 $60\ \mathrm{m}$、深 $20\ \mathrm{m}$。沿人行道步行的速度是 $0.2\ \mathrm{m/s}$，穿行公园的速度是 $0.12\ \mathrm{m/s}$。从公园一侧的入口到斜对面的汽车站，走哪条路最快？

设沿人行道先走 $x\ \mathrm{m}$，再斜穿公园到汽车站，则穿行部分的水平距离是 $60-x$、竖直距离是 $20$，路径长度为 $\sqrt{(60-x)^2+20^2}$。总用时为

$$
t(x)=\frac{x}{0.2}+\frac{\sqrt{(60-x)^2+20^2}}{0.12},\qquad 0\leqslant x\leqslant 60.
$$
这里 $x$ 的范围来自公园的宽度：沿人行道最多走 $60\ \mathrm{m}$，再往前就过了汽车站。

求导：

$$
t'(x)=5-\frac{60-x}{0.12\sqrt{(60-x)^2+400}}.
$$
令 $t'(x)=0$，即

$$
0.6\sqrt{(60-x)^2+400}=60-x.
$$
两边平方（此时右端必须非负，故 $x\leqslant 60$）：

$$
0.36\left[(60-x)^2+400\right]=(60-x)^2
\ \Longrightarrow\ 0.64(60-x)^2=144
\ \Longrightarrow\ 60-x=15,
$$
所以 $x=45\ \mathrm{m}$。

比较三个有代表性的走法：

- 全程穿公园（$x=0$）：$t=\dfrac{\sqrt{60^2+20^2}}{0.12}\approx 527\ \mathrm{s}$；
- 沿人行道走到底再穿公园（$x=60$）：$t=\dfrac{60}{0.2}+\dfrac{20}{0.12}\approx 467\ \mathrm{s}$；
- 先走 $45\ \mathrm{m}$ 再穿公园：$t=225+\dfrac{25}{0.12}\approx 433\ \mathrm{s}$。

**结论**：沿人行道往西走 $45\ \mathrm{m}$，再斜穿公园，用时最少，约 $433\ \mathrm{s}$。最优走法既不是“尽量少走路”，也不是“全程走快路”，而是在速度差与路程之间取平衡——这正是导数为零所表达的边际权衡。

## 运河行船模型

一条宽为 $a$ 的河与一条宽为 $b$ 的运河成直角相交，问能驶进运河的船最大长度是多少。

把船身看成一条线段，贴着拐角 $A$ 转动。设船身与河岸的夹角为 $\theta$。船身在两段航道中的部分长度分别为

$$
\frac{a}{\sin\theta}\quad\text{和}\quad\frac{b}{\cos\theta},
$$
于是船身总长为

$$
l(\theta)=\frac{a}{\sin\theta}+\frac{b}{\cos\theta},\qquad 0<\theta<\frac{\pi}{2}.
$$

![运河与河道相交，船身贴着拐角转动](/images/campus-mathematical-analysis/21-canal.png)

**为什么最大船长等于 $l$ 的最小值**：$l(\theta)$ 在 $\left(0,\dfrac{\pi}{2}\right)$ 内先减后增，只有一个最小值。船长 $L$ 要能通过拐角，就必须在每个角度 $\theta$ 下都不超过该角度允许的通道长度 $l(\theta)$，即 $L\leqslant l(\theta)$ 对一切 $\theta$ 成立；因此 $L\leqslant\min l$。而取 $L=\min l$ 时，船在 $l$ 最小的那个角度恰好卡住通过，所以最大船长正是 $l(\theta)$ 的最小值。

求导：

$$
l'(\theta)=-\frac{a\cos\theta}{\sin^2\theta}+\frac{b\sin\theta}{\cos^2\theta}.
$$
令 $l'(\theta)=0$：

$$
\frac{a\cos\theta}{\sin^2\theta}=\frac{b\sin\theta}{\cos^2\theta}
\ \Longrightarrow\ \tan^3\theta=\frac{a}{b}
\ \Longrightarrow\ \tan\theta=\sqrt[3]{\frac{a}{b}}.
$$
当 $\theta\to 0^+$ 或 $\theta\to\dfrac{\pi}{2}^-$ 时 $l(\theta)\to+\infty$，而内部只有一个驻点，所以它是最小点。记 $S=a^{2/3}+b^{2/3}$，在驻点处

$$
\sin\theta=\frac{a^{1/3}}{\sqrt S},\qquad \cos\theta=\frac{b^{1/3}}{\sqrt S},
$$
代入得

$$
l_{\min}=\frac{a}{\sin\theta}+\frac{b}{\cos\theta}
=a^{2/3}\sqrt S+b^{2/3}\sqrt S=S^{3/2}.
$$
**结论**：

$$
L_{\max}=\left(a^{2/3}+b^{2/3}\right)^{3/2}.
$$

## 物理应用：用光行最速原理推出折射定律

光从空气中的一个定点 $A$ 出发，经过水面上的点 $P$，到达水中的定点 $B$。光在空气中的速度为 $a$，在水中的速度为 $b$。光行最速原理说：光走的是用时最短的路径。由此求 $P$ 的位置，并导出折射定律。

设 $A$ 到水面的垂直距离为 $h$，$B$ 到水面的垂直距离为 $k$，$A$、$B$ 在水面上的投影 $A_0$、$B_0$ 之间距离为 $d$。令 $A_0P=x$，则 $PB_0=d-x$。光走 $A\to P\to B$ 的时间为

$$
T(x)=\frac{\sqrt{h^2+x^2}}{a}+\frac{\sqrt{k^2+(d-x)^2}}{b},\qquad x\in[0,d].
$$

![光从空气进入水中的路径](/images/campus-mathematical-analysis/21-refraction.png)

求导：

$$
T'(x)=\frac{x}{a\sqrt{h^2+x^2}}-\frac{d-x}{b\sqrt{k^2+(d-x)^2}}.
$$
设驻点为 $x_0$，则

$$
\frac{x_0}{a\sqrt{h^2+x_0^2}}=\frac{d-x_0}{b\sqrt{k^2+(d-x_0)^2}}.
$$
注意

$$
\sin\alpha=\frac{x_0}{\sqrt{h^2+x_0^2}},\qquad
\sin\beta=\frac{d-x_0}{\sqrt{k^2+(d-x_0)^2}},
$$
其中 $\alpha$ 是入射角、$\beta$ 是折射角，于是上式就是

$$
\frac{\sin\alpha}{a}=\frac{\sin\beta}{b}.
$$
这正是折射定律（斯涅尔定律）。

还需说明这确实是时间的最小值而不是最大值：在 $(0,x_0)$ 内 $T'(x)<0$，在 $(x_0,d)$ 内 $T'(x)>0$，所以 $T$ 先降后升，$T(x_0)$ 是最小值。

## 课堂小结

最优化建模的固定套路是：**定对象 → 找约束 → 消元写出一元目标函数 → 在定义域内求驻点并与端点比较**。三个容易出问题的地方：一是定义域，像梁的 $0\leqslant b\leqslant d$、路径的 $0\leqslant x\leqslant 60$，漏掉端点就可能漏掉最值；二是驻点的唯一性，只有“最优解存在且驻点唯一”时才能直接说驻点就是最值点；三是建模假设，横梁模型忽略材料各向异性、罐头模型忽略接缝损耗、折射模型假设光速均匀，结论的适用范围都由这些假设限定。运河模型中“最大船长等于通道长度的最小值”这一步是建模的关键，把几何上的“刚好卡住”翻译成了函数的最小值。

---

原件：[21最优化问题数学模型.pdf](https://drive.google.com/file/d/1tTuzsYFHI5EZBCnqNmm85vTHinYcceUV/view?usp=drivesdk)
