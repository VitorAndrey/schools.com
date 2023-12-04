"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import {
  BadgePercentIcon,
  BarChartHorizontalIcon,
  TrendingUpIcon,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Metric } from "@/models";
import { fetchMetrics } from "@/services/fetchMetrics";

export default function DashboardPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metric | null>(null);

  async function handleFetchMetrics() {
    setIsLoading(true);

    try {
      const data = await fetchMetrics(params.id);

      setMetrics(data);
      console.log(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Dashboard - {metrics && metrics.nome ? metrics.nome : "..."}
          </h2>
          <div className="flex items-center space-x-2"></div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="comparisions">Comparativos</TabsTrigger>
            <TabsTrigger value="informations">Informações</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <ScrollArea className="w-full pb-4">
              <div className="flex gap-4">
                <Card className="w-96">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Última Projeção
                    </CardTitle>
                    <TrendingUpIcon color="gray" size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.9</div>
                    <p className="text-xs text-muted-foreground">
                      +1 comparado ao ano passado
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-96">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Colocação no município
                    </CardTitle>
                    <BarChartHorizontalIcon color="gray" size={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold"># 3</div>
                    <p className="text-xs text-muted-foreground">
                      - 1 compadaro ao ano passado
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-96">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Taxa de aprovação
                    </CardTitle>
                    <BadgePercentIcon color="gray" size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98,234%</div>
                    <p className="text-xs text-muted-foreground">
                      +3% comparado ao ano passado
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-96">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Avaliações encontradas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="w-full h-full">
                    {metrics?.data.map((metric) => (
                      <p key={metric.id_metrica}>
                        {metric.ano} - {metric.anos_escolares}
                      </p>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="comparisions">Comparativos</TabsContent>
          <TabsContent value="informations">Informações</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
