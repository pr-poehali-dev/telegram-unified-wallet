import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [balance] = useState(12450.75);
  const [dailyLimit, setDailyLimit] = useState(5000);
  const [monthlyLimit, setMonthlyLimit] = useState(50000);
  const [dailySpent] = useState(1250.50);
  const [monthlySpent] = useState(8320.00);

  const transactions = [
    { id: 1, service: "ChatGPT Plus", amount: -20.00, date: "2025-12-09", status: "completed", category: "ai" },
    { id: 2, service: "Midjourney Pro", amount: -30.00, date: "2025-12-08", status: "completed", category: "ai" },
    { id: 3, service: "Пополнение", amount: 500.00, date: "2025-12-07", status: "completed", category: "deposit" },
    { id: 4, service: "Claude API", amount: -15.50, date: "2025-12-07", status: "completed", category: "ai" },
    { id: 5, service: "Stable Diffusion", amount: -25.00, date: "2025-12-06", status: "pending", category: "ai" },
  ];

  const aiServices = [
    { id: 1, name: "ChatGPT", connected: true, logo: "🤖", plan: "Plus", cost: "20$/мес" },
    { id: 2, name: "Midjourney", connected: true, logo: "🎨", plan: "Pro", cost: "30$/мес" },
    { id: 3, name: "Claude", connected: true, logo: "💬", plan: "API", cost: "По факту" },
    { id: 4, name: "Stable Diffusion", connected: false, logo: "🖼️", plan: "Basic", cost: "10$/мес" },
    { id: 5, name: "Runway ML", connected: false, logo: "🎬", plan: "Standard", cost: "15$/мес" },
  ];

  const dailyProgress = (dailySpent / dailyLimit) * 100;
  const monthlyProgress = (monthlySpent / monthlyLimit) * 100;

  const weeklyData = [
    { day: "Пн", amount: 320 },
    { day: "Вт", amount: 450 },
    { day: "Ср", amount: 280 },
    { day: "Чт", amount: 520 },
    { day: "Пт", amount: 380 },
    { day: "Сб", amount: 150 },
    { day: "Вс", amount: 220 },
  ];

  const categoryData = [
    { category: "ChatGPT", amount: 620, color: "hsl(199, 89%, 48%)" },
    { category: "Midjourney", amount: 900, color: "hsl(220, 15%, 25%)" },
    { category: "Claude", amount: 465, color: "hsl(199, 89%, 60%)" },
    { category: "Другое", amount: 335, color: "hsl(220, 10%, 45%)" },
  ];

  const monthlyTrendData = [
    { month: "Авг", amount: 6500 },
    { month: "Сен", amount: 7200 },
    { month: "Окт", amount: 8100 },
    { month: "Ноя", amount: 7800 },
    { month: "Дек", amount: 8320 },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Telegram Wallet</h1>
            <p className="text-muted-foreground">Управление платежами для ИИ-сервисов</p>
          </div>
          <Button variant="outline" size="icon" className="hover-scale">
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg hover-scale">
          <CardHeader>
            <CardDescription className="text-primary-foreground/80">Доступный баланс</CardDescription>
            <CardTitle className="text-5xl font-bold">{balance.toFixed(2)} ₽</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="secondary" className="flex-1">
              <Icon name="Plus" size={18} className="mr-2" />
              Пополнить
            </Button>
            <Button variant="secondary" className="flex-1">
              <Icon name="Send" size={18} className="mr-2" />
              Перевести
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardDescription>Потрачено за неделю</CardDescription>
              <CardTitle className="text-3xl">2,320 ₽</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-500">↓ 12% от прошлой недели</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardDescription>Активных подписок</CardDescription>
              <CardTitle className="text-3xl">3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">ChatGPT, Midjourney, Claude</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardDescription>Средний чек</CardDescription>
              <CardTitle className="text-3xl">22.75 ₽</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary">102 транзакции</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="limits">Лимиты</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    Расходы по дням
                  </CardTitle>
                  <CardDescription>Последние 7 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      amount: {
                        label: "Сумма",
                        color: "hsl(199, 89%, 48%)",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="day" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="hsl(199, 89%, 48%)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} className="text-primary" />
                    По категориям
                  </CardTitle>
                  <CardDescription>Распределение расходов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.map((item, index) => {
                      const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
                      const percentage = ((item.amount / total) * 100).toFixed(1);
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.category}</span>
                            <span className="text-sm text-muted-foreground">{item.amount} ₽ ({percentage}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" size={20} className="text-primary" />
                  Тренд расходов
                </CardTitle>
                <CardDescription>Последние 5 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Расходы",
                      color: "hsl(199, 89%, 48%)",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="hsl(199, 89%, 48%)"
                        strokeWidth={3}
                        dot={{ fill: "hsl(199, 89%, 48%)", r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limits" className="space-y-4 animate-scale-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShieldCheck" size={24} className="text-primary" />
                  Безопасность платежей
                </CardTitle>
                <CardDescription>Контроль расходов для защиты средств</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="daily-limit" className="text-base font-medium">Дневной лимит</Label>
                    <span className="text-sm text-muted-foreground">{dailySpent.toFixed(2)} / {dailyLimit} ₽</span>
                  </div>
                  <Progress value={dailyProgress} className="h-3" />
                  <Input
                    id="daily-limit"
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="monthly-limit" className="text-base font-medium">Месячный лимит</Label>
                    <span className="text-sm text-muted-foreground">{monthlySpent.toFixed(2)} / {monthlyLimit} ₽</span>
                  </div>
                  <Progress value={monthlyProgress} className="h-3" />
                  <Input
                    id="monthly-limit"
                    type="number"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-block">Автоблокировка при превышении</Label>
                      <p className="text-sm text-muted-foreground">Запретить транзакции после лимита</p>
                    </div>
                    <Switch id="auto-block" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Уведомления о расходах</Label>
                      <p className="text-sm text-muted-foreground">Получать алерты при 80% лимита</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-scale-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={24} className="text-primary" />
                  История транзакций
                </CardTitle>
                <CardDescription>Все операции за последние 30 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors hover-scale"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon
                            name={tx.category === "deposit" ? "ArrowDownToLine" : "Zap"}
                            size={20}
                            className="text-primary"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{tx.service}</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className={`font-semibold ${tx.amount > 0 ? "text-green-500" : "text-foreground"}`}>
                            {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)} ₽
                          </p>
                          <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">
                            {tx.status === "completed" ? "Выполнено" : "В обработке"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4 animate-scale-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Plug" size={24} className="text-primary" />
                  ИИ-сервисы
                </CardTitle>
                <CardDescription>Управление подключенными сервисами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors hover-scale"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{service.logo}</div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.plan} · {service.cost}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {service.connected && (
                          <Badge className="bg-green-500">Подключен</Badge>
                        )}
                        <Button variant={service.connected ? "outline" : "default"} size="sm">
                          {service.connected ? "Отключить" : "Подключить"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Plus" size={24} className="text-primary" />
                  Добавить новый сервис
                </CardTitle>
                <CardDescription>Подключите API ключ для моментальной оплаты</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Название сервиса" />
                  <Input placeholder="API Key" type="password" />
                  <Button className="w-full">
                    <Icon name="Check" size={18} className="mr-2" />
                    Подключить сервис
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default Index;