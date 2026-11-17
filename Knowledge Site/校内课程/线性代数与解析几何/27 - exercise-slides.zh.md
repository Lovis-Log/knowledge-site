---
slug: "exercise-slides"
title: "课件习题"
summary: "课件中的判断题与计算题整理，含课件解答与补充解答。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "习题"
tags:
  - "线性代数"
  - "解析几何"
---

本页整理课件中的习题（共 12 页）。

标注规则：课件本身在第 3—11 页给出了「解 / 证」，凡属课件原有内容的标注为**课件解答**；我为核对与补充所写的内容标注为**补充解答**。判断题的答案在课件中部分已标出，未标的由我给出判断并写明理由。

## 1. 判断题

判断下列结论是否正确，并说明理由（第 1—2 页，共 8 小题）。

**(1) 若 $|\vec a|>|\vec b|$，则 $\vec a>\vec b$。**

**判断：错。**

**补充解答**：向量之间没有大小顺序，「$\vec a>\vec b$」本身不是有意义的式子。模长只刻画长度，与方向无关：例如 $\vec a=(2,0)$、$\vec b=(0,1)$，有 $|\vec a|=2>1=|\vec b|$，但两向量无法比较「谁大」。可比较的是模长。

**(2) 若 $\vec a\cdot\vec b=\vec c\cdot\vec b$，且 $\vec b\ne\vec 0$，则 $\vec a=\vec c$。**

**判断：错。**

**补充解答**：移项得 $(\vec a-\vec c)\cdot\vec b=0$，这只说明 $\vec a-\vec c$ 与 $\vec b$ 垂直，即「$\vec a,\vec c$ 在 $\vec b$ 方向上的投影相同」，而非二者相等。反例：取 $\vec b=(1,0)$，$\vec a=(1,1)$，$\vec c=(1,2)$，则 $\vec a\cdot\vec b=\vec c\cdot\vec b=1$，但 $\vec a\ne\vec c$。数量积不能「约去」非零向量，这是与实数乘法最关键的区别。

**(3) $(\vec a\cdot\vec b)\vec c=\vec a(\vec b\cdot\vec c)$。**

**判断：错。**

**补充解答**：左边是 $\vec c$ 的倍数（方向平行于 $\vec c$），右边是 $\vec a$ 的倍数（方向平行于 $\vec a$），二者一般不同向。反例：$\vec a=(1,0,0)$，$\vec b=(1,0,0)$，$\vec c=(0,1,0)$，则 $\vec a\cdot\vec b=1$，左边 $=\vec c=(0,1,0)$；而 $\vec b\cdot\vec c=0$，右边 $=\vec 0$。数量积不满足结合律。

**(4) $(\vec a\times\vec b)\cdot\vec a=(\vec a\times\vec b)\cdot\vec b=0$。**

**判断：对。**

**补充解答**：$\vec a\times\vec b$ 按定义同时垂直于 $\vec a$ 与 $\vec b$，故与二者的数量积都为零。这也可以由混合积的行列式性质看出：$\vec a,\vec a,\vec b$ 中有两列相同，行列式为零，即 $(\vec a\times\vec b)\cdot\vec a=0$，同理另一式为零。

**(5) 若 $\vec a=\lambda\vec b$，则 $\lambda=\dfrac{\vec a}{\vec b}$。**

**判断：错。**

**补充解答**：向量不能作除数，写 $\vec a/\vec b$ 没有定义。正确的说法是：若 $\vec b\ne\vec 0$ 且 $\vec a\parallel\vec b$，则存在**唯一**实数 $\lambda$ 使 $\vec a=\lambda\vec b$；该 $\lambda$ 只能由分量比或 $\lambda=\pm|\vec a|/|\vec b|$（同向取正、反向取负）得到。

**(6) 若 $\vec a\perp\vec b$，$\vec a\perp\vec c$，则 $\vec a\parallel(\vec b\times\vec c)$。**

