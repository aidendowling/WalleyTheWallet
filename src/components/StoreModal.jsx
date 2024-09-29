import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function StoreModal({ showModal, handleClose, userPoints, setUserPoints, storeItems, purchasedItems, setPurchasedItems }) {
  const { toast } = useToast();

  const handlePurchase = (item) => {
    if (purchasedItems[item.id]) {
      toast({
        title: "Already Purchased",
        description: `You have already purchased a ${item.name}!`,
        variant: "default",
      });
      return;
    }
    if (userPoints >= item.price) {
      setUserPoints(userPoints - item.price);
      setPurchasedItems(prev => ({ ...prev, [item.id]: true }));
      toast({
        title: "Purchase Successful",
        description: `You bought a ${item.name}!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points for this purchase.",
        variant: "destructive",
      });
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto relative">
        <Button
          className="absolute top-2 right-2 h-8 w-8 p-0"
          variant="ghost"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader>
          <CardTitle>Store</CardTitle>
          <CardDescription>Your Points: {userPoints}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={storeItems[0]?.id.toString()}>
            <TabsList className="grid w-full grid-cols-3">
              {storeItems.map(item => (
                <TabsTrigger key={item.id} value={item.id.toString()}>
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {storeItems.map(item => (
              <TabsContent key={item.id} value={item.id.toString()}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>Price: {item.price} Points</CardDescription> 
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      onClick={() => handlePurchase(item)}
                      disabled={purchasedItems[item.id]}
                    >
                      {purchasedItems[item.id] ? 'Purchased' : 'Buy'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default StoreModal;