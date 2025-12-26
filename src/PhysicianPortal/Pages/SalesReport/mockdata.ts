export interface ClientData {
  clientName: string;
  monthlyData: number[];
  total: number;
}

export interface SalesData {
  salesRep: string;
  clients: ClientData[];
  totals: number[];
  grandTotal: number;
}

export interface OrderData {
  clientName: string;
  monthlyOrders: number[];
  totalOrders: number;
}

export interface RepOrderData {
  salesRep: string;
  clients: OrderData[];
  monthlyTotals: number[];
  totalOrders: number;
}

export function generateMockData(): RepOrderData[] {
  // Helper function to generate random monthly order data
  const generateMonthlyOrders = (baseAmount: number = 50): number[] => {
    return Array.from({ length: 12 }, () => 
      Math.floor(Math.random() * baseAmount) + Math.floor(Math.random() * 20)
    );
  };

  // Helper function to calculate total from monthly data
  const calculateTotal = (monthlyData: number[]): number => {
    return monthlyData.reduce((sum, value) => sum + value, 0);
  };

  const rep1Clients: OrderData[] = [
    {
      clientName: 'CL1 - Johnson & Associates Medical',
      monthlyOrders: generateMonthlyOrders(80),
      totalOrders: 0
    }
  ];

  const rep2Clients: OrderData[] = [
    {
      clientName: '10997 - Smith Medical Center',
      monthlyOrders: generateMonthlyOrders(60),
      totalOrders: 0
    },
    {
      clientName: '10998 - Davis Clinic',
      monthlyOrders: generateMonthlyOrders(45),
      totalOrders: 0
    },
    {
      clientName: '11116 - Wilson Healthcare',
      monthlyOrders: generateMonthlyOrders(70),
      totalOrders: 0
    },
    {
      clientName: '11622 - Brown Medical',
      monthlyOrders: [0, 0, 0, 0, 0, 0, 0, 8, 15, 22, 18, 25],
      totalOrders: 0
    },
    {
      clientName: '12082 - Premier Medical Labs',
      monthlyOrders: generateMonthlyOrders(90),
      totalOrders: 0
    },
    {
      clientName: '123 - Riverside Medical',
      monthlyOrders: [0, 0, 0, 0, 0, 25, 35, 28, 42, 38, 45, 50],
      totalOrders: 0
    },
    {
      clientName: '12925 - Miller Clinic',
      monthlyOrders: generateMonthlyOrders(55),
      totalOrders: 0
    },
    {
      clientName: '13131 - Garcia Medical Center',
      monthlyOrders: generateMonthlyOrders(65),
      totalOrders: 0
    },
    {
      clientName: '13574 - Martinez, Dr. Robert MD',
      monthlyOrders: generateMonthlyOrders(75),
      totalOrders: 0
    },
    {
      clientName: '13761 - Glendale Hospital',
      monthlyOrders: generateMonthlyOrders(85),
      totalOrders: 0
    },
    {
      clientName: '13764 - Lincoln School District',
      monthlyOrders: generateMonthlyOrders(40),
      totalOrders: 0
    },
    {
      clientName: '13943 - Anderson Medical',
      monthlyOrders: generateMonthlyOrders(50),
      totalOrders: 0
    },
    {
      clientName: '2082 - Brentwood Medical Clinic',
      monthlyOrders: generateMonthlyOrders(95),
      totalOrders: 0
    },
    {
      clientName: '35353 - Taylor Healthcare',
      monthlyOrders: generateMonthlyOrders(35),
      totalOrders: 0
    },
    {
      clientName: '363636 - Thomas Medical',
      monthlyOrders: generateMonthlyOrders(48),
      totalOrders: 0
    },
    {
      clientName: '65656 - White Clinic',
      monthlyOrders: generateMonthlyOrders(58),
      totalOrders: 0
    },
    {
      clientName: '98989 - Harris Medical Center',
      monthlyOrders: generateMonthlyOrders(68),
      totalOrders: 0
    },
    {
      clientName: 'Clientid23 - Clark Healthcare',
      monthlyOrders: generateMonthlyOrders(78),
      totalOrders: 0
    },
    {
      clientName: 'HKClientid456 - Lewis Medical',
      monthlyOrders: generateMonthlyOrders(88),
      totalOrders: 0
    },
    {
      clientName: 'KL90 - Robinson Clinic',
      monthlyOrders: generateMonthlyOrders(42),
      totalOrders: 0
    },
    {
      clientName: 'SHEIK - Walker Medical',
      monthlyOrders: generateMonthlyOrders(52),
      totalOrders: 0
    },
    {
      clientName: 'STUCLT0001 - Springfield Schools',
      monthlyOrders: generateMonthlyOrders(62),
      totalOrders: 0
    }
  ];

  const rep3Clients: OrderData[] = [
    {
      clientName: '200 - Thompson Medical Group',
      monthlyOrders: generateMonthlyOrders(72),
      totalOrders: 0
    }
  ];

  // Calculate totals for each client
  const calculateClientTotals = (clients: OrderData[]): OrderData[] => {
    return clients.map(client => ({
      ...client,
      totalOrders: calculateTotal(client.monthlyOrders)
    }));
  };

  // Calculate monthly totals and grand total for each sales rep
  const calculateRepTotals = (clients: OrderData[]): { monthlyTotals: number[]; totalOrders: number } => {
    const monthlyTotals = Array.from({ length: 12 }, (_, monthIndex) => 
      clients.reduce((sum, client) => sum + client.monthlyOrders[monthIndex], 0)
    );
    const totalOrders = calculateTotal(monthlyTotals);
    return { monthlyTotals, totalOrders };
  };

  const finalRep1Clients = calculateClientTotals(rep1Clients);
  const finalRep2Clients = calculateClientTotals(rep2Clients);
  const finalRep3Clients = calculateClientTotals(rep3Clients);

  const rep1Totals = calculateRepTotals(finalRep1Clients);
  const rep2Totals = calculateRepTotals(finalRep2Clients);
  const rep3Totals = calculateRepTotals(finalRep3Clients);

  return [
    {
      salesRep: 'Michael Johnson',
      clients: finalRep1Clients,
      monthlyTotals: rep1Totals.monthlyTotals,
      totalOrders: rep1Totals.totalOrders
    },
    {
      salesRep: 'Sarah Williams',
      clients: finalRep2Clients,
      monthlyTotals: rep2Totals.monthlyTotals,
      totalOrders: rep2Totals.totalOrders
    },
    {
      salesRep: 'David Brown',
      clients: finalRep3Clients,
      monthlyTotals: rep3Totals.monthlyTotals,
      totalOrders: rep3Totals.totalOrders
    }
  ];
}
