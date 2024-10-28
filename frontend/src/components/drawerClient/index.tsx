import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { DataTable } from "../table/data-table";
import { useDataTable } from "@/hooks/useDataTable";
import { getClientDetails } from "@/services/ClientDetails";
import { columns } from "../table/columnsTable/columnsTableClientHist";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter,DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

export const DrawerClient = () => {
    const data = getClientDetails();
    const { table } = useDataTable(columns, data);

    return (
        <Drawer>
            <DrawerTrigger type="button" className="flex rounded-md border-gray-200 pl-3 pt-3 pr-3 pb-2 mr-5">Mais detalhes <ArrowRight className="ml-1" /></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Histórico de Pedidos</DrawerTitle>

                    <DataTable columns={columns} table={table} />
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button type="submit" className="hover:bg-orangeHover bg-orange">Fechar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}