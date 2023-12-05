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
import { Button } from "@/components/ui/button";

type AnoEscolar = "finais(6-9)" | "iniciais(1-5)" | "todos(1-4)";

export default function DashboardPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metric | null>(null);
  const [anoEscolar, setAnoEscolar] = useState<AnoEscolar>("finais(6-9)");

  async function handleFetchMetrics() {
    setIsLoading(true);

    try {
      const data = await fetchMetrics(params.id);

      setMetrics(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-row p-4 flex gap-4">
        <Button
          variant="secondary"
          onClick={() => setAnoEscolar("finais(6-9)")}
        >
          finais(6-9)
        </Button>
        <Button
          variant="secondary"
          onClick={() => setAnoEscolar("iniciais(1-5)")}
        >
          iniciais(1-5)
        </Button>
        <Button variant="secondary" onClick={() => setAnoEscolar("todos(1-4)")}>
          todos(1-4)
        </Button>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Dashboard - {metrics && metrics.nome ? metrics.nome : "..."} -{" "}
            {anoEscolar}
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
                      Último Idaeb
                    </CardTitle>
                    <TrendingUpIcon color="gray" size={18} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metrics?.data.ideb[anoEscolar][0].nota}
                    </div>
                    <p className="text-xs text-muted-foreground">...</p>
                  </CardContent>
                </Card>
                <Card className="w-96">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Nota Saeb Lingua Portuguesa
                    </CardTitle>
                    <BarChartHorizontalIcon color="gray" size={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        metrics?.data.nota_saeb_lingua_portuguesa[anoEscolar][0]
                          .nota
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">...</p>
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
                    <div className="text-2xl font-bold">
                      {metrics?.data.indicador_rendimento[anoEscolar][0].nota}
                    </div>
                    <p className="text-xs text-muted-foreground">...</p>
                  </CardContent>
                </Card>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Ideb</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview
                    data={metrics?.data.ideb[anoEscolar]}
                    color="#4bc4bc"
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Indicador Rendimento</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview
                    data={metrics?.data.indicador_rendimento[anoEscolar]}
                    color="#b88f4c"
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Saeb Lingua portuguesa</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview
                    data={metrics?.data.nota_saeb_lingua_portuguesa[anoEscolar]}
                    color="#ae4091"
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Taxa aprovação</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview
                    data={metrics?.data.taxa_aprovacao[anoEscolar]}
                    color="#23d78e"
                  />
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
