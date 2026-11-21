---
slug: "homework-07"
title: "第 7 次作业（向量组的秩与解的结构）"
summary: "第 7 次作业 7 道题的题面与补充解答。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "homework"
displayNumber: "07"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "7.jpg，本次作业第 1—7 题"
    url: "https://drive.google.com/file/d/1EORJ90byiLk-D7cwRe0mcffA_uskB_Dj/view?usp=drivesdk"
---

本次作业为滚动截图，含第 1—7 道主观题。解答均为新增，标注「补充解答」。



## 11.

<!-- homework-topic: 证明 ξ₁、ξ₂ 无关并求含它们的极大无关组 -->

设

$$
\boldsymbol\xi_1=(1,-1,2,4),\ \boldsymbol\xi_2=(0,3,1,2),\ \boldsymbol\xi_3=(3,0,7,14),
$$
$$
\boldsymbol\xi_4=(1,-1,2,0),\ \boldsymbol\xi_5=(2,1,5,6).
$$

(1) 证明 $\boldsymbol\xi_1,\boldsymbol\xi_2$ 线性无关；
(2) 求包含 $\boldsymbol\xi_1,\boldsymbol\xi_2$ 的极大线性无关组。

**补充解答**

**(1)** 设 $k_1\boldsymbol\xi_1+k_2\boldsymbol\xi_2=\boldsymbol 0$。比较第一个分量：

$$
k_1\cdot1+k_2\cdot0=0\Longrightarrow k_1=0 .
$$

再比较第二个分量 $0\cdot(-1)+k_2\cdot3=0$，得 $k_2=0$。故只有零解，两向量线性无关。

（直观判据：若两向量成比例，则非零分量应同比例出现，而 $\boldsymbol\xi_1$ 首分量非零、$\boldsymbol\xi_2$ 首分量为零，不可能成比例。）

**(2)** 先把其余向量用 $\boldsymbol\xi_1,\boldsymbol\xi_2$ 表示，找出哪些「必须补进来」。

$$
3\boldsymbol\xi_1+\boldsymbol\xi_2=(3,-3,6,12)+(0,3,1,2)=(3,0,7,14)=\boldsymbol\xi_3,
$$

故 $\boldsymbol\xi_3$ 可由 $\boldsymbol\xi_1,\boldsymbol\xi_2$ 线性表示，不必收入极大无关组。

再检验 $\boldsymbol\xi_4$：若 $a\boldsymbol\xi_1+b\boldsymbol\xi_2=\boldsymbol\xi_4$，由第 1 分量 $a=1$，由第 2 分量 $-1+3b=-1\Rightarrow b=0$，此时第 4 分量为 $4\cdot1=4\ne0$，矛盾。所以

$$
\boldsymbol\xi_4\notin\operatorname{span}\{\boldsymbol\xi_1,\boldsymbol\xi_2\}.
$$

于是 $\boldsymbol\xi_1,\boldsymbol\xi_2,\boldsymbol\xi_4$ 线性无关。而

$$
\boldsymbol\xi_5=\boldsymbol\xi_1+\boldsymbol\xi_2+\boldsymbol\xi_4
$$

（验证：$(1,-1,2,4)+(0,3,1,2)+(1,-1,2,0)=(2,1,5,6)$ ✓），故五个向量都在这三个向量的张成空间内，秩为 $3$。

因此包含 $\boldsymbol\xi_1,\boldsymbol\xi_2$ 的极大线性无关组为

$$
\{\boldsymbol\xi_1,\ \boldsymbol\xi_2,\ \boldsymbol\xi_4\},
$$

且 $\boldsymbol\xi_3=3\boldsymbol\xi_1+\boldsymbol\xi_2$，$\boldsymbol\xi_5=\boldsymbol\xi_1+\boldsymbol\xi_2+\boldsymbol\xi_4$。

**补充说明**：极大无关组一般不唯一。例如 $\{\boldsymbol\xi_1,\boldsymbol\xi_2,\boldsymbol\xi_5\}$ 也线性无关（因 $\boldsymbol\xi_5$ 含 $\boldsymbol\xi_4$ 的成分），同样是包含 $\boldsymbol\xi_1,\boldsymbol\xi_2$ 的极大无关组；本题给出的是其中最简单的一组。

