
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  Eye, 
  Send, 
  Calendar, 
  Mail,
  BarChart3,
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const newsletters = [
    {
      id: 1,
      subject: "🚀 AI Trends Transforming Business in 2024",
      sentDate: "2024-05-20",
      status: "sent",
      recipients: 1247,
      opens: 324,
      clicks: 89,
      openRate: 26.0,
      clickRate: 7.1,
      preview: "Discover how artificial intelligence is reshaping industries and creating new opportunities for growth..."
    },
    {
      id: 2,
      subject: "💡 Marketing Automation: Your Complete Guide",
      sentDate: "2024-05-15",
      status: "sent",
      recipients: 1198,
      opens: 287,
      clicks: 76,
      openRate: 24.0,
      clickRate: 6.3,
      preview: "Learn how to streamline your marketing efforts with powerful automation tools and strategies..."
    },
    {
      id: 3,
      subject: "🌟 Customer Success Stories That Inspire",
      sentDate: "2024-05-10",
      status: "sent",
      recipients: 1156,
      opens: 298,
      clicks: 92,
      openRate: 25.8,
      clickRate: 8.0,
      preview: "Read amazing success stories from our community and learn what strategies worked for them..."
    },
    {
      id: 4,
      subject: "📊 Q2 Industry Report Draft",
      sentDate: "2024-05-22",
      status: "draft",
      recipients: 0,
      opens: 0,
      clicks: 0,
      openRate: 0,
      clickRate: 0,
      preview: "Comprehensive analysis of Q2 market trends and performance metrics across key industries..."
    },
    {
      id: 5,
      subject: "🎯 Productivity Hacks for Remote Teams",
      sentDate: "2024-05-05",
      status: "sent",
      recipients: 1089,
      opens: 267,
      clicks: 71,
      openRate: 24.5,
      clickRate: 6.5,
      preview: "Boost your team's productivity with these proven strategies for remote work success..."
    }
  ];

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSent = newsletters.filter(n => n.status === 'sent').length;
  const totalRecipients = newsletters.filter(n => n.status === 'sent').reduce((sum, n) => sum + n.recipients, 0);
  const avgOpenRate = newsletters.filter(n => n.status === 'sent').reduce((sum, n) => sum + n.openRate, 0) / totalSent || 0;
  const avgClickRate = newsletters.filter(n => n.status === 'sent').reduce((sum, n) => sum + n.clickRate, 0) / totalSent || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter History</h1>
          <p className="text-gray-600">Track performance and manage your past newsletters.</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Sent</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSent}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500">
                  <Send className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Recipients</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRecipients.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Avg Open Rate</p>
                  <p className="text-2xl font-bold text-green-600">{avgOpenRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Avg Click Rate</p>
                  <p className="text-2xl font-bold text-orange-600">{avgClickRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter List */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Newsletter Archive
                </CardTitle>
                <CardDescription>
                  {filteredNewsletters.length} newsletters found
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search newsletters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredNewsletters.length === 0 ? (
              <div className="text-center py-8">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No newsletters found matching your search</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNewsletters.map((newsletter) => (
                  <div
                    key={newsletter.id}
                    className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{newsletter.subject}</h3>
                          <Badge variant={newsletter.status === 'sent' ? 'default' : 'secondary'}>
                            {newsletter.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{newsletter.preview}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {newsletter.sentDate}
                          </div>
                          {newsletter.status === 'sent' && (
                            <>
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {newsletter.recipients.toLocaleString()} recipients
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {newsletter.status === 'draft' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Continue Editing
                          </Button>
                        )}
                      </div>
                    </div>

                    {newsletter.status === 'sent' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{newsletter.opens}</p>
                          <p className="text-xs text-gray-500">Opens</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{newsletter.openRate}%</p>
                          <p className="text-xs text-gray-500">Open Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{newsletter.clicks}</p>
                          <p className="text-xs text-gray-500">Clicks</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{newsletter.clickRate}%</p>
                          <p className="text-xs text-gray-500">Click Rate</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoryPage;
