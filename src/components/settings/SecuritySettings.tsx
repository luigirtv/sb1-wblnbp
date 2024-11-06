import React, { useState } from 'react';
import { Lock, Key, Shield, Globe, AlertCircle } from 'lucide-react';

interface LoginSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: Date;
  current: boolean;
}

const sampleSessions: LoginSession[] = [
  {
    id: '1',
    device: 'Chrome sur Windows',
    location: 'Paris, France',
    ip: '192.168.1.1',
    lastActive: new Date(),
    current: true
  },
  {
    id: '2',
    device: 'Safari sur iPhone',
    location: 'Lyon, France',
    ip: '192.168.1.2',
    lastActive: new Date(Date.now() - 86400000),
    current: false
  }
];

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [sessions, setSessions] = useState<LoginSession[]>(sampleSessions);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    // Implement password change
    console.log('Password change submitted');
  };

  const handleSessionTerminate = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const handleTerminateAllSessions = () => {
    setSessions(sessions.filter(session => session.current));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Changer le mot de passe</h2>
          <p className="mt-1 text-sm text-gray-500">
            Assurez-vous d'utiliser un mot de passe fort et unique.
          </p>
        </div>

        <form onSubmit={handlePasswordChange} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe actuel
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <div className="mt-2">
              <p className="text-sm text-gray-500">Le mot de passe doit contenir :</p>
              <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                <li>Au moins 8 caractères</li>
                <li>Au moins une lettre majuscule</li>
                <li>Au moins une lettre minuscule</li>
                <li>Au moins un chiffre</li>
                <li>Au moins un caractère spécial</li>
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Authentification à deux facteurs</h2>
              <p className="mt-1 text-sm text-gray-500">
                Ajoutez une couche de sécurité supplémentaire à votre compte.
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowTwoFactor(!showTwoFactor)}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200"
                role="switch"
                aria-checked="false"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showTwoFactor ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {showTwoFactor && (
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Configuration de l'authentification à deux facteurs
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Suivez les étapes pour configurer l'authentification à deux facteurs avec votre application d'authentification préférée.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-4 text-sm text-gray-600">
                <li>Téléchargez une application d'authentification (Google Authenticator, Authy, etc.)</li>
                <li>Scannez le QR code ci-dessous avec l'application</li>
                <li>Entrez le code à 6 chiffres généré par l'application</li>
              </ol>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                {/* QR Code placeholder */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">QR Code</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Code de vérification
              </label>
              <div className="mt-1 flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="000000"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Vérifier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Sessions actives</h2>
              <p className="mt-1 text-sm text-gray-500">
                Gérez vos sessions de connexion actives sur différents appareils.
              </p>
            </div>
            {sessions.length > 1 && (
              <button
                onClick={handleTerminateAllSessions}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                Déconnecter toutes les autres sessions
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {sessions.map(session => (
            <div key={session.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          Session actuelle
                        </span>
                      )}
                    </p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <span>{session.location}</span>
                      <span className="mx-2">•</span>
                      <span>IP: {session.ip}</span>
                      <span className="mx-2">•</span>
                      <span>Dernière activité: {session.lastActive.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => handleSessionTerminate(session.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Déconnecter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}