**判断：对（需 $\vec b,\vec c$ 不共线）。**

**补充解答**：$\vec b\times\vec c$ 垂直于 $\vec b$ 与 $\vec c$，因此也垂直于 $\vec b,\vec c$ 张成的平面；已知 $\vec a$ 同时垂直于 $\vec b,\vec c$，故 $\vec a$ 与 $\vec b\times\vec c$ 都垂直于同一个平面，二者平行。

**边界情形**：若 $\vec b\parallel\vec c$，则 $\vec b\times\vec c=\vec 0$，谈不上方向，结论失去意义。所以严格的说法是「当 $\vec b\times\vec c\ne\vec 0$ 时 $\vec a\parallel(\vec b\times\vec c)$」，此时 $\vec a=\mu(\vec b\times\vec c)$ 对某 $\mu$ 成立（$\vec a=\vec 0$ 时取 $\mu=0$）。

**(7) $\vec a=(1,1,1)$ 是单位向量。**

**判断：错。**

**补充解答**：$|\vec a|=\sqrt{1^2+1^2+1^2}=\sqrt3\ne1$。与它同向的单位向量是 $\vec a^0=\frac{1}{\sqrt3}(1,1,1)$。

**(8) 若 $|\vec a+\vec b|=|\vec a-\vec b|$，则 $\vec a\perp\vec b$。**

**判断：对。**

**补充解答**：两边平方（用 $|\vec x|^2=\vec x\cdot\vec x$）：

$$
|\vec a|^2+2\vec a\cdot\vec b+|\vec b|^2=|\vec a|^2-2\vec a\cdot\vec b+|\vec b|^2
\Longrightarrow 4\vec a\cdot\vec b=0\Longrightarrow \vec a\cdot\vec b=0 .
$$

故 $\vec a\perp\vec b$。几何上：$|\vec a+\vec b|$ 与 $|\vec a-\vec b|$ 是以 $\vec a,\vec b$ 为邻边的平行四边形的两条对角线长，对角线相等 $\iff$ 平行四边形为矩形 $\iff$ 邻边垂直。

---

## 2.

对于空间两点 $P(2,-2,5)$ 和 $Q(-1,6,7)$，求：

(1) 向量 $\overrightarrow{PQ}$ 在三个坐标轴上的投影；
(2) 向量 $\overrightarrow{PQ}$ 的模；
(3) 向量 $\overrightarrow{PQ}$ 的方向余弦；
(4) 与向量 $\overrightarrow{PQ}$ 平行的单位向量；
(5) 向量 $\overrightarrow{PQ}$ 在向量 $\vec a=\{2,2,1\}$ 上的投影。

**课件解答**

$$
\overrightarrow{PQ}=Q-P=\{-3,\ 8,\ 2\}.
$$

**(1)** 投影公式 $\Pi_{\vec b}\vec a=\vec b^0\cdot\vec a=\dfrac{1}{|\vec b|}(\vec b\cdot\vec a)$。在三个坐标轴上的投影就是三个分量：

$$
\overrightarrow{PQ}\cdot\vec i=-3,\qquad
\overrightarrow{PQ}\cdot\vec j=8,\qquad
\overrightarrow{PQ}\cdot\vec k=2 .
$$

**(2)** $|\overrightarrow{PQ}|=\sqrt{(-3)^2+8^2+2^2}=\sqrt{77}$。

**(3)** $\cos\alpha=\dfrac{-3}{\sqrt{77}},\quad \cos\beta=\dfrac{8}{\sqrt{77}},\quad \cos\gamma=\dfrac{2}{\sqrt{77}}$。

**(4)** $\overrightarrow{PQ}^0=\dfrac{1}{|\overrightarrow{PQ}|}\overrightarrow{PQ}=\dfrac{1}{\sqrt{77}}\{-3,8,2\}$。

**(5)** $\Pi_{\vec a}\overrightarrow{PQ}=\vec a^0\cdot\overrightarrow{PQ}=\dfrac{1}{|\vec a|}(\vec a\cdot\overrightarrow{PQ})=4$。

