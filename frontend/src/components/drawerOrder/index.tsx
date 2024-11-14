import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { DataTable } from "../table/data-table";
import { useDataTable } from "@/hooks/useDataTable";
import { columns } from "../table/columnsTable/columnsTableOrderDetails";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ComboboxOrder } from "../comboboxOrder";
import { useEffect, useState } from "react";
import { OrderItens } from "@/types/OrderItens";
import axios from "axios";

interface DrawerOrderProps {
    pedidoId: number;
}

export const DrawerOrder = ({ pedidoId }: DrawerOrderProps) => {

    const [data, setData] = useState<OrderItens[]>([]);
    const { table } = useDataTable(columns, data);

    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/itens-orders/${pedidoId}`);
            setData(response.data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar item do pedido');
        }
    }

    useEffect(() => {
        fetchOrderItems();
    }, [pedidoId]);

    return (
        <Drawer>
            <DrawerTrigger type="button" className="flex rounded-md border-gray-200 pl-3 pt-3 pr-3 pb-2 mr-5">
                Mais detalhes <ArrowRight className="ml-1" />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <div className="flex items-center justify-between space-x-2">
                        <DrawerTitle>Lista de Itens</DrawerTitle>
                        <div className="flex items-center justify-end space-x-2">
                            <ComboboxOrder pedidoId={pedidoId} />
                        </div>
                    </div>

                    <DataTable columns={columns} table={table} />
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button type="submit" className="hover:bg-orangeHover bg-orange">Fechar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
