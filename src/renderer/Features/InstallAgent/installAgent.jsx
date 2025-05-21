import React, { useState, useContext, useEffect } from 'react';
import { AgentInstallContext } from '../../context/AgentInstallContext.jsx';
import { spawn, exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const serverIp = process.env.SERVER_IP_ADDRESS;

const InstallAgent = ({
  agentId = "AGT-2023-12345",
  agentVersion = "1.2.3",
  onClose,
  onInstallSuccess
}) => {
  const ipcRenderer = window.electron.ipcRenderer;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [transformedData, setTransformedData] = useState({});
  const { setIsAgentInstalling } = useContext(AgentInstallContext);

  useEffect(() => {
    let timeoutId;
    if (status.type === 'success') {
      timeoutId = setTimeout(() => {
        onInstallSuccess?.();
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [status.type, onClose, onInstallSuccess]);

  useEffect(() => {
    fetch(`http://${serverIp}:11000/Agents/GetAgentInfoForContainer?AGENT_ID=${agentId}`)
      .then(res => res.json())
      .then(rawData => {
        const agent = rawData.AGENT_INFO || {};
        setTransformedData({
          id: +agent.ID || 0,
          tag: 'latest',
          name: agent.NAME,
          description: 'Agent for reading Emails...',
          image: agent.AGENT_IMAGE,
          envVariables: (agent.REQUIREMENTS || []).map(req => ({
            name: req,
            value: '',
            required: true
          }))
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleInstall = () => {
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    setIsAgentInstalling(true);

    const pull = `wsl.exe -d ubuntu -- bash -c "echo '226044' | sudo -S docker pull ${serverIp}:5000/${agentId}:${agentVersion}"`;
    const tag  = `wsl.exe -d ubuntu -- bash -c "echo '226044' | sudo -S docker tag ${serverIp}:5000/${agentId}:${agentVersion} ${agentId}:latest"`;
    const rmi  = `wsl.exe -d ubuntu -- bash -c "echo '226044' | sudo -S docker rmi ${serverIp}:5000/${agentId}:${agentVersion}"`;

    exec(pull, (e1, out1) => {
      if (e1) return finishError(e1);
      exec(tag, (e2, out2) => {
        if (e2) return finishError(e2);
        exec(rmi, (e3) => {
          if (e3) return finishError(e3);
          ipcRenderer.invoke('db:addAgentInfo', transformedData);
          setStatus({
            type: 'success',
            message: 'Agent successfully installed! You can now monitor it in your dashboard.'
          });
          setIsLoading(false);
          setIsAgentInstalling(false);
        });
      });
    });

    function finishError(err) {
      console.error(err);
      setStatus({ type: 'error', message: err.message });
      setIsLoading(false);
      setIsAgentInstalling(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1D1F24] rounded-xl shadow-xl w-full max-w-md p-6 text-[#F9FAFB]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#333] pb-4 mb-4">
          <h1 className="text-xl font-semibold">Install Agent</h1>
          {!isLoading && (
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
          )}
        </div>

        {/* Status */}
        {status.message && (
          <div
            className={`
              flex items-center p-3 mb-4 rounded-md
              ${status.type === 'success'
                ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
                : 'bg-red-100   border-l-4 border-red-500   text-red-700'}
            `}
          >
            <span className="text-xl mr-2">
              {status.type === 'success' ? '✓' : '⚠'}
            </span>
            <div>
              <p>{status.message}</p>
              {status.type === 'success' && (
                <p className="text-sm text-gray-500 italic">This window will close in 3 seconds.</p>
              )}
            </div>
          </div>
        )}

        {/* Agent Info */}
        <div className="bg-[#121317]/50 p-4 rounded-md mb-6 border-l-4 border-[#0EA5E9]">
          <div className="flex mb-2">
            <span className="w-24 text-gray-400 font-medium">Agent ID:</span>
            <span className="font-mono text-[#F9FAFB]">{agentId}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-400 font-medium">Version:</span>
            <span className="font-mono text-[#F9FAFB]">{agentVersion}</span>
          </div>
        </div>

        {/* Pre-install Info */}
        {!status.type && (
          <div className="border-t border-[#333] pt-4 mb-6">
            <h3 className="text-base font-medium mb-2">Installation will:</h3>
            <ul className="list-none space-y-1 text-gray-400 pl-4">
              {['Download agent binary to your server',
                'Configure the agent with your settings',
                'Register the agent with your account'
               ].map((item, i) => (
                <li key={i} className="relative before:content-['→'] before:absolute before:-left-4 before:text-[#0EA5E9]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          {!isLoading && !status.type && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-[#333] text-gray-400 hover:bg-white/5 hover:text-white transition"
            >
              Cancel
            </button>
          )}
          {!isLoading && !status.type && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 min-w-[160px] flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6366F1] to-[#0EA5E9] text-white font-semibold transform transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Confirm Installation
            </button>
          )}
          {isLoading && (
            <button
              disabled
              className="px-4 py-2 min-w-[160px] flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6366F1] to-[#0EA5E9] text-white opacity-70 cursor-wait"
            >
              <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Installing...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallAgent;