---

## 12.

<!-- homework-topic: 求五个四维向量的秩与极大无关组 -->

求下列向量组的秩和一个极大线性无关组：

$$
\boldsymbol\alpha_1=(2,1,2,2,-4),\ \boldsymbol\alpha_2=(1,1,-1,0,2),\ \boldsymbol\alpha_3=(0,1,2,1,-1),
$$
$$
\boldsymbol\alpha_4=(-1,-1,-1,-1,1),\ \boldsymbol\alpha_5=(1,2,1,1,1).
$$

**补充解答**

思路：先由「秩 $\ge$」找一个非零子式立住下界，再用线性表示关系把其余向量消掉，得到上界。

**下界（秩 $\ge3$）。** 取 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 的前三个分量组成的子式：

$$
\begin{vmatrix}
2&1&0\\
1&1&1\\
2&-1&2
\end{vmatrix}
=2(2+1)-1(2-2)+0=6\ne0,
$$

故 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 线性无关，$r\ge3$。

**上界（秩 $\le3$）。** 直接验证其余两个向量可由它们表示：

$$
\boldsymbol\alpha_5=\boldsymbol\alpha_2+\boldsymbol\alpha_3
=(1+0,\ 1+1,\ -1+2,\ 0+1,\ 2-1)=(1,2,1,1,1),
$$
$$
\boldsymbol\alpha_4=-\frac13\bigl(\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3\bigr),
$$

其中 $\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3=(3,3,3,3,-3)$，乘以 $-\frac13$ 得 $(-1,-1,-1,-1,1)$，正是 $\boldsymbol\alpha_4$。于是五个向量都落在 $\operatorname{span}\{\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3\}$ 中，$r\le3$。

所以

$$
r=3,\qquad \text{极大线性无关组取 } \{\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3\},
$$

且 $\boldsymbol\alpha_4=-\frac13(\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3)$，$\boldsymbol\alpha_5=\boldsymbol\alpha_2+\boldsymbol\alpha_3$。

**补充说明**：若用矩阵化简，把 $\boldsymbol\alpha_i$ 作列排成的矩阵化为行最简形为

$$
\begin{pmatrix}
1&0&0&-\frac13&0\\
0&1&0&-\frac13&1\\
0&0&1&-\frac13&1\\
0&0&0&0&0\\
0&0&0&0&0
\end{pmatrix},
$$

主元位于第 $1,2,3$ 列，与上面的结论一致。

---

## 17.

<!-- homework-topic: 幂等矩阵的秩等式 r(A)+r(A−E)=n -->

设 $A$ 为 $n$ 阶方阵，且 $A^2=A$。证明：

$$
r(A)+r(A-E)=n .
$$

**补充解答**

这是「两个秩一上一下夹住 $n$」的典型结构，分别证两个方向。

**上界。** 由 $A^2=A$ 得 $A(A-E)=A^2-A=0$。于是 $A-E$ 的每一列 $x$ 都满足 $Ax=0$，即 $A-E$ 的列全部落在 $A$ 的解空间 $\ker A$ 中。而 $\dim\ker A=n-r(A)$，故

$$
r(A-E)\le n-r(A)\Longrightarrow r(A)+r(A-E)\le n .
$$

**下界。** 注意 $A-(A-E)=E$，由秩的次可加性

$$
n=r(E)=r\bigl(A-(A-E)\bigr)\le r(A)+r(A-E).
$$

两式合并即得

$$
r(A)+r(A-E)=n .
$$

**说明**：本题只用到 $A^2=A$ 得到的 $A(A-E)=0$ 与 $A-(A-E)=E$ 两件事；同样的论证可证「$AB=0$ 且 $A+B=E$ 时 $r(A)+r(B)=n$」，这正是本题的一般形式。

---

## 19.(1)

<!-- homework-topic: 求齐次方程组的基础解系与通解 -->

求齐次线性方程组的基础解系，并写出通解：

