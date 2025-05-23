
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  Upload, 
  Download, 
  Search,
  Mail,
  MoreVertical,
  Trash2
} from 'lucide-react';

const AudiencePage = () => {
  const [subscribers, setSubscribers] = useState([
    { id: 1, email: 'john@example.com', name: 'John Doe', status: 'subscribed', joinDate: '2024-05-01' },
    { id: 2, email: 'sarah@example.com', name: 'Sarah Smith', status: 'subscribed', joinDate: '2024-05-05' },
    { id: 3, email: 'mike@example.com', name: 'Mike Johnson', status: 'unsubscribed', joinDate: '2024-04-20' },
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddSubscriber = () => {
    if (!newEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    if (subscribers.some(sub => sub.email === newEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email is already in your subscriber list.",
        variant: "destructive",
      });
      return;
    }

    const newSubscriber = {
      id: Date.now(),
      email: newEmail,
      name: newName || 'Unknown',
      status: 'subscribed',
      joinDate: new Date().toISOString().split('T')[0]
    };

    setSubscribers([...subscribers, newSubscriber]);
    setNewEmail('');
    setNewName('');
    
    toast({
      title: "Subscriber Added!",
      description: "The new subscriber has been added to your list.",
    });
  };

  const handleRemoveSubscriber = (id: number) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id));
    toast({
      title: "Subscriber Removed",
      description: "The subscriber has been removed from your list.",
    });
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subscribedCount = subscribers.filter(sub => sub.status === 'subscribed').length;
  const unsubscribedCount = subscribers.filter(sub => sub.status === 'unsubscribed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audience Management</h1>
          <p className="text-gray-600">Manage your newsletter subscribers and audience segments.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Subscribers</p>
                  <p className="text-2xl font-bold text-green-600">{subscribedCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Unsubscribed</p>
                  <p className="text-2xl font-bold text-red-600">{unsubscribedCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-red-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Subscriber Form */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Add Subscriber
              </CardTitle>
              <CardDescription>
                Manually add a new subscriber to your list
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="newEmail" className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="newEmail"
                  type="email"
                  placeholder="subscriber@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="newName" className="text-sm font-medium text-gray-700 mb-2 block">
                  Name (Optional)
                </Label>
                <Input
                  id="newName"
                  type="text"
                  placeholder="John Doe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={handleAddSubscriber}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Subscriber
              </Button>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Bulk Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscriber List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Subscriber List
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search subscribers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </CardTitle>
                <CardDescription>
                  {filteredSubscribers.length} of {subscribers.length} subscribers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSubscribers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {subscribers.length === 0 ? 'No subscribers yet' : 'No subscribers match your search'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredSubscribers.map((subscriber) => (
                      <div
                        key={subscriber.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {subscriber.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{subscriber.name}</h4>
                              <p className="text-sm text-gray-600">{subscriber.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subscriber.status === 'subscribed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.status}
                          </span>
                          <span className="text-xs text-gray-500">{subscriber.joinDate}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSubscriber(subscriber.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudiencePage;
