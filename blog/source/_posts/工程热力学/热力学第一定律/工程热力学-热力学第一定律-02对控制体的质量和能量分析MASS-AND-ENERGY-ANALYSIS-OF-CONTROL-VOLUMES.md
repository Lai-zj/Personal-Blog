---
title: '[工程热力学]-[热力学第一定律]-02对控制体的质量和能量分析MASS AND ENERGY ANALYSIS OF CONTROL VOLUMES'
mathjax: true
date: 2026-11-01 20:03:06
tags:
categories: 
  - "工程热力学"
  - "热力学第一定律"
---

# 目录
[一、质量守恒Conservation of Mass](#一、质量守恒Conservation-of-Mass)\
[二、流动功与流动流体的能量Flow Work and the Energy of a Flowing Fluid](#二、流动功与流动流体的能量Flow-Work-and-the-Energy-of-a-Flowing-Fluid)\
[三、稳态流动系统的能量分析Energy Analysis of Steady-Flow Systems](#三、稳态流动系统的能量分析Energy-Analysis-of-Steady-Flow-Systems)\
[四、典型稳态流动设备Some Steady-Flow Engineering Devices](#四、典型稳态流动设备Some-Steady-Flow-Engineering-Devices)\
[五、非稳态流动过程的能量分析Energy Analysis of Unsteady-Flow Processes](#五、非稳态流动过程的能量分析Energy-Analysis-of-Unsteady-Flow-Processes)

## 一、质量守恒Conservation of Mass

质量守恒是自然界最基本的定律之一。工程分析中，质量和能量都视为守恒量（核反应中质量与能量按 $E=mc^2$ 相互转换，工程上可忽略）。

闭口系统的质量在过程中不变；控制体（control volume）则不同，质量可以穿过边界，所以必须记录进入和离开的量。

**质量流量**（mass flow rate）是单位时间通过某截面的质量，记作 $\dot m$（kg/s）；**体积流量**（volume flow rate）是单位时间通过的体积，记作 $\dot V$（m³/s）。设平均流速为 $V$、截面积为 $A$，则
$$
\dot m = \rho V A = \frac{\dot V}{v}
\tag{1.1}
$$
$$
\dot V = V A
\tag{1.2}
$$
实际管道截面上速度分布不均匀（壁面处为零、中心最大），所以 $V$ 取截面平均速度；密度 $\rho$ 也取截面平均值，对压缩流动是一种近似。

### 质量守恒方程

控制体的质量平衡为：进入的质量减去离开的质量，等于控制体内质量的变化
$$
m_{in} - m_{out} = \Delta m_{CV}
\tag{1.3}
$$
速率形式为
$$
\dot m_{in} - \dot m_{out} = \frac{dm_{CV}}{dt}
\tag{1.4}
$$

### 稳态流动的质量平衡

**稳态流动**（steady-flow）过程中，控制体内任何一点的参数都不随时间变化，因此 $m_{CV}$ 不变，$dm_{CV}/dt=0$。总进入的质量流量等于总离开的质量流量
$$
\sum \dot m_{in} = \sum \dot m_{out}
\tag{1.5}
$$
对单股流体（一个进口、一个出口）
$$
\rho_1 V_1 A_1 = \rho_2 V_2 A_2
\tag{1.6}
$$
若流体不可压缩（密度不变，如液体）
$$
V_1 A_1 = V_2 A_2
\tag{1.7}
$$

**关键**：不存在“体积守恒”。比如空气压缩机，进口和出口的质量流量相同，但出口压力高、密度大，体积流量反而小。守恒的是质量流量，不是体积流量。

选择控制体时，尽量让控制面与流速方向垂直，这样 $\dot m=\rho V A$ 可以直接使用，不必处理速度与法线的夹角。

## 二、流动功与流动流体的能量Flow Work and the Energy of a Flowing Fluid

闭口系统只需考虑内能、动能、势能；控制体还有质量进出，需要把流体“推”进或“推”出控制体，这部分功叫**流动功**（flow work），也叫流动能（flow energy）。

取一段流体微元，上游流体像“假想活塞”一样推它前进。设压力为 $P$、截面积为 $A$，则推力 $F=PA$；把微元推过边界移动距离 $L$，做功
$$
W_{flow} = F L = P A L = P V
\tag{2.1}
$$
单位质量形式
$$
w_{flow} = P v
\tag{2.2}
$$
流动功是压力与比容的乘积，进、出控制体都一样。与其他功不同，它由状态参数表示，所以也有人把它看作一种“组合属性”。

### 流动流体的总能量

非流动流体的总能量为 $e=u+ke+pe$。流动流体还要加上流动功 $Pv$，因此单位质量流动流体的总能量（记作 $\theta$）为
$$
\theta = Pv + u + ke + pe = h + \frac{V^2}{2} + gz
\tag{2.3}
$$
其中 $h=u+Pv$ 是焓。用焓代替内能，**流动功就自动包含进去了**，不必再单独计算——这正是热力学中定义焓的主要原因。

质量携带的能量和质量流量分别为
$$
E_{mass} = m\theta
\tag{2.4}
$$
$$
\dot E_{mass} = \dot m\theta = \dot m\left(h + \frac{V^2}{2} + gz\right)
\tag{2.5}
$$
当动能、势能可忽略时，简化为 $\dot E_{mass}=\dot m h$。

单位上要注意：$V^2/2$ 的单位是 m²/s²，即 J/kg，与 kJ/kg 的焓相加时要除以 1000。例如 45 m/s 只对应约 1 kJ/kg 的动能。

## 三、稳态流动系统的能量分析Energy Analysis of Steady-Flow Systems

涡轮机、压缩机、喷管等设备完成启动后，会长时间在相同工况下运行，可视为**稳态流动过程**：流体性质在控制体内各点可能不同，但在任一点都不随时间变化。

稳态时：

- 控制体的体积、质量、总能量都不变，$dE_{CV}/dt=0$
- 因此**边界功为零**（控制体体积不变）
- 进出口的质量流量、热量传递率、功率都不随时间变化

总能量进入等于总能量离开
$$
\dot E_{in} = \dot E_{out}
\tag{3.1}
$$
展开为热量、功和质量携带的能量
$$
\dot Q_{in} + \dot W_{in} + \sum \dot m_{in}\theta_{in} = \dot Q_{out} + \dot W_{out} + \sum \dot m_{out}\theta_{out}
\tag{3.2}
$$
习惯上假设热量**流入**、功由系统**输出**为正，则
$$
\dot Q - \dot W = \sum_{out}\dot m\theta - \sum_{in}\dot m\theta
\tag{3.3}
$$
对单股流体
$$
\dot Q - \dot W = \dot m\left[(h_2-h_1) + \frac{V_2^2-V_1^2}{2} + g(z_2-z_1)\right]
\tag{3.4}
$$
除以质量流量，得到单位质量形式
$$
q - w = (h_2-h_1) + \frac{V_2^2-V_1^2}{2} + g(z_2-z_1)
\tag{3.5}
$$
若动能和势能变化可忽略
$$
q - w = h_2 - h_1
\tag{3.6}
$$

这里的 $\dot W$ 是**轴功或电功**：稳态流动没有边界功，流动功已经被焓吸收。算出的 $\dot Q$ 或 $\dot W$ 为负，说明实际方向与假设相反。

动能和势能项的量级：
- 1 kJ/kg 的动能对应约 45 m/s 的速度；低速时 $\Delta ke$ 通常可忽略
- 1 kJ/kg 的势能对应约 102 m 的高度差；一般设备进、出口高差远小于此，可忽略
- 但气体流经变截面管道、或需要把流体泵送到很高处时，这两项不能忽略

## 四、典型稳态流动设备Some Steady-Flow Engineering Devices

### 喷管与扩压管Nozzles and Diffusers

喷管（nozzle）使流体加速、压力降低；扩压管（diffuser）使流体减速、压力升高。两者作用相反。

流动速度快、停留时间短，散热可忽略（$q\approx 0$）；不做功（$w=0$）；势能变化可忽略（$\Delta pe\approx 0$）；但速度变化大，动能必须考虑。能量平衡简化为
$$
h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2}
\tag{4.1}
$$
即动能增加以焓（压力和温度）下降为代价。亚声速喷管的截面积沿流向减小，超声速喷管则增大；扩压管相反。

### 涡轮机与压缩机Turbines and Compressors

涡轮机（turbine）让流体膨胀做功，焓下降；压缩机（compressor）、泵（pump）、风机（fan）消耗外功提高压力，焓上升。风机压升小，主要用于输送气体；泵处理液体。

通常绝热（$q\approx 0$），且 $\Delta ke\approx 0$、$\Delta pe\approx 0$，于是
$$
w_{out} = h_1 - h_2 \quad (turbine)
\tag{4.2}
$$
$$
w_{in} = h_2 - h_1 \quad (compressor,\ pump)
\tag{4.3}
$$

### 节流阀Throttling Valves

节流阀是造成显著压降的流动阻力装置，如可调阀门、毛细管、多孔塞。它不对外做功，压力下降常常伴随温度下降。

节流过程可视为绝热（$q\approx 0$）、不做功（$w=0$）、$\Delta ke\approx 0$、$\Delta pe\approx 0$，于是
$$
h_2 \approx h_1
\tag{4.4}
$$
即**等焓过程**（isenthalpic）。注意等焓不代表温度不变：理想气体 $h=h(T)$，节流后温度不变；实际气体可能显著降温（焦耳-汤姆孙效应），制冷和空调中常用节流阀降温。

### 混合室Mixing Chambers

两股或多股流体汇合的地方就是混合室，例如淋浴的三通接头。混合室通常绝热、不做功、动能和势能可忽略，质量守恒要求
$$
\dot m_{out} = \sum \dot m_{in}
$$
能量守恒要求进入的总焓等于流出的总焓
$$
\sum \dot m_{in}h_{in} = \dot m_{out}h_{out}
\tag{4.5}
$$

### 换热器Heat Exchangers

换热器让两股流体通过壁面交换热量而不混合（混合室可看作直接接触式换热器）。稳态时，每一股流体的质量流量保持不变。

换热器不做外功、$\Delta ke\approx 0$、$\Delta pe\approx 0$。把**整个换热器**取为控制体且外壳绝热时，$Q=0$，于是
$$
\sum \dot m_{in}h_{in} = \sum \dot m_{out}h_{out}
\tag{4.6}
$$
即一股流体放出的热量等于另一股流体吸收的热量。若只把**其中一股流体**取为控制体，则热量会穿过控制面，$Q\neq 0$
$$
\dot Q = \dot m(h_2 - h_1)
\tag{4.7}
$$
所以换热器的 $Q$ 是否为零，取决于控制体怎么选。

### 管道与风管流动Pipe and Duct Flow

管道、风管内的流动通常可按稳态处理（忽略启动和停机阶段）。与喷管不同，管道较长，散热或吸热可能很重要；若装有风机、泵或电加热器，还要计入功。

流速较低时动能变化通常可忽略；但气体在变截面管道中流动、或流体有较大高差时，$\Delta ke$、$\Delta pe$ 可能不可忽略。

## 五、非稳态流动过程的能量分析Energy Analysis of Unsteady-Flow Processes

许多实际过程，如给刚性容器充气、从压力容器放气、给轮胎或气球充气，控制体内的质量、能量都随时间变化，称为**非稳态流动**（unsteady-flow）或瞬态流动过程。稳态流动的关系式不再适用。

非稳态过程在一段有限时间内发生，分析的是这段时间内的**变化量**，而不是变化率。控制体的大小、形状也可能改变，因此可能有边界功——这一点与稳态流动不同。

多数非稳态过程可用**均匀流动**（uniform-flow）模型近似：

- 任一瞬时，进、出口的流体状态均匀且不随时间变化
- 任一瞬时离开控制体的流体，其状态等于该瞬间控制体内流体的状态
- 控制体内的初、终态由两个独立强度参数确定

### 质量平衡

$$
m_{in} - m_{out} = m_2 - m_1
\tag{5.1}
$$
其中下标 1、2 表示控制体的初态、终态。没有质量进入时 $m_{in}=0$，没有质量离开时 $m_{out}=0$，初始真空时 $m_1=0$。

### 能量平衡

进入控制体的能量（热量、功、质量携带）减去离开控制体的能量，等于控制体内能量的变化
$$
Q_{in} + W_{in} + \sum m_{in}\theta_{in} - Q_{out} - W_{out} - \sum m_{out}\theta_{out} = m_2 e_2 - m_1 e_1
\tag{5.2}
$$
其中流股的单位质量能量 $\theta = h + V^2/2 + gz$，控制体内流体的单位质量能量 $e = u + V^2/2 + gz$。

忽略动能、势能时
$$
Q_{net,in} - W_{net,out} = \sum m_{out}h_{out} - \sum m_{in}h_{in} + (m_2 u_2 - m_1 u_1)
\tag{5.3}
$$
若没有质量进出，$m_{in}=m_{out}=0$、$m_1=m_2=m$，上式退化为闭口系统的能量平衡 $Q-W=\Delta U$。

**典型情形：给初始真空的绝热刚性容器充气**。此时 $m_{in}=m_2$、$m_1=0$、$Q=W=0$，能量平衡给出
$$
u_2 = h_{in}
\tag{5.4}
$$
入口流体的焓（包含流动功 $Pv$）进入容器后，流动功转化为内能，所以容器内温度会升高。例如 1 MPa、300 °C 的蒸汽充入绝热真空容器，最终温度可达约 456 °C。

放气过程则相反：$m_{out}=m_1-m_2$，离开流体的焓取该瞬间容器内的状态；若容器绝热、刚性，放气会使剩余流体温度下降。刚性容器的边界功为零；若控制体边界移动，则必须把边界功计入能量平衡。
