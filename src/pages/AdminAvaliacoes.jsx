import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

export default function AdminAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modoAutomatico, setModoAutomatico] = useState(false);
  
  // Formulário manual
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    autor: '',
    imagem: '',
    nota: 5,
    comentario: '',
    produto_ids: [] // Array de IDs de produtos selecionados
  });

  // Automação
  const [imagensAutomaticas, setImagensAutomaticas] = useState([]);
  const [uploadingAuto, setUploadingAuto] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resAval, resProd] = await Promise.all([
        api.getAvaliacoes(),
        api.getAllProdutos()
      ]);
      setAvaliacoes(resAval);
      setProdutos(resProd);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, isAuto = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('imagem', file);

    try {
      const res = await fetch('/api-receiver.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success && data.url) {
        if (isAuto) {
          setImagensAutomaticas(prev => [...prev, data.url]);
        } else {
          setFormData(prev => ({ ...prev, imagem: data.url }));
        }
      } else {
        alert('Erro ao fazer upload da imagem');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem');
    }
  };

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingAuto(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('imagem', file);

      try {
        const res = await fetch('/api-receiver.php', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (error) {
        console.error('Erro no upload:', error);
      }
    }

    setImagensAutomaticas(prev => [...prev, ...uploadedUrls]);
    setUploadingAuto(false);
  };

  const handleSubmitManual = async (e) => {
    e.preventDefault();

    if (!formData.autor.trim()) {
      alert('Digite o nome do autor');
      return;
    }

    if (formData.produto_ids.length === 0) {
      alert('Selecione ao menos um produto');
      return;
    }

    try {
      // Criar uma avaliação para cada produto selecionado
      for (const produto_id of formData.produto_ids) {
        const payload = {
          produto_id,
          autor: formData.autor,
          imagem: formData.imagem || null,
          nota: formData.nota,
          comentario: formData.comentario
        };

        if (editando) {
          await api.updateAvaliacao(editando.id, payload);
        } else {
          await api.insertAvaliacao(payload);
        }
      }

      alert(`Avaliação${formData.produto_ids.length > 1 ? 'ões' : ''} criada${formData.produto_ids.length > 1 ? 's' : ''} com sucesso!`);
      setShowForm(false);
      setEditando(null);
      setFormData({ autor: '', imagem: '', nota: 5, comentario: '', produto_ids: [] });
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      alert('Erro ao salvar avaliação');
    }
  };

  const handleAutomatizar = async () => {
    if (imagensAutomaticas.length === 0) {
      alert('Adicione ao menos uma imagem para automatizar');
      return;
    }

    if (!confirm(`Deseja criar avaliações automáticas para todos os produtos ativos usando ${imagensAutomaticas.length} imagem(ns)?`)) {
      return;
    }

    try {
      const res = await api.automatizarAvaliacoes(imagensAutomaticas);
      alert(res.message);
      setImagensAutomaticas([]);
      setModoAutomatico(false);
      carregarDados();
    } catch (error) {
      console.error('Erro ao automatizar:', error);
      alert('Erro ao automatizar avaliações');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Deseja realmente deletar esta avaliação?')) return;

    try {
      await api.deleteAvaliacao(id);
      alert('Avaliação deletada com sucesso!');
      carregarDados();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar avaliação');
    }
  };

  const toggleProduto = (id) => {
    setFormData(prev => ({
      ...prev,
      produto_ids: prev.produto_ids.includes(id)
        ? prev.produto_ids.filter(pid => pid !== id)
        : [...prev.produto_ids, id]
    }));
  };

  const renderEstrelas = (nota) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fa-star ${i < nota ? 'fa-solid' : 'fa-regular'}`} style={{ color: '#ffc107' }}></i>
    ));
  };

  if (loading) return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        <p>Carregando...</p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#333' }}>
              <i className="fa-solid fa-star" style={{ marginRight: '0.5rem', color: '#ffc107' }}></i>
              Avaliações
            </h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setModoAutomatico(!modoAutomatico)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: modoAutomatico ? '#6c757d' : '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                <i className={`fa-solid fa-${modoAutomatico ? 'times' : 'magic'}`} style={{ marginRight: '0.5rem' }}></i>
                {modoAutomatico ? 'Cancelar Automação' : 'Automatizar Avaliações'}
              </button>
              {!modoAutomatico && (
                <button
                  onClick={() => { setShowForm(!showForm); setEditando(null); }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: showForm ? '#6c757d' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  <i className={`fa-solid fa-${showForm ? 'times' : 'plus'}`} style={{ marginRight: '0.5rem' }}></i>
                  {showForm ? 'Cancelar' : 'Nova Avaliação'}
                </button>
              )}
            </div>
          </div>

          {/* MODO AUTOMÁTICO */}
          {modoAutomatico && (
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>
                <i className="fa-solid fa-magic" style={{ marginRight: '0.5rem', color: '#17a2b8' }}></i>
                Automatizar Avaliações
              </h2>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Arraste todas as fotos dos usuários abaixo. A lógica criará automaticamente avaliações personalizadas para todos os produtos ativos (não ocultos), com nomes fictícios e comentários relacionados a cada produto.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="upload-auto"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  <i className="fa-solid fa-upload" style={{ marginRight: '0.5rem' }}></i>
                  {uploadingAuto ? 'Enviando...' : 'Adicionar Imagens'}
                </label>
                <input
                  id="upload-auto"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>

              {imagensAutomaticas.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#333' }}>
                    Imagens carregadas: {imagensAutomaticas.length}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                    {imagensAutomaticas.map((url, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        <img
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #ddd' }}
                        />
                        <button
                          onClick={() => setImagensAutomaticas(prev => prev.filter((_, i) => i !== idx))}
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAutomatizar}
                disabled={imagensAutomaticas.length === 0}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: imagensAutomaticas.length === 0 ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: imagensAutomaticas.length === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                <i className="fa-solid fa-magic" style={{ marginRight: '0.5rem' }}></i>
                Criar Avaliações Automaticamente
              </button>
            </div>
          )}

          {/* FORMULÁRIO MANUAL */}
          {showForm && !modoAutomatico && (
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>
                {editando ? 'Editar Avaliação' : 'Nova Avaliação'}
              </h2>

              <form onSubmit={handleSubmitManual}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                      Nome do Usuário *
                    </label>
                    <input
                      type="text"
                      value={formData.autor}
                      onChange={(e) => setFormData(prev => ({ ...prev, autor: e.target.value }))}
                      placeholder="Ex: João Silva"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                      Avaliação (Estrelas) *
                    </label>
                    <select
                      value={formData.nota}
                      onChange={(e) => setFormData(prev => ({ ...prev, nota: parseInt(e.target.value) }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Estrela{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Imagem do Usuário (50x50px) - Opcional
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {formData.imagem && (
                      <img
                        src={formData.imagem}
                        alt="Preview"
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #ddd' }}
                      />
                    )}
                    <label
                      htmlFor="upload-manual"
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      <i className="fa-solid fa-upload" style={{ marginRight: '0.5rem' }}></i>
                      Escolher Imagem
                    </label>
                    <input
                      id="upload-manual"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Comentário *
                  </label>
                  <textarea
                    value={formData.comentario}
                    onChange={(e) => setFormData(prev => ({ ...prev, comentario: e.target.value }))}
                    placeholder="Digite o comentário da avaliação..."
                    required
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Selecionar Produtos * (marque os produtos onde a avaliação aparecerá)
                  </label>
                  <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: '#f9f9f9'
                  }}>
                    {produtos.filter(p => p.ativo).map(produto => {
                      const imagem = Array.isArray(produto.imagem) ? produto.imagem[0] : produto.imagem;
                      return (
                        <label
                          key={produto.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.75rem',
                            marginBottom: '0.5rem',
                            backgroundColor: formData.produto_ids.includes(produto.id) ? '#e3f2fd' : 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: formData.produto_ids.includes(produto.id) ? '2px solid #2196F3' : '2px solid transparent'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.produto_ids.includes(produto.id)}
                            onChange={() => toggleProduto(produto.id)}
                            style={{ marginRight: '1rem', width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                          {imagem && (
                            <img
                              src={imagem}
                              alt={produto.nome}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem' }}
                            />
                          )}
                          <span style={{ fontWeight: '500', color: '#333' }}>{produto.nome}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    <i className="fa-solid fa-save" style={{ marginRight: '0.5rem' }}></i>
                    Salvar Avaliação
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditando(null); }}
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* LISTA DE AVALIAÇÕES */}
          {!modoAutomatico && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#333' }}>
                  Avaliações Cadastradas ({avaliacoes.length})
                </h2>
              </div>

              {avaliacoes.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
                  <i className="fa-solid fa-star" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}></i>
                  <p style={{ fontSize: '1.1rem' }}>Nenhuma avaliação cadastrada</p>
                  <p style={{ fontSize: '0.9rem' }}>Crie avaliações manualmente ou use a automação</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#666' }}>Autor</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#666' }}>Produto</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#666' }}>Nota</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#666' }}>Comentário</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#666' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {avaliacoes.map(aval => (
                        <tr key={aval.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {aval.imagem ? (
                                <img
                                  src={aval.imagem}
                                  alt={aval.autor}
                                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #ddd' }}
                                />
                              ) : (
                                <div style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  backgroundColor: '#e0e0e0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#999',
                                  fontSize: '1.5rem'
                                }}>
                                  <i className="fa-solid fa-user"></i>
                                </div>
                              )}
                              <span style={{ fontWeight: '500', color: '#333' }}>{aval.autor || 'Anônimo'}</span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {aval.produto_imagem && (
                                <img
                                  src={Array.isArray(aval.produto_imagem) ? aval.produto_imagem[0] : aval.produto_imagem}
                                  alt={aval.produto_nome}
                                  style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                              )}
                              <span style={{ fontSize: '0.9rem', color: '#666' }}>{aval.produto_nome || `Produto #${aval.produto_id}`}</span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ display: 'inline-flex', gap: '0.1rem' }}>
                              {renderEstrelas(aval.nota)}
                            </div>
                          </td>
                          <td style={{ padding: '1rem', maxWidth: '300px' }}>
                            <span style={{ fontSize: '0.9rem', color: '#666', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {aval.comentario}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <button
                              onClick={() => handleDelete(aval.id)}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