$$
\begin{cases}
x_1+2x_2+x_3-x_4=0,\\
3x_1+6x_2-x_3-3x_4=0,\\
5x_1+10x_2+x_3-5x_4=0 .
\end{cases}
$$

**补充解答**

对系数矩阵作初等行变换：

$$
\begin{pmatrix}
1&2&1&-1\\
3&6&-1&-3\\
5&10&1&-5
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1&2&1&-1\\
0&0&-4&0\\
0&0&-4&0
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1&2&1&-1\\
0&0&1&0\\
0&0&0&0
\end{pmatrix}.
$$

（第二行减去第一行的 3 倍得 $(0,0,-4,0)$，第三行减去第一行的 5 倍也得 $(0,0,-4,0)$。）

故 $r(A)=2$，未知量有 $4$ 个，基础解系含 $4-2=2$ 个向量。取 $x_2,x_4$ 为自由未知量。

由第二行 $x_3=0$，代回第一行：

$$
x_1=-2x_2+x_4 .
$$

分别令 $(x_2,x_4)=(1,0)$ 与 $(0,1)$，得基础解系

$$
\boldsymbol\eta_1=(-2,1,0,0)^{\mathrm T},\qquad
\boldsymbol\eta_2=(1,0,0,1)^{\mathrm T}.
$$

通解

$$
x=c_1\boldsymbol\eta_1+c_2\boldsymbol\eta_2
=\bigl(-2c_1+c_2,\ c_1,\ 0,\ c_2\bigr)^{\mathrm T},\qquad c_1,c_2\in\mathbb{R}.
$$

**验算**：把 $\boldsymbol\eta_1$ 代入原方程组：$-2+2+0-0=0$ ✓；$-6+6-0-0=0$ ✓；$-10+10+0-0=0$ ✓。$\boldsymbol\eta_2$ 代入：$1+0+0-1=0$ ✓；$3-3=0$ ✓；$5-5=0$ ✓。

---

## 20.

<!-- homework-topic: 求非齐次方程组的导出组基础解系与全部解 -->

设线性方程组

$$
\begin{cases}
2x_1-x_2+3x_3+2x_4=0,\\
9x_1-x_2+14x_3+2x_4=1,\\
3x_1+2x_2+5x_3-4x_4=1,\\
4x_1+5x_2+7x_3-10x_4=2 .
\end{cases}
$$

(1) 求导出组的一个基础解系；
(2) 用特解和导出组的基础解系表示方程组的全部解。

**补充解答**

先看秩与相容性。注意到后两个方程是前两个方程的线性组合（含右端项同样成立）：

$$
r_3=r_2-3r_1,\qquad r_4=-7r_1+2r_2 .
$$

逐项核对第 4 个方程：$-7\cdot2+2\cdot9=4$，$-7\cdot(-1)+2\cdot(-1)=5$，$-7\cdot3+2\cdot14=7$，$-7\cdot2+2\cdot2=-10$，右端 $-7\cdot0+2\cdot1=2$ ✓，与第 4 式完全一致。

故方程组与下面两式等价：

$$
\begin{cases}
2x_1-x_2+3x_3+2x_4=0,\\
9x_1-x_2+14x_3+2x_4=1 .
\end{cases}
$$

又 $\boldsymbol\alpha_1=(2,-1,3,2)$ 与 $\boldsymbol\alpha_2=(9,-1,14,2)$ 不成比例，故 $r(A)=r(\bar A)=2$，有无穷多解，自由未知量 $2$ 个。

两式相减消去 $x_2$：

$$
7x_1+11x_3=1\Longrightarrow x_1=\frac{1-11x_3}{7}.
$$

代回第一式解 $x_2$：

$$
x_2=2x_1+3x_3+2x_4=\frac{2-22x_3}{7}+3x_3+2x_4
=\frac27-\frac17x_3+2x_4 .
$$

**(1) 导出组的基础解系。** 令右端为零，取 $x_3,x_4$ 为自由未知量：

$$
x_1=-\frac{11}{7}x_3,\qquad x_2=-\frac17x_3+2x_4 .
$$

令 $(x_3,x_4)=(7,0)$ 与 $(0,1)$，得

