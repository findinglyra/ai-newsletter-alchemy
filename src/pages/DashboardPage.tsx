
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Send, 
  TrendingUp, 
  Plus,
  Eye,
  Calendar
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Newsletters",
      value: "12",
      description: "Created this month",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Subscribers",
      value: "1,247",
      description: "+12% from last month",
      icon: Users,
      color: "green"
    },
    {
      title: "Emails Sent",
      value: "8,934",
      description: "Total deliveries",
      icon: Send,
      color: "purple"
    },
    {
      title: "Open Rate",
      value: "24.5%",
      description: "Above industry average",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const recentNewsletters = [
    { title: "AI Trends in 2024", date: "2024-05-20", status: "Sent", opens: 187 },
    { title: "Marketing Automation Guide", date: "2024-05-15", status: "Draft", opens: 0 },
    { title: "Customer Success Stories", date: "2024-05-10", status: "Sent", opens: 156 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your newsletters.</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Create Newsletter
              </Button>
            </Link>
            <Link to="/audience">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Users className="w-4 h-4 mr-2" />
                Manage Audience
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-500",
              green: "bg-green-500",
              purple: "bg-purple-500",
              orange: "bg-orange-500"
            };
            
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Newsletters
              </CardTitle>
              <CardDescription>Your latest newsletter activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNewsletters.map((newsletter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">{newsletter.title}</h4>
                      <p className="text-sm text-gray-500">{newsletter.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        newsletter.status === 'Sent' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {newsletter.status}
                      </span>
                      {newsletter.status === 'Sent' && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Eye className="w-3 h-3 mr-1" />
                          {newsletter.opens}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/history">
                <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700">
                  View All Newsletters
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance Insights
              </CardTitle>
              <CardDescription>Key metrics and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Great Performance!</h4>
                  <p className="text-sm text-green-600">Your open rates are 15% above industry average.</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">AI Tip</h4>
                  <p className="text-sm text-blue-600">Try using emotional subject lines to increase engagement.</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-1">Suggestion</h4>
                  <p className="text-sm text-yellow-600">Consider A/B testing your next newsletter subject line.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