**补充解答（验算与说明）**

(5) 的算式核对：$\vec a\cdot\overrightarrow{PQ}=2(-3)+2\cdot8+1\cdot2=-6+16+2=12$，$|\vec a|=\sqrt{4+4+1}=3$，故投影 $=12/3=4$ ✓。

(4) 需注意：与 $\overrightarrow{PQ}$ 平行的单位向量有**两个**，$\pm\frac{1}{\sqrt{77}}\{-3,8,2\}$；课件给出的是与 $\overrightarrow{PQ}$ 同向的那个。若题目问「单位向量」而不限定方向，两者都应写出。

(3) 的方向余弦满足恒等式 $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=\dfrac{9+64+4}{77}=1$ ✓，可作为独立验算。

(1) 说明投影与分量的区别：在坐标轴上的投影是标量（可正可负），其绝对值等于分量绝对值；本题三个投影恰为 $-3,8,2$，与分量同号，因为 $\vec i,\vec j,\vec k$ 就是坐标轴正方向的单位向量。

---

## 3.

给定三点 $A(4,0,0)$、$B(0,2,0)$、$C(0,0,2)$，对于三角形 $\triangle ABC$，求

(1) 向量 $\overrightarrow{BA}$ 在 $\overrightarrow{BC}$ 上的投影；
(2) $\triangle ABC$ 的面积；
(3) $BC$ 上高 $AD$ 的长度；
(4) 过 $C$ 的中线 $CE$ 的长度。

**课件解答**

**(1)** $\overrightarrow{BC}=\{0,-2,2\}$，$\overrightarrow{BA}=\{4,-2,0\}$，

$$
\Pi_{\overrightarrow{BC}}\overrightarrow{BA}
=\frac{1}{|\overrightarrow{BC}|}\bigl(\overrightarrow{BC}\cdot\overrightarrow{BA}\bigr)=\sqrt2 .
$$

**(2)** $\overrightarrow{BA}\times\overrightarrow{BC}=\{4,-2,0\}\times\{0,-2,2\}=\{-4,-8,-8\}$，

$$
S_{\triangle ABC}=\frac12\bigl|\overrightarrow{BA}\times\overrightarrow{BC}\bigr|=6 .
$$

**(3)** 由 $\dfrac12|\overrightarrow{BC}|\cdot|\overrightarrow{AD}|=6$，且 $|\overrightarrow{BC}|=2\sqrt2$，得

$$
|\overrightarrow{AD}|=3\sqrt2 .
$$

**(4)** 中点 $E$ 为 $AB$ 的中点，坐标为 $(2,1,0)$，

$$
|\overrightarrow{CE}|=\sqrt{(2-0)^2+(1-0)^2+(0-2)^2}=3 .
$$

**补充解答（验算与说明）**

(1) 算式核对：$\overrightarrow{BC}\cdot\overrightarrow{BA}=0\cdot4+(-2)(-2)+2\cdot0=4$，$|\overrightarrow{BC}|=\sqrt{0+4+4}=2\sqrt2$，故投影 $=\dfrac{4}{2\sqrt2}=\sqrt2$ ✓。

(3) 用勾股关系独立验算：$|\overrightarrow{BA}|=\sqrt{16+4}=2\sqrt5$，投影长为 $\sqrt2$，故

$$
|\overrightarrow{AD}|^2=|\overrightarrow{BA}|^2-\bigl(\Pi_{\overrightarrow{BC}}\overrightarrow{BA}\bigr)^2=20-2=18\Longrightarrow|\overrightarrow{AD}|=3\sqrt2\ \checkmark
$$