$$
\boldsymbol\eta_1=(-11,-1,7,0)^{\mathrm T},\qquad
\boldsymbol\eta_2=(0,2,0,1)^{\mathrm T},
$$

二者第 $3,4$ 分量的 $2\times2$ 子式为 $7\ne0$，线性无关，即为基础解系。

**(2) 全部解。** 取 $x_3=x_4=0$ 得特解

$$
\boldsymbol\eta^{*}=\left(\frac17,\ \frac27,\ 0,\ 0\right)^{\mathrm T},
$$

故全部解为

$$
x=\boldsymbol\eta^{*}+c_1\boldsymbol\eta_1+c_2\boldsymbol\eta_2
=\left(\frac17-11c_1,\ \frac27-c_1+2c_2,\ 7c_1,\ c_2\right)^{\mathrm T},\qquad c_1,c_2\in\mathbb{R}.
$$

**验算**：特解代入：$2\cdot\frac17-\frac27=0$ ✓；$9\cdot\frac17-\frac27=1$ ✓；$3\cdot\frac17+2\cdot\frac27=1$ ✓；$4\cdot\frac17+5\cdot\frac27=2$ ✓。
$\boldsymbol\eta_1=(-11,-1,7,0)$：$-22+1+21=0$ ✓，$-99+1+98=0$ ✓，$-33-2+35=0$ ✓，$-44-5+49=0$ ✓。
$\boldsymbol\eta_2=(0,2,0,1)$：第一式 $0-2+0+2=0$ ✓，第二式 $0-2+0+2=0$ ✓，第三式 $0+4+0-4=0$ ✓，第四式 $0+10+0-10=0$ ✓。

---

## 22.

<!-- homework-topic: 讨论参数 p、t 下方程组的解与通解 -->

讨论 $p,t$ 取何值时，线性方程组

$$
\begin{cases}
x_1+x_2-2x_3+3x_4=0,\\
2x_1+x_2-6x_3+4x_4=-1,\\
3x_1+2x_2+px_3+7x_4=-1,\\
x_1-x_2-6x_3-x_4=t
\end{cases}
$$

有解、无解；有解时用导出组的基础解系表示通解。

**补充解答**

对增广矩阵作行变换：

$$
r_2-2r_1=(0,-1,-2,-2\mid-1),\quad
r_4-r_1=(0,-2,-4,-4\mid t),
$$
$$
r_3-3r_1=(0,-1,p+6,-2\mid-1).
$$

再作

$$
r_4-r_1-2(r_2-2r_1)=(0,0,0,0\mid t+2),\qquad
r_3-3r_1-(r_2-2r_1)=(0,0,p+8,0\mid 0).
$$

于是全部信息集中在两行：一行给出 $p+8$，一行给出 $t+2$。

**（一）无解：** $t\ne-2$ 时最后一行是 $(0,0,0,0\mid t+2)$，出现矛盾方程 $0=t+2$，不论 $p$ 为何值都无解。

**（二）有解：** $t=-2$。此时要看 $p$：

- **$p\ne-8$**：有 $x_3=0$，$r(A)=3$，自由未知量 $1$ 个。
  由 $r_2-2r_1$ 得 $-x_2-2x_4=-1$，即 $x_2=1-2x_4$；代回第一式 $x_1=-1-x_4$。取特解与基础解系：

$$
\boldsymbol\eta^{*}=(-1,1,0,0)^{\mathrm T},\qquad \boldsymbol\eta=(-1,-2,0,1)^{\mathrm T},
$$

  通解 $x=\boldsymbol\eta^{*}+c\boldsymbol\eta$，即

$$
(x_1,x_2,x_3,x_4)=(-1-c,\ 1-2c,\ 0,\ c),\qquad c\in\mathbb{R}.
$$

- **$p=-8$**：第三行化为全零，$r(A)=2$，自由未知量 $2$ 个。
  由 $-x_2-2x_3-2x_4=-1$ 得 $x_2=1-2x_3-2x_4$；代回第一式得 $x_1=-1+4x_3-x_4$。于是

