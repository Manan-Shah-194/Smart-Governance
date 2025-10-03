import React, { useState } from 'react';
import { CreditCard, Smartphone, Wifi, Zap, Droplets, Trash2, Search, Filter, CheckCircle, AlertCircle } from 'lucide-react';

const BillPayments = ({ user, addNotification }) => {
  const [activeTab, setActiveTab] = useState('pay');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [formData, setFormData] = useState({
    billType: '',
    consumerNumber: '',
    amount: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const billTypes = [
    { type: 'Electricity', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { type: 'Water', icon: Droplets, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { type: 'Internet', icon: Wifi, color: 'text-green-600', bgColor: 'bg-green-100' },
    { type: 'Mobile', icon: Smartphone, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { type: 'Waste Management', icon: Trash2, color: 'text-gray-600', bgColor: 'bg-gray-100' }
  ];

  const [bills, setBills] = useState([
    {
      id: 1,
      type: 'Electricity',
      consumerNumber: 'EL123456789',
      amount: 1250.00,
      dueDate: '2024-01-25',
      status: 'Pending',
      billDate: '2024-01-01',
      description: 'Monthly electricity bill'
    },
    {
      id: 2,
      type: 'Water',
      consumerNumber: 'WT987654321',
      amount: 450.00,
      dueDate: '2024-01-20',
      status: 'Paid',
      billDate: '2024-01-01',
      description: 'Monthly water bill'
    },
    {
      id: 3,
      type: 'Internet',
      consumerNumber: 'INT555666777',
      amount: 899.00,
      dueDate: '2024-01-30',
      status: 'Pending',
      billDate: '2024-01-01',
      description: 'Monthly internet bill'
    }
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      type: 'Water',
      amount: 450.00,
      paymentDate: '2024-01-15',
      transactionId: 'TXN123456789',
      status: 'Success'
    },
    {
      id: 2,
      type: 'Electricity',
      amount: 1100.00,
      paymentDate: '2023-12-20',
      transactionId: 'TXN987654321',
      status: 'Success'
    }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (billId) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setBills(bills.map(bill => 
        bill.id === billId 
          ? { ...bill, status: 'Paid' }
          : bill
      ));
      
      const bill = bills.find(b => b.id === billId);
      const newPayment = {
        id: paymentHistory.length + 1,
        type: bill.type,
        amount: bill.amount,
        paymentDate: new Date().toISOString().split('T')[0],
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        status: 'Success'
      };
      
      setPaymentHistory([newPayment, ...paymentHistory]);
      
      addNotification({
        message: `Payment of ₹${bill.amount} for ${bill.type} successful`,
        time: 'Just now',
        type: 'success'
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBillIcon = (type) => {
    const billType = billTypes.find(bt => bt.type === type);
    return billType ? billType.icon : CreditCard;
  };

  const getBillColor = (type) => {
    const billType = billTypes.find(bt => bt.type === type);
    return billType ? billType.color : 'text-gray-600';
  };

  const getBillBgColor = (type) => {
    const billType = billTypes.find(bt => bt.type === type);
    return billType ? billType.bgColor : 'bg-gray-100';
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.consumerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || bill.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalPending = bills.filter(bill => bill.status === 'Pending').reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = bills.filter(bill => bill.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bill Payments</h1>
            <p className="text-gray-600">
              Pay your utility bills and government fees online.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-3 mb-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalPending.toFixed(2)}</h3>
              <p className="text-gray-600">Pending Bills</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalPaid.toFixed(2)}</h3>
              <p className="text-gray-600">Paid This Month</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{bills.length}</h3>
              <p className="text-gray-600">Total Bills</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('pay')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pay'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pay Bills
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Payment History
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'pay' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by consumer number or bill type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Bills</option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bills List */}
              <div className="space-y-4">
                {filteredBills.length === 0 ? (
                  <div className="card text-center py-12">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Bills Found</h3>
                    <p className="text-gray-600">
                      {searchTerm || filterType !== 'all' 
                        ? 'No bills match your search criteria.'
                        : 'No bills available at the moment.'
                      }
                    </p>
                  </div>
                ) : (
                  filteredBills.map((bill) => {
                    const Icon = getBillIcon(bill.type);
                    return (
                      <div key={bill.id} className="card">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 ${getBillBgColor(bill.type)} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${getBillColor(bill.type)}`} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {bill.type} Bill
                              </h3>
                              <p className="text-sm text-gray-600">Consumer: {bill.consumerNumber}</p>
                              <p className="text-sm text-gray-600">{bill.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              ₹{bill.amount.toFixed(2)}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                              {bill.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-2 gap-4 mb-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Bill Date:</span> {new Date(bill.billDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Due Date:</span> {new Date(bill.dueDate).toLocaleDateString()}
                          </div>
                        </div>

                        {bill.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handlePayment(bill.id)}
                              disabled={isProcessing}
                              className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isProcessing ? 'Processing...' : 'Pay Now'}
                            </button>
                            <button className="btn btn-secondary">
                              View Bill
                            </button>
                          </div>
                        )}

                        {bill.status === 'Paid' && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span>Payment completed successfully</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h2>
                
                {paymentHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                    <p className="text-gray-600">You haven't made any payments yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => {
                      const Icon = getBillIcon(payment.type);
                      return (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 ${getBillBgColor(payment.type)} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${getBillColor(payment.type)}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{payment.type} Payment</h4>
                              <p className="text-sm text-gray-600">TXN: {payment.transactionId}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              ₹{payment.amount.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillPayments;
