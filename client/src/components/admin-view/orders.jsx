import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


    
//   function handleFetchOrderDetails(getId) {
    
//   }
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
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={setOpenDetailsDialog}
                  >
                    <Button
                      onClick={() => setOpenDetailsDialog(true)}
                    >
                      View Details
                    </Button>
                    <AdminOrderDetailsView/>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
}

export default AdminOrdersView;