$$
\boldsymbol\eta^{*}=(-1,1,0,0)^{\mathrm T},\quad
\boldsymbol\eta_1=(4,-2,1,0)^{\mathrm T},\quad
\boldsymbol\eta_2=(-1,-2,0,1)^{\mathrm T},
$$

  通解

$$
(x_1,x_2,x_3,x_4)=(-1+4c_1-c_2,\ 1-2c_1-2c_2,\ c_1,\ c_2),\qquad c_1,c_2\in\mathbb{R}.
$$

**验算**：取 $t=-2,\ p=0$ 与特解 $(-1,1,0,0)$ 代入原方程组：第 1 式 $-1+1=0$ ✓；第 2 式 $-2+1=-1$ ✓；第 3 式 $-3+2=-1$ ✓；第 4 式 $-1-1=-2=t$ ✓。再验 $\boldsymbol\eta=(-1,-2,0,1)$ 使导出组为零：$-1-2+3=0$ ✓，$-2-2+4=0$ ✓，$-3-4+7=0$ ✓，$-1+2-1=0$ ✓。

**说明**：行列式 $|A|=0$ 对一切 $p$ 成立（第 4 行可由前两行线性表示），所以本题不可能出现唯一解；「有解」时必为无穷多解。这一点从上面的行变换看得最清楚，不必单独算行列式。

---

## 29.

<!-- homework-topic: 证明伴随矩阵秩的三种情形 -->

设 $A$ 为 $n$（$n\ge2$）阶方阵，证明

$$
r(A^*)=
\begin{cases}
n,& r(A)=n,\\
1,& r(A)=n-1,\\
0,& r(A)<n-1 .
\end{cases}
$$

**补充解答**

用到两条基本事实：$AA^*=|A|E$；$A^*$ 的元素是 $A$ 的 $n-1$ 阶子式（代数余子式），故「$A^*=0$」等价于「$A$ 的所有 $n-1$ 阶子式全为零」。

**情形一：$r(A)=n$。** 此时 $A$ 可逆，$|A|\ne0$，且 $A^*=|A|A^{-1}$，故 $A^*$ 可逆，$r(A^*)=n$。

**情形二：$r(A)=n-1$。** 由 $AA^*=|A|E=0$，$A^*$ 的每一列都属于 $\ker A$。因 $r(A)=n-1$，$\dim\ker A=1$，故 $r(A^*)\le1$。

另一方面，$r(A)=n-1$ 说明存在某个 $n-1$ 阶子式非零，即 $A^*$ 至少有一个元素非零，从而 $r(A^*)\ge1$。两者合并得 $r(A^*)=1$。

**情形三：$r(A)<n-1$。** 此时 $A$ 的所有 $n-1$ 阶子式都为零（秩小于 $n-1$ 意味着不存在 $n-1$ 阶非零子式），于是 $A^*$ 的所有元素为零，即 $A^*=0$，$r(A^*)=0$。

三种情形恰好覆盖 $r(A)$ 的所有可能取值，结论成立。

**补充说明**：情形二还可以这样看——由 $r(A)+r(A^*)\le n$（因 $AA^*=0$ 且 $A^*$ 的列在 $\ker A$ 中）与 $r(A^*)\ge1$ 同时成立，即得 $r(A^*)=1$，与上面的论证一致。

---

## 易错点

1. 求极大无关组时，「包含指定的两个无关向量」并不等于「把它们所在的原组前几列直接拿来」，必须验证补进来的向量与它们仍线性无关（本题 $\boldsymbol\xi_3$ 就被排除）。
2. 20 题的自由未知量不是随便取的：必须取**非主元列**对应的未知量，否则无法把其余未知量解出来。
3. 22 题讨论参数要分两层：先用 $t$ 判相容性，再用 $p$ 判秩；漏掉「$p=-8$ 时自由未知量增至 2 个」是常见失分点。
4. 证明 $r(A^*)=1$ 时，「$r(A^*)\ge1$」不能省——只说「列在核空间里」只能得到上界。
5. 通解写成「特解 + 基础解系的线性组合」时，特解与基础解系必须都真正代回验算过，尤其含参数的情形。
