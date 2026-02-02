import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ProfilePage() {
  const { user, isLoading, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [studyLevel, setStudyLevel] = useState(user?.preferences?.studyLevel || '');
  const [stressSource, setStressSource] = useState(user?.preferences?.stressSource || '');

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/signin');
    }
  }, [user, isLoading, navigate]);

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setStudyLevel(user.preferences?.studyLevel || '');
      setStressSource(user.preferences?.stressSource || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await updateProfile(name, {
        ...(studyLevel && studyLevel !== 'not-specified' ? { studyLevel: studyLevel as 'high-school' | 'undergraduate' | 'graduate' } : {}),
        ...(stressSource && stressSource !== 'not-specified' ? { stressSource: stressSource as 'academics' | 'personal' | 'both' } : {}),
        hasCompletedOnboarding: user?.preferences?.hasCompletedOnboarding ?? false,
      });

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccessMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/home')}
            className="mb-4"
          >
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your profile and account preferences</p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Profile Information Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-2 bg-gray-100"
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2"
                />
              </div>

              {/* Study Level */}
              <div>
                <Label htmlFor="studyLevel">Study Level</Label>
                <Select value={studyLevel || 'not-specified'} onValueChange={setStudyLevel}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your study level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-specified">Not specified</SelectItem>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stress Source */}
              <div>
                <Label htmlFor="stressSource">Primary Stress Source</Label>
                <Select value={stressSource || 'not-specified'} onValueChange={setStressSource}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select main stress source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-specified">Not specified</SelectItem>
                    <SelectItem value="academics">Academics</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Account Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="font-medium text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-900">
                    {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and account security</CardDescription>
          </CardHeader>
          <CardContent>
            {!showPasswordForm ? (
              <Button
                onClick={() => setShowPasswordForm(true)}
                variant="outline"
                className="w-full"
              >
                Change Password
              </Button>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-2"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="bg-white shadow-lg mt-6">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">User ID</p>
                <p className="font-mono text-xs text-gray-500 truncate">{user._id}</p>
              </div>
              <div>
                <p className="text-gray-600">Account Status</p>
                <p className="text-gray-900 font-medium">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
