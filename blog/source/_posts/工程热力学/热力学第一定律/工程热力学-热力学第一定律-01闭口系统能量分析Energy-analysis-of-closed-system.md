---
title: '[工程热力学]-[热力学第一定律]-01闭口系统能量分析Energy analysis of closed system'
mathjax: true
date: 2026-10-14 15:00:03
tags:
categories: 
  - "工程热力学"
  - "热力学第一定律"
---

# 目录
[一、移动边界功Moving Boundary Work](#一、移动边界功Moving-Boundary-Work)\
[二、闭口系统的能量平衡](#二、闭口系统的能量平衡)\
[三、比热Specific Heat](#三、比热Specific-Heat)\
[四、理想气体的内能、焓和比热Internal Energy, Enthalpy, and Specific Heats of Ideal Gases](#四、理想气体的内能、焓和比热Internal-Energy-Enthalpy-and-Specific-Heats-of-Ideal-Gases)\
[五、固体和液体的内能、焓和比热Internal Energy, Enthalpy, and Specific Heats of Solids and Liquids](#五、固体和液体的内能、焓和比热Internal-Energy-Enthalpy-and-Specific-Heats-of-Solids-and-Liquids)

## 一、移动边界功Moving Boundary Work

经典例子：有可动活塞的气缸，内部气体膨胀或压缩时，**活塞这部分边界移动所做的功**就是移动边界功（moving boundary work），也叫 **PdV 功**。汽车发动机中燃气膨胀推动活塞，是这种功最主要的应用。

真实发动机的活塞运动很快，缸内气体来不及保持平衡，过程路径无法确定；而**功是路径函数**，所以实际边界功只能靠测量得到。本节讨论的是**准平衡过程（quasi-equilibrium process）**，也叫准静态过程：系统在整个过程中始终无限接近平衡态。同样的初、终态下，准平衡膨胀过程做功最大，准平衡压缩过程耗功最小。

准平衡过程中活塞移动一小段距离 $ds$，气体做的微功为
$$
\delta W_b = F ds = P A ds = P dV
\tag{1.1}
$$
$P$ 是**绝对压力**。膨胀时 $dV>0$，功为正（对外输出）；压缩时 $dV<0$，功为负（外界对系统做功）。所以 $W_b$ 表示边界功的**输出**。

整个过程的总移动边界功(kJ)为
$$
W_b = \int_1^2 P dV
\tag{1.2}
$$
要积出来，必须先知道过程路径 $P=f(V)$。

P-V 图上，过程曲线下方的面积在数值上等于总移动边界功
$$
Area = A = \int_1^2 P dV
\tag{1.3}
$$
（看单位质量时用 P-v 图。）从同一状态 1 到状态 2，走不同路径面积不同，功也不同——这正是“功是路径函数”的含义。循环的净功等于膨胀功与压缩功之差，即闭合曲线包围的面积。

如果是非准平衡过程，则用活塞内表面受到的压力 $P_i$ 代替 $P$
$$
W_b = \int_1^2 P_i dV
\tag{1.4}
$$

### 多变过程Polytropic Process

许多实际的气体膨胀和收缩过程可以近似为多变过程，压强和体积满足
$$
PV^n = C = constant
$$
其中 $n$、$C$ 为常数。$n=0$ 为等压过程，$n=1$ 为等温过程（理想气体），$n=\infty$ 为等容过程。

$P$ 可以表示为 $V$ 的函数
$$
P = C V^{-n}
\tag{1.5}
$$
代入式（1.2）继续推导
$$
W_b = \int_1^2 C V^{-n} dV = C \frac{V_2^{-n+1} - V_1^{-n+1}}{-n+1} = \frac{P_2 V_2 - P_1 V_1}{1-n}
\tag{1.6}
$$
注意 $n \neq 1$。利用 $C = P_1 V_1^n = P_2 V_2^n$ 可得到最后一步。

如果是理想气体（$PV=mRT$），式（1.6）还可写成
$$
W_b = \frac{mR(T_2 - T_1)}{1-n}, \quad n \neq 1
\tag{1.7}
$$

如果理想气体的等温过程（$n=1$）
$$
W_b = C \ln\frac{V_2}{V_1} = P_1 V_1 \ln\frac{V_2}{V_1} = mRT \ln\frac{V_2}{V_1}
\tag{1.8}
$$

另外两个特例：等容过程 $dV=0$，$W_b=0$；等压过程 $W_b = P_0(V_2 - V_1)$。边界功的关系不只适用于气体，固体和液体同样适用。

## 二、闭口系统的能量平衡

任意系统、任意过程都满足能量平衡（热力学第一定律）
$$
E_{in} - E_{out} = \Delta E_{system}
\tag{2.1}
$$
即进入系统的能量减去离开系统的能量等于系统总能量的变化，其中 $\Delta E_{system} = \Delta U + \Delta KE + \Delta PE$。

速率形式(kW)
$$
\dot E_{in} - \dot E_{out} = \frac{dE_{system}}{dt}
\tag{2.2}
$$

单位质量形式(kJ/kg)
$$
e_{in} - e_{out} = \Delta e_{system}
\tag{2.3}
$$

微分形式
$$
dE_{in} - dE_{out} = dE_{system}
\tag{2.4}
$$

对于闭口系统的一个**循环（cycle）**，始末状态相等意味着 $\Delta E_{system}=0$，即 $E_{in}=E_{out}$。用净热量和净功表示为
$$
W_{net,out} = Q_{net,in} \quad (\mathrm{cycle})
\tag{2.5}
$$

闭口系统没有质量进出，能量平衡写成
$$
Q_{net,in} - W_{net,out} = \Delta E_{system}
\tag{2.6}
$$

习惯上先假设热量**流入**系统 $Q$、功由系统**输出** $W$，则
$$
Q - W = \Delta U + \Delta KE + \Delta PE
\tag{2.7}
$$
算出的 $Q$ 或 $W$ 为负，说明实际方向与假设相反。静止系统 $\Delta KE = \Delta PE = 0$，于是 $Q - W = \Delta U$。

**等压过程的重要简化**：把 $W = W_b + W_{other}$、$W_b = P_0(V_2 - V_1)$ 代入式（2.7），并利用 $H = U + PV$，得
$$
Q - W_{other} = (U_2 + P_0 V_2) - (U_1 + P_0 V_1) = H_2 - H_1 = \Delta H \quad (P = \mathrm{constant})
\tag{2.8}
$$
也就是说，等压过程中**边界功自动包含在 $\Delta H$ 里**，不必单独计算。注意该式只对等压过程成立，压力变化时不适用。

## 三、比热Specific Heat

**比热（specific heat）**：使单位质量物质温度升高 1 K 所需的能量。它依赖于过程怎样进行，所以热力学中定义两种比热：

- **等容比热 $c_v$**：体积保持不变时，单位质量物质升温 1 K 所需的能量；
- **等压比热 $c_p$**：压力保持不变时，单位质量物质升温 1 K 所需的能量。

$c_p$ 总大于 $c_v$：等压时系统会膨胀，除了升温还要额外提供膨胀功。

用其他状态参数表示
$$
c_v = \left(\frac{\partial u}{\partial T}\right)_v
\tag{3.1}
$$
$$
c_p = \left(\frac{\partial h}{\partial T}\right)_p
\tag{3.2}
$$
这两个式子是 $c_v$、$c_p$ 的**定义式**，也是状态参数之间的关系，对任何物质、任何过程都成立——并不是只有等容过程才能用 $c_v$。物理意义：$c_v$ 量度内能随温度的变化，$c_p$ 量度焓随温度的变化。

常用单位是 kJ/(kg·K)，与 kJ/(kg·°C) 相同；摩尔比热 $\bar c_v$、$\bar c_p$ 的单位是 kJ/(kmol·K)。

“比热”是历史名称，实际上能量不一定以热的形式传入，叫“比能”更准确。

## 四、理想气体的内能、焓和比热Internal Energy, Enthalpy, and Specific Heats of Ideal Gases

### 内能和焓都只是温度的函数

理想气体的状态方程
$$
Pv = RT
$$

焦耳 1843 年的实验：两个气罐连通后浸在水浴中，一边是高压空气，另一边是真空；打开阀门让空气自由膨胀，水温没有变化。这个过程既没有传热也没有做功，说明空气的内能不变——尽管体积和压力都变了。由此得到
$$
u = u(T)
\tag{4.1}
$$
再由焓的定义和 $Pv=RT$
$$
h = u + Pv = u + RT
\tag{4.2}
$$
$R$ 是常数，$u$ 又只随 $T$ 变，所以
$$
h = h(T)
\tag{4.3}
$$
于是 $c_v$、$c_p$ 至多也只是温度的函数：给定温度下，理想气体的 $u$、$h$、$c_v$、$c_p$ 与压力、比容无关。

### 内能和焓变化的计算

$$
du = c_v(T) dT
\tag{4.4}
$$
$$
dh = c_p(T) dT
\tag{4.5}
$$
从状态 1 到状态 2 积分
$$
\Delta u = u_2 - u_1 = \int_1^2 c_v(T) dT
\tag{4.6}
$$
$$
\Delta h = h_2 - h_1 = \int_1^2 c_p(T) dT
\tag{4.7}
$$

求 $\Delta u$、$\Delta h$ 有三种方法：

1. **查理想气体表**：直接读 $T_1$、$T_2$ 下的 $u$ 或 $h$ 再相减，最简单也最准确。理想气体表以 0 K 为参考态，令该处 $u=h=0$；参考态如何选取不影响 $\Delta u$、$\Delta h$。
2. **比热多项式积分**：把 $c_p(T)=a+bT+cT^2+dT^3$ 代入积分，结果准确，但手算麻烦，适合编程。
3. **平均比热**：在平均温度 $T_{avg}=(T_1+T_2)/2$ 处取 $c_v$、$c_p$，按常数处理
$$
\Delta u \approx c_{v,avg}(T_2 - T_1)
\tag{4.8}
$$
$$
\Delta h \approx c_{p,avg}(T_2 - T_1)
\tag{4.9}
$$
温差不大时误差很小（一两百度以内通常只有几个百分点）。单原子气体（He、Ar、Ne 等）的比热在很大温度范围内基本不变，可直接用平均比热式。

低压下真实气体趋近理想气体，这时得到的比热称为**理想气体比热**或**零压比热**，记作 $c_{p0}$、$c_{v0}$。

**关键**：$\Delta u = c_{v,avg}\Delta T$ 和 $\Delta h = c_{p,avg}\Delta T$ 对理想气体的**任何过程**都成立，不限于等容或等压过程。

### 理想气体比热的两个关系

由 $h=u+RT$ 微分得 $dh = du + R dT$，把 $dh=c_p dT$、$du=c_v dT$ 代入
$$
c_p = c_v + R
\tag{4.10}
$$
摩尔形式（$R_u$ 为通用气体常数）
$$
\bar c_p = \bar c_v + R_u
\tag{4.11}
$$
定义**比热比（specific heat ratio）**
$$
k = \frac{c_p}{c_v}
\tag{4.12}
$$
$k$ 随温度变化很小：单原子气体约 1.667，双原子气体（如空气）常温下约 1.4。空气在 300 K 时，$R = 0.287$ kJ/(kg·K)，$c_v = 0.718$ kJ/(kg·K)，$c_p = 1.005$ kJ/(kg·K)。

## 五、固体和液体的内能、焓和比热Internal Energy, Enthalpy, and Specific Heats of Solids and Liquids

### 不可压缩物质

比容（或密度）保持不变的物质叫**不可压缩物质（incompressible substance）**。固体和液体的比容在过程中几乎不变，可以按不可压缩物质近似处理——它的含义是：与体积变化相关的能量相比于其他能量项可以忽略。

对不可压缩物质，等容比热和等压比热相同
$$
c_p = c_v = c
\tag{5.1}
$$
所以下标可以去掉，统一记作 $c$。原因也是没有膨胀功需要额外提供。

### 内能变化

比热只随温度变化
$$
du = c(T) dT
\tag{5.2}
$$
温差不大时不必积分，直接用平均比热
$$
\Delta u = u_2 - u_1 \approx c_{avg}(T_2 - T_1)
\tag{5.3}
$$

### 焓变化

由 $h=u+Pv$，且不可压缩物质 $v$ 不变（$dv=0$）
$$
dh = du + v dP
\tag{5.4}
$$
积分得
$$
\Delta h = \Delta u + v \Delta P \approx c_{avg}(T_2 - T_1) + v \Delta P
\tag{5.5}
$$

- **固体**：$v\Delta P$ 项可忽略，$\Delta h \approx \Delta u \approx c_{avg}\Delta T$；
- **液体等压过程**（如加热器，$\Delta P=0$）：$\Delta h \approx \Delta u \approx c_{avg}\Delta T$；
- **液体等温过程**（如泵，$\Delta T=0$）：$\Delta h = v\Delta P$。

压缩液体的焓可以用下式修正（$h_f(T)$ 为同温度饱和液体的焓）
$$
h(P,T) \approx h_f(T) + v_f(T)\left[P - P_{sat}(T)\right]
\tag{5.6}
$$
修正项通常很小，工程上常直接取 $h(P,T) \approx h_f(T)$；但在高温高压下修正反而可能引入更大的误差。