与课件结论一致。也可直接用 $\{|AD|=2S/|BC|=12/(2\sqrt2)=3\sqrt2$ 核对。

(2) 叉积核对：按分量展开，$\{-4,-8,-8\}$ 的模为 $\sqrt{16+64+64}=12$，故面积为 $6$ ✓；这也与 (3) 的 $S=\frac12|BC|\cdot|AD|=\frac12\cdot2\sqrt2\cdot3\sqrt2=6$ 相互印证。

(4) 中线端点必须是 $AB$ 的中点（「过 $C$ 的中线」指连接顶点 $C$ 与对边 $AB$ 中点的线段），$(2,1,0)$ 正确，按坐标得 $|CE|=3$ ✓。

**补充验算（中线长公式）**：三边长为

$$
|AB|=\bigl|\{4,-2,0\}\bigr|=2\sqrt5,\qquad |BC|=2\sqrt2,\qquad |CA|=\bigl|\{4,0,-2\}\bigr|=2\sqrt5 .
$$

由阿波罗尼奥斯（中线长）公式，

$$
|CE|^2=\frac{2|CA|^2+2|CB|^2-|AB|^2}{4}
=\frac{2\cdot20+2\cdot8-20}{4}=9\Longrightarrow |CE|=3\ \checkmark
$$

与坐标计算完全一致。这是 (4) 的独立验算：不依赖 $E$ 的坐标，只用三边长。

**注意**：本三角形是 $AB=AC$ 的等腰三角形，等腰的顶角在 $A$ 而不是 $C$，所以「底边上的中线即高」这一性质属于从 $A$ 引出的中线，对 $CE$ 不适用。$CE$ 确实不是高：

$$
\overrightarrow{CE}\cdot\overrightarrow{AB}=\{2,1,-2\}\cdot\{4,-2,0\}=8-2=6\ne0 .
$$

---

## 4.

若 $|\vec a|=\sqrt3$，$|\vec b|=1$，$\langle\vec a,\vec b\rangle=\dfrac{\pi}{6}$。

(1) 求 $\langle\vec a+\vec b,\ \vec a-\vec b\rangle$；
(2) 求以 $\vec a+\vec b$、$\vec a-\vec b$ 为邻边的平行四边形的面积。

**课件解答**

**(1)**

$$
\cos\langle\vec a+\vec b,\vec a-\vec b\rangle
=\frac{(\vec a+\vec b)\cdot(\vec a-\vec b)}{|\vec a+\vec b|\,|\vec a-\vec b|},
$$

其中

$$
(\vec a+\vec b)\cdot(\vec a-\vec b)=\vec a\cdot\vec a-\vec b\cdot\vec b=3-1=2,
$$
$$
\vec a\cdot\vec b=|\vec a||\vec b|\cos\langle\vec a,\vec b\rangle=\sqrt3\cdot1\cdot\frac{\sqrt3}{2}=\frac32,
$$
$$
|\vec a+\vec b|^2=|\vec a|^2+|\vec b|^2+2\vec a\cdot\vec b=3+1+3=7,
$$
$$
|\vec a-\vec b|^2=|\vec a|^2+|\vec b|^2-2\vec a\cdot\vec b=3+1-3=1 .
$$

故

$$
\cos\langle\vec a+\vec b,\vec a-\vec b\rangle=\frac{2}{\sqrt7},\qquad
\theta=\arccos\frac{2}{\sqrt7}.
$$

**(2)** 法一：

$$
\bigl|(\vec a+\vec b)\times(\vec a-\vec b)\bigr|
=|\vec a+\vec b|\,|\vec a-\vec b|\sin\theta
=\sqrt7\cdot1\cdot\sqrt{1-\frac47}=\sqrt3 .
$$

法二：

$$
(\vec a+\vec b)\times(\vec a-\vec b)=\vec a\times\vec a-\vec b\times\vec b+\vec b\times\vec a-\vec a\times\vec b=2(\vec b\times\vec a),
$$
$$
\bigl|(\vec a+\vec b)\times(\vec a-\vec b)\bigr|=2|\vec b\times\vec a|
=2|\vec a||\vec b|\sin\frac{\pi}{6}=\sqrt3 .
$$

**补充解答（验算与说明）**

两条路径互相印证，结果一致，说明第 (1) 问算出的 $\theta$ 与直接用叉积算面积等价——这本身就是一次独立验算：由 $2/\sqrt7$ 得 $\sin\theta=\sqrt{3/7}$，乘 $\sqrt7\cdot1$ 恰为 $\sqrt3$ ✓。

另可注意 $(\vec a+\vec b)\cdot(\vec a-\vec b)=|\vec a|^2-|\vec b|^2=2$ 与夹角无关，这是平方差公式在数量积中的对应形式；而两对角线的长度差 $|\vec a+\vec b|^2-|\vec a-\vec b|^2=4\vec a\cdot\vec b=6$，也印证了 $\vec a\cdot\vec b=3/2$。

**边界提示**：若 $\vec a\cdot\vec b=|\vec a||\vec b|$（同向），则 $|\vec a-\vec b|=|\vec a|-|\vec b|$，平行四边形退化，面积为 $0$——本题 $\vec a\cdot\vec b$ 取到中间值，故面积非零。

---

## 5.

用数量积证明三角形的三条高交于一点。

**课件解答**

如图，设 $AO\perp BC$，$BO\perp CA$，记 $\overrightarrow{AO}=\vec a$，$\overrightarrow{BO}=\vec b$，$\overrightarrow{CO}=\vec c$，则

$$
\overrightarrow{BC}=\vec b-\vec c,\qquad \overrightarrow{CA}=\vec c-\vec a,\qquad \overrightarrow{AB}=\vec a-\vec b,
$$

从而

$$
\vec a\cdot(\vec b-\vec c)=0,\qquad \vec b\cdot(\vec c-\vec a)=0 .
$$

两式相加：

$$
\vec a\cdot(\vec b-\vec c)+\vec b\cdot(\vec c-\vec a)=0
\Longrightarrow -\vec a\cdot\vec c+\vec b\cdot\vec c=0
\Longrightarrow \vec c\cdot(\vec a-\vec b)=0,
$$

即 $OC\perp AB$，故第三条高也过 $O$，三高共点。

**补充解答（把每一步的条件说清楚）**

上面的关键一步是把两个垂直条件写成「同一原点出发的向量」的数量积。为便于核对，改用「以 $O$ 为原点、$A,B,C$ 的位置向量记为 $\vec\alpha,\vec\beta,\vec\gamma$」的写法重做一遍（记号不同，逻辑相同）：

已知 $OA\perp BC$，即 $\vec\alpha\cdot(\vec\gamma-\vec\beta)=0$；$OB\perp CA$，即 $\vec\beta\cdot(\vec\alpha-\vec\gamma)=0$。两式相加：

$$
\vec\alpha\cdot\vec\gamma-\vec\alpha\cdot\vec\beta+\vec\beta\cdot\vec\alpha-\vec\beta\cdot\vec\gamma
=\vec\gamma\cdot(\vec\alpha-\vec\beta)=0 ,
$$

而 $\vec\gamma$ 是 $OC$ 方向的向量、$\vec\alpha-\vec\beta=\overrightarrow{BA}$，故 $OC\perp AB$。

**推理链的条件检查**：

1. 三角形非退化时，两条相应边不平行，垂直于它们的两条高也不平行，因此有唯一交点 $O$，可以先取这个交点再证明第三条高经过它；
2. 两高不平行的前提是三角形非退化（三顶点不共线），否则高无定义；
3. 数量积的对称性 $\vec\alpha\cdot\vec\beta=\vec\beta\cdot\vec\alpha$ 是抵消中间两项的关键；
4. 若 $O\ne C$，由非零向量数量积为零可得 $OC\perp AB$；若 $O=C$，第三条高本就经过 $C=O$。这样也包含直角三角形的情形。

---

## 6.

已知两条异面直线

$$
L_1:\ \frac{x}{-2}=\frac{y-1}{0}=\frac{z+2}{1},\qquad
L_2:\ \frac{x+1}{1}=\frac{y+1}{2}=\frac{z-2}{-1},
$$

求这两条直线的公垂线 $L$ 的方程。

**课件解答**

按「过 $L_1$ 与 $L$ 的平面 $\pi_1$、过 $L_2$ 与 $L$ 的平面 $\pi_2$」作图，公垂线 $L=\pi_1\cap\pi_2$。

$L$ 的方向向量

$$
\vec s=\{-2,0,1\}\times\{1,2,-1\}=\{-2,-1,-4\}.
$$

$\pi_1$ 的法向

$$
\vec n_1=\{2,1,4\}\times\{-2,0,1\}=\{1,-10,2\},
$$

$\pi_1$ 的方程为 $x-10y+2z+14=0$（过 $P_1(0,1,-2)$）。

$\pi_2$ 的法向

$$
\vec n_2=\{2,1,4\}\times\{1,2,-1\}=\{-9,6,3\},
$$

$\pi_2$ 的方程为 $-3x+2y+z-3=0$（过 $P_2(-1,-1,2)$）。

故 $L$ 的方程为

$$
\begin{cases}
x-10y+2z+14=0,\\
-3x+2y+z-3=0 .
\end{cases}
$$

**补充解答（验算）**

**(a) 方向核对。** 两平面法向的叉积给出交线方向：

$$
\{1,-10,2\}\times\{-3,2,1\}=\{-14,-7,-28\}=-7\{2,1,4\}\parallel\vec s\ \checkmark
$$

**(b) 交点核对（这一步最能说明方法是正确的）。** 把 $L_1$ 的参数式 $(-2t,\,1,\,-2+t)$ 代入 $\pi_2$：

$$
-3(-2t)+2\cdot1+(-2+t)-3=7t-3=0\Longrightarrow t=\frac37,
$$

得 $F_1=\left(-\frac67,1,-\frac{11}{7}\right)$，且它在 $\pi_1$ 上：

$$
-\frac67-10+\frac{2(-11)}{7}+14=\frac{-6-22}{7}+4=0\ \checkmark
$$

再把 $L_2$ 的参数式 $(-1+u,\,-1+2u,\,2-u)$ 代入 $\pi_1$：

$$
(-1+u)-10(-1+2u)+2(2-u)+14=27-21u=0\Longrightarrow u=\frac97,
$$

得 $F_2=\left(\frac27,\frac{11}7,\frac57\right)$，它在 $\pi_2$ 上：

$$
-3\cdot\frac27+2\cdot\frac{11}7+\frac57-3=\frac{-6+22+5}{7}-3=\frac{21}{7}-3=0\ \checkmark
$$

**(c) 垂直与距离核对。**

$$
F_2-F_1=\left(\frac87,\frac47,\frac{16}{7}\right)=\frac47\{2,1,4\}\parallel\vec s,
$$

故 $F_1F_2$ 同时垂直于 $L_1,L_2$ 的方向，是公垂线段，长度

$$
|F_1F_2|=\frac47\sqrt{4+1+16}=\frac{4\sqrt{21}}{7}.
$$

用两异面直线距离公式独立核对：$\dfrac{|(P_2-P_1)\cdot\vec s|}{|\vec s|}=\dfrac{|\{-1,-2,4\}\cdot\{-2,-1,-4\}|}{\sqrt{21}}=\dfrac{12}{\sqrt{21}}=\dfrac{4\sqrt{21}}{7}$ ✓，与上式一致。

**说明**：课件把 $\pi_1$ 的法向写成 $\{2,1,4\}\times\{-2,0,1\}$，其中 $\{2,1,4\}=-\vec s$，与本文用 $\vec s$ 计算只差一个符号：用 $-\vec s$ 得 $\{1,-10,2\}$，用 $\vec s$ 得 $\{-1,10,-2\}$，二者互为相反向量，过同一点 $P_1$ 给出的平面方程相同（$-x+10y-2z-14=0$ 与 $x-10y+2z+14=0$ 只差整体乘 $-1$）。因此法向的选取不影响最终结果。

---

## 特例 S₆—S₁₀

指出下列空间点集所代表的几何图形。

**课件解答**

$$
S_6=\{(x,y,z)\mid x^2+y^2=1\}
$$

——$xOy$ 面内的单位圆周上下无限移动产生的**圆柱面**。

$$
S_7=\{(x,y,z)\mid x+y+z=1\}
$$

——过三点 $(1,0,0)$、$(0,1,0)$、$(0,0,1)$ 的**平面**。

$$
S_8=\{(x,y,z)\mid x+y+z=1,\ x^2+y^2+z^2=1\}
$$

——上述平面与单位球面的**交线**（一个圆）。

$$
S_9=\{(x,y,z)\mid x=\cos\theta,\ y=\sin\theta,\ z=\theta,\ 0\le\theta<+\infty\}
$$

——从 $(1,0,0)$ 出发，沿圆柱面 $x^2+y^2=1$ 等速上升的**螺旋线**。

$$
S_{10}=\{(x,y,z)\mid 1\le x^2+y^2+z^2\le4\}
$$

——以 $O$ 为心、半径为 $1$ 和 $2$ 的两个球面所夹的**球壳**。

**补充解答（为什么是这些图形）**

- $S_6$：方程中不含 $z$，意味着对任意 $z$ 截面都是同一个单位圆，故是母线平行于 $z$ 轴的圆柱面；它是「二维曲线 + 自由坐标」的典型特征。
- $S_7$：一个三元一次方程即平面；代入三点可验证 $1+0+0=1$、$0+1+0=1$、$0+0+1=1$，故三点都在其上（且不共线，确定唯一平面），平面在三个坐标轴上的截距均为 $1$。
- $S_8$：两个方程联立，几何上是「平面截球」，交集是一个圆；该圆的圆心在平面的垂足 $\left(\frac13,\frac13,\frac13\right)$ 方向上，半径可由球半径与球心到平面距离求得：$d=\frac{1}{\sqrt3}$，$r=\sqrt{1-\frac13}=\sqrt{\frac23}$。
- $S_9$：$\theta$ 同时充当角度参数与 $z$ 坐标，说明每转一圈上升 $2\pi$，是等速螺旋线；它在 $xOy$ 面上的投影正是 $S_6$ 的圆。
- $S_{10}$：不等式给出「球外、球内」的夹层，含两个球面本身（等号），故是闭球壳；若写成 $1<x^2+y^2+z^2<4$ 则是开球壳，边界不属于集合。

---

## 易错点

1. 向量不能比较大小、不能作除数：$|\vec a|>|\vec b|$ 推不出「$\vec a>\vec b$」，$\vec a/\vec b$ 没有定义。
2. 数量积不满足消去律与结合律：$\vec a\cdot\vec b=\vec c\cdot\vec b$ 只能得 $(\vec a-\vec c)\perp\vec b$；$(\vec a\cdot\vec b)\vec c\ne\vec a(\vec b\cdot\vec c)$。
3. 「投影」是标量，「分量」是向量；投影可负，写法 $\Pi_{\vec b}\vec a=\frac{1}{|\vec b|}(\vec b\cdot\vec a)$ 的系数不能漏。
4. 与已知向量平行的单位向量有两个（$\pm$），只写一个会丢解。
5. 用叉积求面积时不要漏 $\frac12$；用「等腰三角形中线即高」这类几何直觉时，必须先确认等腰的顶角在哪里（本题 $CE$ 并非高）。
6. 求公垂线时，两平面都必须是「含一条已知直线且平行于公垂方向」的平面，最后取交线；只写一个平面或凭印象取点都会出错。

## 资料

- [课件原件：习题.pptx](</course-materials/campus-linear-algebra-analytic-geometry/lectures/%E4%B9%A0%E9%A2%98.pptx>)（第 1—12 页）
