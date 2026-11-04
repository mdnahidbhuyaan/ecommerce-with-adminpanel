
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {Table, TableHeader, TableHead, TableRow, TableBody, TableCell, } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useState } from "react";

function ShoppingOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                 <TableRow>
                    <TableCell>123456</TableCell>
                    <TableCell>11/4/2026</TableCell>
                    <TableCell>In Process</TableCell>
                    <TableCell>$123.45</TableCell>
                    <TableCell>
                      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>

                        <Button onClick={()=>setOpenDetailsDialog(true)} className="bg-black text-white font-semibold py-3 px-2 rounded">
                           View Details
                        </Button>
                        <ShoppingOrderDetailsView/>
                      </Dialog>
                    </TableCell>
                 </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
}

export default ShoppingOrders;